import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { GameBanner } from './components/GameBanner';
import { CreateAdModal} from './components/CreatAdModal';

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdBanner } from './components/CreateAdBanner';
import axios from 'axios';

import "keen-slider/keen-slider.min.css"


interface Game{
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([]) // Estado da lista de games (vazia). Usando tipagem <Game> para definir quais são os formatos dos objetos.

  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      origin: "center",
      perView: 3,
      spacing: 1,
     
      
    },
  })
  
  
  useEffect( () => {

    axios('http://localhost:3333/games') // Busca na API o local onde está a lista de jogos.
      .then(response =>{
        setGames(response.data) // Chamando função para atualizar o estado da lista de games com os dados recebidos da API.
      })

  }, [])
  
 
  return( 
    
    

    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      

      <img src={logoImg} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>
        
      <div ref={sliderRef} className="keen-slider m-0">   
        
          {games.map(game => {

              return(
                <div className="keen-slider__slide mt-6 items-center bg-slate-50 flex justify-center ">
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
      
      
        
      <Dialog.Root>

        <CreateAdBanner/>

        <CreateAdModal/>

      </Dialog.Root>
      
      
    </div>
  )
}

export default App
