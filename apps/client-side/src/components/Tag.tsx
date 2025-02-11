
interface tagProps {
    content: string;
}

function Tag({content}:  tagProps) {
  return (
    <div className='text-xs text-white/90 font-semibold bg-white/30 hover:bg-white/60 hover:text-black/60 w-fit rounded-4xl px-3 py-0.5 border border-white/50'>
        {content}
    </div>
  )
}

export default Tag