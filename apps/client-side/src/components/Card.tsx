import Tag from './Tag';

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
    return (
        <div className="w-3/10 h-max bg-white/5 rounded-md p-7 col-span-1 flex flex-col gap-4 border border-white/30 relative">
            <button
                className="absolute top-5 right-5 text-white/70 hover:text-white/90 bg-white/10 hover:bg-white/20 rounded-md px-3 py-1 border border-white/30 text-xl cursor-pointer"
                onClick={() => onDelete?.(content.id)}
                title="Delete"
            >
                &times;
            </button>

            <p className="text-white/90 text-2xl font-semibold">{content.title}</p>

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

            <div className="w-full flex gap-2 flex-wrap pb-2">
                {content.tags?.map((tag) => (
                    <Tag key={tag.id} content={tag.title} />
                ))}
            </div>
            {/* <CreateTime /> */}
        </div>
    );
}

export default Card;
