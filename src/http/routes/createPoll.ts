import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function createPoll(app: FastifyInstance) {

    app.post('/polls', async (request, reply) => {
        //status 201 seginifica que deu certo a requizição e foi creado o dado
        const createPollBody = z.object({
            title: z.string(),
            options: z.array(z.string()),
        });
        const { title, options } = await createPollBody.parse(request.body);
        
        const poll = await prisma.poll.create({
            data: {
                title,
                options:{
                    createMany: {
                        data: options.map(option => {
                            return { title: option}
                        }),
                    }
                },
            }
        });

        return reply.status(201).send({ pollId: poll.id });
    });



}
