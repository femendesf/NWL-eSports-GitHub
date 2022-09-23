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

/* Async/Await:
    Usamos para quando queremos que primeiro seja executado uma instrução.
    Adicionar 'async' na função que esta por volta da instrução que queremos que seja executada, e adicionamos 'await' antes da instrução.
*/


import express, { query, request, response } from "express";
import {PrismaClient} from '@prisma/client'
import { convertHourStringToMinutes } from "./utils/convert-hour-strinh-to-minutes";

const app = express()
const prisma = new PrismaClient({

    log:['query']
});

app.use(express.json()) // Por padrão o Express não entende informação no formato de JSON, com esse código esta fazendo com que ele entenda :).

app.post('/games/:id/ads', async (request, response) => {

    /*
        Body / Request:
        Vai ser usado o Body porque esta sendo passado várias informações, e algumas pode ser sensiveis.
    */
    const gameId = request.params.id;
    const body: any = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(","),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.status(201).json(ad)

})// Rota para criar anuncios.
//Por mais que o endereço '/ads' possa ser o mesmo da outra rota, vai ser diferente por conta do método. Como usamos métodos diferentes, não precisamos criar um nome diferente na rota.


app.get('/games', async (request, response) => {
    
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    ads:true
                }
            }
        }
    }) 
    /*Instrução para encontrar todos os jogos na tabela do banco de dados.
    Pode passar um objeto de configuração dentro do nosso findMany, no caso estamos usando um pra mostrar a contagem dos anuncios*/ 

    return response.json(games)

});//Rota para listar os games.


app.get('/games/:id/ads', async(request, response) => { // Rota para acessar os anuncios do game.

    const gameId = request.params.id // Retorna o parametro id que esta vindo da URL
    
    const ads = await prisma.ad.findMany({ // Intrução retorna os anuncios do game especifico
        select:{
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },

        where:{
            gameId
        },

        orderBy:{
            createdAt: 'desc'
        }
    })

    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(',') //Formatação do retorno dos dias da semana
        }
    }))
}) //request é a requisição que vamos pegar. No caso do anuncio podemos pegar qual é o jogo, o tempo jogado e outros. E o response serve para devolver uma resposta


app.get('/add/:id/discord', async (request, response) => {
    const AdID = request.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true
        },

        where:{
            id: AdID
        }
    })
    return response.json({
        discord: ad.discord
    })
}) // Rota para buscar o Discord pelo ID do anúncio.


app.listen(3333)