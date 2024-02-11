import fastify from "fastify"
import { createPoll } from "./routes/createPoll"
import { getPoll } from "./routes/get-poll"
import { voteOnPoll } from "./routes/vote-on-poll"
import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import { pollRsults } from "./ws/poll-result";






const app = fastify()
// GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS


app.register(cookie,{
    secret: "polls-app-nlw",
    hook: 'onRequest',
})

app.register(websocket)
app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollRsults)

app.listen({port: 3333}).then( () =>{
    console.log("HTTP server running")
})


//formas de se conectar no banco
//Drive nativo
//ORM ferramentas que trazem um legue de ferramente para trabalhar com banco de dados



// Primeiro dia criando api configurando habiente fazendo primeira requisição post e get

// Segundo dia separando o que é do banco 



// Enquente 1

// opção  1 -
// opção  2 -
// opção  3 - count()

