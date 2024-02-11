import { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub";
import { z } from "zod";


export async function pollRsults(app: FastifyInstance){
    app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
        const getPollParams = z.object({
            pollId: z.string().uuid(),
        });
        const { pollId } = getPollParams.parse(request.params);
        
        voting.subscribe(pollId, (message)=> {
            connection.socket.send(JSON.stringify(message))
        })

          //Inscrever apenas nas memsagens publicadas no canal com o ID da enquente (pollIed)
    })
}

// desing pattern 

// Pub/Sub - Publish

// '1' => 1,2,3,4,5