/* HTTP methods / API RESTful / HTTP Codes

**************************************** HTTP METHODS ******************************************************************
GET: Fazer uma leitura no nosso back-end.
POST: Criar algo no back-end.
PUT: Editar um entidade por completo, no caso um perfil, que pode ser editado varios campos ao mesmo tempo.
PATCH: Editar uma informação especifica dentro de uma entidade.
DETELE: deletar.
...
************************************************************************************************************************


********************************************** HTTP CODES **************************************************************

O HTTP Codes vai mostrar se a resposta que estamos recebendo, é uma resposta válida, qual que é o tipo de resposta que estamos recebendo do nosso back-end.

Os principais HTTP CODES são os que começam com:
'.status()':
2 - Sucesso,
3 - Redirecionamento,
4 - Erros gerado pela aplicação,
5 - Erros inesperados, não foi gerado por algum código especifico.
....
*************************************************************************************************************************

*/

/* Tipos de parâmetros da comuniação back-end e front-end:
 
  Query: são os parâmetros que vem da URL através do ponto de interrogação,
    Exemplo: localhost:3333/ads?page=2&sort=title
    - Vai gravar o estado da página, no caso se selecionamos um filtro, qual pagina estamos, etc...
    - Nunca vai passar informação sensivel, senhas por exemplo.
    - Os parâmetros sempre são nomeados, por exemplo 'page', 'sorte'.

 * Route: também são os parametros da internet
    - Não são nomedos.
    -  Identificador direto na URL, por exemplo: localhost:3333/post/como-criar-anuncio


 * Body:
    - Para enviar várias informações em uma unica requisição. Geralmente para envio de formulario.
    - Não fica na URL, fica escondido na requisição.
    - Recomendado para informações sensiveis, como cadastrar ou mudar senha
 */

import express, { request, response } from "express";

const app = express()


app.get('/games', (request, response) => {return response.json([])}) //Rota para listar os games.

app.post('/ads', (request, response) => {return response.status(201).json([])})// Rota para criar anuncios.
//Por mais que o endereço '/ads' possa ser o mesmo da outra rota, vai ser diferente por conta do método. Como usamos métodos diferentes, não precisamos criar um nome diferente na rota.
 
app.get('/game/:id/ads', (request, response) => { // Rota para acessar os anuncios do game.

    /*
        Caso queira retornar o parâmetro que foi definido: 
        const gameId= request.params.id;

        return response.send(gameID);
    */

    return response.json([
        { id: 1, name: 'Anúncio 1'},
        { id: 2, name: 'Anúncio 2'},
        { id: 3, name: 'Anúncio 3'},
        { id: 4, name: 'Anúncio 4'},
        { id: 5, name: 'Anúncio 5'},
        { id: 6, name: 'Anúncio 6'},
    ])
}) //request é a requisição que vamos pegar. No caso do anuncio podemos pegar qual é o jogo, o tempo jogado e outros. E o response serve para devolver uma resposta

app.get('/add/:id/discord', (request, response) => {
    return response.json([])
}) // Rota para buscar o Discord pelo ID do anúncio.

app.listen(3333)