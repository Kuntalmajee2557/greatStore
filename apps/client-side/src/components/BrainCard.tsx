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

            {content.link && (
                <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 text-white py-2 px-4 rounded-md border border-white/30 hover:bg-white/90 hover:text-black/80 text-center text-lg font-medium"
                >
                    Open Link
                </a>
            )}

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
