

interface GameBannerProps{
    bannerUrl: string,
    title: string,
    adsCount: number,
}

export function GameBanner(props: GameBannerProps){
    
    return(


        <a href="" className='relative rounded-lg overflow-hidden ed-lg overflow-hidden'>
          <img src={props.bannerUrl} alt="" />
            
          <div className='absolute bottom-0 left-0 right-0 bg-game-gradient w-full pt-16 pb-4 px-4'>
     
            <strong className='text-white block font-bold'>{props.title}</strong>
            <span className='text-zinc-300 text-sm block'>{props.adsCount} anúncio(s)</span>

          </div>
        </a>
    )
}
