import React from 'react'
import Button from '../components/Button'
import PlusIcon from '../Icons/Plus'
import LogoIcon from '../Icons/Logo'
import SearchIcon from '../Icons/Search'
import Card from '../components/Card'
import SideItem from '../components/SideItem'

function Dashboard() {
  return (
    <div className='w-full h-full flex flex-col' style={{background: "linear-gradient(90deg, rgba(21, 45, 60, 1) 0%, rgba(8, 72, 66, 1) 28%, rgba(21, 87, 72, 1) 77%, rgba(28, 100, 111, 1) 100%)"}}>
      <div className='navbar bg-black/10 border border-b-white/5 h-20 flex items-center px-5' >
        <div className='leftItem w-1/2 flex justify-start gap-10 items-center'>
          <div className='flex gap-2'>
            <div className='text-white rotate-90'>
            <LogoIcon color1="#FF5733" color2="#4A90E2" size='32'/>
            </div>
            <p className=' font-medium font-semibold text-4xl font-bold bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 text-transparent bg-clip-text'>GreateStore</p>
          </div> 
          <div className='w-96 p-2 flex gap-2 items-center border border-stone-400 px-2 rounded-xl focus-within:border-white'>
            <SearchIcon className='size-5 text-white'/>
            <input type="text" className='text-xl text-white/80 outline-none'/>
          </div>
        </div>
        <div className='rightItem flex w-1/2 justify-end gap-2'>
          <Button varient='primary' text='Share' startIcon={<PlusIcon />}/>
          <Button varient='primary' text='Add' startIcon={<PlusIcon />}/>

        </div>
      </div>

      <div className='flex'>
          <div className='w-2/8 pt-10 px-5 flex flex-col gap-2'>
            <SideItem />
            <SideItem />
            <SideItem />
            <SideItem />
            <SideItem />
            <SideItem />
            <SideItem />


          </div>
          <div className='w-6/8 flex flex-wrap gap-5 pt-10 pb-10 pr-10'>
            <Card />
            <Card />
            <Card />
            <Card />

          </div>
        </div>
    </div>
  )
}

export default Dashboard