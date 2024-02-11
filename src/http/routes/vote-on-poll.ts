import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { redis } from "../../lib/redis"
import { voting } from "../../utils/voting-pub-sub";

export async function voteOnPoll(app: FastifyInstance) {

    app.post('/polls/:pollId/votes', async (request, reply) => {
 

        
        //status 201 seginifica que deu certo a requizição e foi creado o dado
        const voteOnPollBody = z.object({
            pollOptionId: z.string().uuid()
        });
        const voteOnPollParams = z.object({
            pollId: z.string().uuid()
        })
        const { pollId } = await voteOnPollParams.parse(request.params);

        const { pollOptionId } = await voteOnPollBody.parse(request.body);
        
        let { sessionId } = request.cookies
        if(sessionId){
            //consulta para ver se essa session ja votou
            const userPreviousVoteOnPoll = await prisma.vote.findUnique({
                where: {
                    sessionId_pollId: {
                        sessionId,
                        pollId
                    }
                }
            })
        if(userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !=  pollOptionId){
            //apagar o voto anterior
            //Cria um novo voto
            await prisma.vote.delete({
                where : {
                    id: userPreviousVoteOnPoll.id,
                }
            })

          
            const votes =  await redis.zincrby(pollId,1,  userPreviousVoteOnPoll.pollOptionId)
            voting.publish(pollId, {
                pollOptionId: userPreviousVoteOnPoll.pollOptionId,
                votes: Number(votes),
            })
        } else if(userPreviousVoteOnPoll){
            return reply.status(400).send({ messege: 'you already voted on this poll '})
        }
        
        }

        if(!sessionId){
            const sessionId = randomUUID()

            reply.setCookie('sessionId', sessionId,{
                path: '/',
                maxAge: 60 * 60 *24 *30, // 30 days
                signed: true,
                httpOnly:true // com essa informação so o backend vai conseguir ler as informações
            })

            
        }

        //Cria voto na session
        await prisma.vote.create({
            data: {
                sessionId,
                pollId,
                pollOptionId,
            }
        })

        const votes =  await redis.zincrby(pollId,1, pollOptionId)

        voting.publish(pollId, {
            pollOptionId,
            votes: Number(votes),
        })
        return reply.status(201).send();
    });



}
