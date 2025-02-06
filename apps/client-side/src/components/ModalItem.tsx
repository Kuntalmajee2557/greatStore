import React, { ReactElement } from 'react'

interface modalItemProps {
  startIcon: ReactElement;
  title: string;
  description: string;
}

function ModalItem({ startIcon, title, description }: modalItemProps) {
  return (
    <div className='border border-stone-700 col-span-1 row-span-1 hover:border-white rounded-md flex flex-col gap-2 items-center justify-center bg-stone-950 hover:bg-stone-900'>
        {startIcon}
      <h2 className='font-semibold'>{title}</h2>
      <p className='text-stone-200'>{description}</p>

    </div>
  )
}

export default ModalItem