import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon} from '@radix-ui/react-icons';
import {Check, GameController, MagnifyingGlassPlus} from 'phosphor-react'
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Input } from "./Form/Input";
import axios from "axios";
import { useEffect, useState, FormEvent } from "react";

import {useForm} from 'react-hook-form'

import { z } from "zod";
import {zodResolver} from '@hookform/resolvers/zod'

interface Game{
  id: string,
  title: string
}

 const schema = z.object({

    name: z.string().min(1, {message: 'Required'}),
    yearsPlaying: z.number().int(),
    discord: z.string(),
    weekDays: z.number().array(),
    hourStart: z.number().int(),
    hourEnd: z.number().int(),

  }).required()
  
export function CreateAdModal(){

  const [games, setGames] = useState<Game[]>([]) // 
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setVoiceChannel] = useState(false) 
  const [gameSelected, setSelectGame] = useState<string>()


  const {register, handleSubmit , formState: {errors}} = useForm({
    resolver: zodResolver(schema)
  })

  useEffect( () => {

    axios('http://localhost:3333/games')
      .then(response =>{
        setGames(response.data) 
      })

  }, [])


  
  async function handleCreateAd(event:  FormEvent){
    event.preventDefault() // Para prevenir o comportamento padrão.
    
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    
    console.log(data)
  
      try{
        await axios.post(`http://localhost:3333/game/${gameSelected}/ads`,
          {
            name: data.name,
            yearsPlaying: Number(data.yearsPlaying),
            discord: data.discord,
            weekDays: weekDays.map(Number),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoiceChannel: useVoiceChannel
          }
        ) 

        alert('Anúncio criado com sucesso')
        
        } catch (err){
            console.log(err)
            alert('Complete todos os campos')
          }
  }
 
  return (
    <Dialog.Portal>

    <Dialog.Overlay className='bg-black/60 inset-0 fixed'>

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>

        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

          <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4 '>

            <div className='flex flex-col gap-2 content-between'>

              <label className='font-semibold' htmlFor="game">Qual o game?
              </label>

              <Select.Root value={gameSelected} onValueChange={setSelectGame} {...register("selectRoot", {required: true})}>
           
                <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm justify-between inline-flex">
                  <Select.Value 
                    placeholder="Selecione o game">
                    
                  </Select.Value>
                  <Select.Icon>
                    <ChevronDownIcon></ChevronDownIcon>
                  </Select.Icon>
                  
                </Select.Trigger>
                
                  <Select.Portal className="rounded content-between inline-flex m-3 mr-1">

                    <Select.Content>

                      <Select.ScrollUpButton asChild>
                        <ChevronUpIcon/>  
                      </Select.ScrollUpButton>  
                      
                      <Select.Viewport>

                        {games.map(game => {
                            return <Select.Item 
                            key={game.id} 
                            value={game.id} 
                            className="bg-slate-700 rounded flex items-center p-5 h-4 m-1 ml-6 hover:bg-gray-800 hover:text-white justify-center"
                            
                            >
                  
                            <Select.ItemText>{game.title}</Select.ItemText>

                            <Select.ItemIndicator>
                              <CheckIcon></CheckIcon>
                            </Select.ItemIndicator>

                            </Select.Item>
                          })}
                        </Select.Viewport>

                        <Select.ScrollDownButton>
                          <ChevronDownIcon/>
                        </Select.ScrollDownButton>

                    </Select.Content>
                  </Select.Portal>
              </Select.Root>
              

            </div>

            <div className='flex flex-col gap-2'>

              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input  id="name" placeholder='Como te chamam dentro do game?' {...register("name", {required: true})}/>
              
            </div>

            <div className='grid grid-cols-2 gap-6'>

              <div className='flex flex-col gap 2'>
                <label htmlFor="yearsPlaying"> Joga há quantos anos?</label>
                <Input id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO' {...register("yearsPlaying", {required: true})}/>
                {errors.yearsPlaying && "Nome necessario"}
              </div>

              <div className='flex flex-col gap 2'>
                 <label htmlFor="discord">Qual seu Discord?</label>
                <Input id='discord' type="text" placeholder='Usuário#0000' {...register("discord", {required: true})} />
                {errors.discord && "Nome necessario"}
              </div>

            </div>
            

            <div className='flex gap-6'>

              <div className='flex flex-col gap-2'>
                <label htmlFor="weekDays">Quando costuma jogar?</label>
                
                <div>

                  <ToggleGroup.Root 
                    type="multiple" 
                    className="grid grid-cols-4 gap-2"
                    value={weekDays}
                    onValueChange={setWeekDays}
                    {...register("weekDays", {required: true})}
                    
                    >

                      <ToggleGroup.Item
                        value="0"
                        title="Domingo"
                        className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                      >
                        D
                      </ToggleGroup.Item>

                      <ToggleGroup.Item
                        value="1"
                        title="Segunda"
                        className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        S
                      </ToggleGroup.Item>

                      <ToggleGroup.Item
                        value="2"
                        title="Terça"
                        className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        T
                      </ToggleGroup.Item>

                      <ToggleGroup.Item
                        value="3"
                        title="Quarta"
                        className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        Q
                      </ToggleGroup.Item>

                      <ToggleGroup.Item
                        value="4"
                        title="Quinta"
                        className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        Q
                      </ToggleGroup.Item>

                      <ToggleGroup.Item
                        value="5"
                        title="Sexta"
                        className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        S
                      </ToggleGroup.Item>

                      <ToggleGroup.Item
                        value="6"
                        title="Sábado"
                        className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        S
                      </ToggleGroup.Item>

                  </ToggleGroup.Root>
                </div>
        
              </div>

              <div className='flex flex-col gap-2 flex-1'>

                <label htmlFor="hourStart">Qual horário do dia?</label>

                  <div className='grid grid-cols-2 gap-2'>
                    <Input type="time" id="hourStart" placeholder='De' {...register("hourStart", {required: true})}/>
                    <Input type="time" id="hourEnd" placeholder='Até'{...register("hourEnd" , {required: true} )}/>

                  </div>
              </div>

            </div>


            <label className='mt-2 flex gap-2 text-sm items-center'>
              <Checkbox.Root 
                className="w-6 h-6 p-1 rounded bg-zinc-900"
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                    if(checked === true){
                      setVoiceChannel(true)
                    }else{
                      setVoiceChannel(false)
                    }
                }}
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>


            <footer className='mt-4 flex justify-end gap-4'>

              <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>

              <button
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
              type='submit'><GameController size={24}/> Encontrar duo</button>
              
            </footer>

          </form>
          
      </Dialog.Content>

    </Dialog.Overlay>
    
  </Dialog.Portal>
  )
    
}
