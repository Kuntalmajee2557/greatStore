import React from 'react'
import Button from '../components/Button'
import Plus from '../Icons/Plus'
import Logo from '../Icons/Logo'
import Search from '../Icons/Search'
import Card from '../components/Card'
import SideItem from '../components/SideItem'

function Dashboard() {
  return (
    <div className='w-full h-screen flex flex-col' style={{background: "linear-gradient(90deg, rgba(21, 45, 60, 1) 0%, rgba(8, 72, 66, 1) 28%, rgba(21, 87, 72, 1) 77%, rgba(28, 100, 111, 1) 100%)"}}>
      <div className='navbar bg-black/10 border border-b-white/5 h-16 flex items-center px-5' >
        <div className='leftItem w-1/2 flex justify-start gap-10 items-center'>
          <div className='flex gap-2'>
            <div className='text-white rotate-90'>
            <Logo color1="#FF5733" color2="#4A90E2" size='32'/>
            </div>
            <p className=' font-medium font-semibold text-4xl font-bold bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 text-transparent bg-clip-text'>GreateStore</p>
          </div> 
          <div className='w-48 border border-stone-400 flex items-center h-8'>
            <Search className='size-8 text-white'/>
            <input type="text" />
          </div>
        </div>
        <div className='rightItem flex w-1/2 justify-end gap-2'>
          <Button varient='primary' text='Share' startIcon={<Plus />}/>
          <Button varient='primary' text='Share' startIcon={<Plus />}/>

        </div>
      </div>

      <div className='flex'>
          <div className='w-2/8 pt-10 px-5 flex flex-col gap-2'>
            <SideItem />
            <SideItem />
            <SideItem />
            <SideItem />

          </div>
          <div className='w-6/8 flex gap-5 pt-10 pb-10 pr-10'>
            <Card />
            <Card />
            <Card />

          </div>
        </div>
    </div>
  )
}

export default Dashboard