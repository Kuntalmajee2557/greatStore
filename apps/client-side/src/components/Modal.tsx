import React, { Dispatch, ReactInstance, SetStateAction } from 'react'
import ModalItem from './ModalItem';
import PlusIcon from '../Icons/Plus';
import CancelIcon from '../Icons/Cancel';

interface modalProps {
    modal: boolean; // React state to track whether the modal is open (boolean type)
    toggleModal: Dispatch<SetStateAction<boolean>>; // Function to update the modal state
  }

function Modal({modal, toggleModal}: modalProps) {
  return (
    
        modal ? (
            <div className='fixed h-full w-full bg-black/80 flex justify-center items-center'>
              <div className='border border-stone-600 w-1/3 h-1/2 bg-black rounded-md p-7 flex flex-col'>
                <div className='pb-5 flex justify-between'>
                  <div>
                  <h2 className='text-white text-2xl'>Add new content</h2>
                  <p className='text-stone-400'>Choose the type of content you want to add to your Second Brain.</p>
                  </div>
                  <button className='text-white relative border border-stone-700 p-2 rounded-md hover:border-stone-300 hover:bg-stone-900' onClick={toggleModal}><CancelIcon className='size-6'/></button>
                </div>
                <div className='text-white grid grid-cols-2 grid-rows-2 gap-4 w-full h-full'>
                  <ModalItem  startIcon={<PlusIcon className='size-7'/>} title='Video' description='Add your video'/>
                  <ModalItem startIcon={<PlusIcon className='size-7'/>} title='Video' description='Add your video'/>
                  <ModalItem startIcon={<PlusIcon className='size-7'/>} title='Video' description='Add your video'/>
                  <ModalItem startIcon={<PlusIcon className='size-7'/>} title='Video' description='Add your video'/>
                  
                </div>
              </div>
            </div>
          ):null
        
    )
        
}

export default Modal