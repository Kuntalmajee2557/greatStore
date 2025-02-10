import React from 'react';
import Tag from './Tag';
import CreateTime from './CreateTime';

interface ContentProps {
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

interface CardProps {
    content: ContentProps;
}

function BrainCard({ content }: CardProps) {
    console.log(content);

    return (
        <div className='w-full bg-white/5 rounded-md p-5 flex flex-col gap-4 border border-white/30 relative'>
            <p className='text-white/90 text-2xl font-semibold'>{content.title}</p>
            <p className='text-white/70'>{content.userId}</p>

            <div className='w-full flex gap-2 flex-wrap pb-2'>
                {content.tags?.map((tag) => (
                    <Tag key={tag.id} content={tag.title} />
                ))}
            </div>
            <CreateTime />
        </div>
    );
}

export default BrainCard;
