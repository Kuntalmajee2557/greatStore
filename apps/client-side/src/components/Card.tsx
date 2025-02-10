import React from 'react'
import Tag from './Tag'
import CreateTime from './CreateTime'

interface contentProps {
    id: string;
    link?: string;
    type: string;
    title: string;
    userId: string;
    tags?: {
        id: string;
        title: string;
    }[];
}

interface cardProps {
    content: contentProps;
    onDelete?: (id: string) => void;
}

function Card({ content, onDelete }: cardProps) {
    console.log(content);

    return (
        <div className='w-3/10 h-max bg-white/5 rounded-md p-7 col-span-1 flex flex-col gap-2 border border-white/30 border-1 relative'>
            <button
                className="absolute top-5 right-5 text-white/70 hover:text-white/90 bg-white/10 hover:bg-white/20 rounded-md px-3 py-1 border border-white/30 text-xl cursor-pointer"
                onClick={() => onDelete?.(content.id)}
                title="Delete"
            >
                &times;
            </button>

            <p className='text-white/90 text-2xl font-semibold'>{content.title}</p>
            <p>{content.userId}</p>

            {/* <iframe
                className='rounded-md'
                src="https://www.youtube.com/embed/ApXoWvfEYVU"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe> */}

            {/* <blockquote className="twitter-tweet">
                <a href="https://x.com/Rahulsainlll/1885204404191527415"></a>
            </blockquote> */}

            <div className='w-full flex gap-2 flex-wrap pb-2'>
                {content.tags?.map((tag) => (
                    <Tag key={tag.id} content={tag.title} />
                ))}
            </div>
            <CreateTime />
        </div>
    );
}

export default Card;
