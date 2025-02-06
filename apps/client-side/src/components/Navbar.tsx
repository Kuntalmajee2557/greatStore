import React from 'react'
import LogoIcon from '../Icons/Logo'
import SearchIcon from '../Icons/Search'
import Button from './Button'
import ShareIcon from '../Icons/Share'
import PlusIcon from '../Icons/Plus'

function Navbar() {
  return (
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
          <Button varient='primary' text='Share' startIcon={<ShareIcon className='size-3' />}/>
          <Button varient='primary' text='Add' startIcon={<PlusIcon className='size-4'/>}/>

        </div>
      </div>
  )
}

export default Navbar