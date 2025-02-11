
interface itemProps{
  title: string;
  handlefilter:(filer: string) => void;
}

function SideItem({title, handlefilter}: itemProps) {
  return (
    <div className='bg-white/5 p-2 pl-5 rounded-md hover:border hover:border-white/60 hover:bg-white/10 cursor-pointer' onClick={() => {
    if(title === 'All content'){
      handlefilter("all content");
      return;
    }
    handlefilter(title.toUpperCase())
  }
    }>
      <p className='text-white/90 font-bold'>{title}</p>
    </div>
  )
}

export default SideItem