import React from 'react'
import Tag from './Tag'
import CreateTime from './CreateTime'

function Card() {
    return (
        <div className='w-3/10 h-max bg-white/5 rounded-md p-7 col-span-1 flex flex-col gap-2 border border-white/30 border-1'>
            <p className='text-white/90 text-2xl font-semibold'>Title</p>
            <p className='text-white/50 hover:text-white/90'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit dolores consequatur impedt dolorem molestias! Exercitationem voluptates consequatur earum! Eveniet veritatis suscipit dicta iste laudantium eum, inventore sequi iusto quis magni!
            </p>
            <iframe
                className='rounded-md'
                src="https://www.youtube.com/embed/ApXoWvfEYVU"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <blockquote className="twitter-tweet">
                <a href="https://x.com/Rahulsainlll/1885204404191527415"></a>
            </blockquote>

            <div className='w-full flex gap-2 flex-wrap pb-2'>
                <Tag content='Webdev' />
                <Tag content='Webdev' />
                <Tag content='Webdev' />
                <Tag content='Webdev' />
                <Tag content='Webdev' />
                <Tag content='Webdev' />


            </div>
            <CreateTime />
        </div>
    )
}

export default Card