import React, { useState } from 'react'
import Button from '../components/Button'
import PlusIcon from '../Icons/Plus'
import LogoIcon from '../Icons/Logo'
import SearchIcon from '../Icons/Search'
import Card from '../components/Card'
import SideItem from '../components/SideItem'
import ShareIcon from '../Icons/Share'
import Navbar from '../components/Navbar'
import ModalItem from '../components/ModalItem'
import CancelIcon from '../Icons/Cancel'
import Modal from '../components/Modal'

function Dashboard() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  }
  return (
    <div className='w-full h-full flex flex-col' style={{ background: "linear-gradient(90deg, rgba(21, 45, 60, 1) 0%, rgba(8, 72, 66, 1) 28%, rgba(21, 87, 72, 1) 77%, rgba(28, 100, 111, 1) 100%)" }}>
      <Navbar />

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
      <button onClick={toggleModal} className='text-8xl border border-amber-50'>click</button>
      <Modal modal={modal} toggleModal={toggleModal}/>
    </div>
  )
}

export default Dashboard