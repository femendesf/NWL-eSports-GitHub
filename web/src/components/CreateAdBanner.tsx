import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner(){
    
    return(
        <div className=' pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'>

        <div className='bg-[#2A2634] px-8 py-6 justify-between flex items-center'>

          <div>
            <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>

          <Dialog.DialogTrigger className='bg-violet-500 px-4 py-3 hover:bg-violet-600 text-white rounded flex items-center gap-3 justify-end'>
            <MagnifyingGlassPlus size={24}// ícone da lupa ao lado de 'Publicar anuncio'
            />
            Publicar anúncio
          </Dialog.DialogTrigger>

        </div>

      </div>
    )
    
}