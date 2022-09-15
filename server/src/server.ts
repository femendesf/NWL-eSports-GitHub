import express from "express";

const app = express()

app.get('/ads', (request, response) => {
    return response.json([
        { id: 1, name: 'Anúncio 1'},
        { id: 2, name: 'Anúncio 2'},
        { id: 3, name: 'Anúncio 3'},
        { id: 4, name: 'Anúncio 4'},
        { id: 5, name: 'Anúncio 5'},
        { id: 6, name: 'Anúncio 6'},
    ])
}) //request é a requisição que nós vamos pegar, no caso do anuncio, podemos pegar qual é o jogo, o tempo jogado e outros. E o response serva para devolver uma resposta
   

app.listen(3333)