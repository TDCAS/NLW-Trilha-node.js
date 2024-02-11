# Projeto Enquete - NLW Trilha Node.js

![image](https://github.com/TDCAS/NLW-Trilha-node.js/assets/53353680/d13d869b-3bc1-495f-b746-34ae73e33c94)

## Dependências

- Node.js: v20.11.0
- npm: v10.2.4
- Docker: v25.0.2, build 29cf629

## Como Rodar o Projeto

1. Certifique-se de ter o Docker instalado em sua máquina.
2. Clone este repositório em sua máquina local.
3. Na pasta raiz do projeto, execute o seguinte comando para subir os containers Docker do PostgreSQL e do Redis:

```bash
docker compose up -d
```

4. Após os containers estarem em execução, execute os seguintes comandos no terminal:
```bash
npm i
npx prisma migrate dev
npm run dev
```

5. Agora, o projeto estará em execução e pronto para uso.

## Rotas

### /polls - Criar Enquete

- Método: POST
- Corpo da Requisição (JSON):

```json
{
	"title": "Tópicos da Enquete",
	"options": ["Express", "Fastify", "NestJs", "HapiJs"]
}
```

- Cabeçalho da Requisição:

```
Content-Type: application/json
```

- Retorno (JSON):

```json
{
	"pollId": "idAleatorio"
}
```

### /polls/:pollId - Obter Enquete pelo ID

- Método: GET
- Parâmetros da URL: `pollId` (ID da Enquete)
- Cabeçalho da Requisição:

```
Content-Type: application/json
```

- Retorno (JSON):

```json
{
	"poll": {
		"id": "idAleatorio",
		"title": "Tópicos da Enquete",
		"createdAt": "2024-02-11T03:45:09.036Z",
		"updatedAt": "2024-02-11T03:45:09.036Z",
		"options": [
			{
				"id": "idAleatorio",
				"title": "Express",
				"score": 0
			},
			{
				"id": "idAleatorio",
				"title": "Fastify",
				"score": 0
			},
			{
				"id": "idAleatorio",
				"title": "NestJs",
				"score": 1
			},
			{
				"id": "idAleatorio",
				"title": "HapiJs",
				"score": -1
			}
		]
	}
}
```

### /polls/:pollId/votes - Votar em uma Opção da Enquete

- Método: POST
- Parâmetros da URL: `pollId` (ID da Enquete)
- Corpo da Requisição (JSON):

```json
{
	"pollOptionId": "idSelecionado"
}
```

- Cabeçalho da Requisição:

```
Content-Type: application/json
```

- Resultado: Sem resposta

### /polls/:pollId/results - Resultado da Enquete (Websocket)

- Método: WEBSOCKET
- Parâmetros da URL: `pollId` (ID da Enquete)
- Cabeçalho da Requisição:

```
Content-Type: application/json
```

- Resultado: Em desenvolvimento
