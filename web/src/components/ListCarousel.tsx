import React, { useEffect, useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider} from 'keen-slider/react'
import axios from 'axios'
import { GameBanner } from './GameBanner'


interface Game{
    id: string,
    title: string,
    bannerUrl: string,
    _count: {
      ads: number
    }
}

 export  function ListCarousel(){

    const [games, setGames] = useState<Game[]>([])// Estado da lista de games (vazia). Usando tipagem <Game> para definir quais são os formatos dos objetos.

    useEffect( () => {
  
        axios('http://localhost:3333/games') // Busca na API o local onde está a lista de jogos.
          .then(response =>{
            setGames(response.data) // Chamando função para atualizar o estado da lista de games com os dados recebidos da API.
          })
    
    }, games);
    
  
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        mode: "free-snap",
        slides: {
            origin: "center",
            perView: 3,
            spacing: 10,
        },
      created: (() => {true})
    })

    if(games.length > 1){
      return (
        
        <div ref={sliderRef} className="keen-slider mx-4 mt-6" >  
      
         {games &&
           games.map(game => {
      
             return(
                  
                 <div key={game.id} className="keen-slider__slide  flex" >

                    <GameBanner 
                    key={game.id} // Propriedade para o React identificar cada jogo e fazer atualização caso seja excluido, para não ter que recriar toda a lista novamente.
                    bannerUrl={game.bannerUrl} 
                    title={game.title} 
                    adsCount={game._count.ads}
                    />
                    
                  </div>

               )
             }
           )}
    
        </div>
       ) 
    }
    
    



}