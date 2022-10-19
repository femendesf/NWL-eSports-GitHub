import * as Dialog from '@radix-ui/react-dialog'

import { CreateAdModal} from './components/CreatAdModal';


import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdBanner } from './components/CreateAdBanner';


import { ListCarousel } from './components/ListCarousel';




interface Game{
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}


function App() {

 
  return( 
    
  
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>

      
      <img src={logoImg} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>
        
      
      <ListCarousel/>
    
      <Dialog.Root>

        <CreateAdBanner/>

        <CreateAdModal/>

      </Dialog.Root>
      
      
    </div>
  )
}

export default App
