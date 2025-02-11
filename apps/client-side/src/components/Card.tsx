import React, { useEffect, useState } from 'react';
import Tag from './Tag';
import CreateTime from './CreateTime';

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
    const [hasError, setHasError] = useState(false);

    // Load Twitter Embed Script for Tweets
    useEffect(() => {
        if (content.link?.includes('twitter.com') || content.link?.includes('x.com')) {
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            document.body.appendChild(script);

            script.onerror = () => setHasError(true);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [content.link]);

    const renderEmbeddedContent = (link?: string) => {
        if (!link) return null;

        // YouTube Embed
        if (link.includes('youtube.com') || link.includes('youtu.be')) {
            const videoId = link.includes('youtube.com')
                ? new URL(link).searchParams.get('v')
                : link.split('/').pop();
            return (
                <iframe
                    className="rounded-md w-full h-60"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={() => setHasError(true)}
                ></iframe>
            );
        }

        // Twitter Embed
        if (link.includes('twitter.com') || link.includes('x.com')) {
            return hasError ? (
                <div className="text-red-500 text-center bg-white/10 p-4 rounded-md">
                    <p className="text-lg font-semibold">404 - Content Not Found</p>
                    <p className="text-sm">Unable to display the Tweet.</p>
                </div>
            ) : (
                <blockquote className="twitter-tweet">
                    <a href={link}></a>
                </blockquote>
            );
        }

        // Medium Embed (if embeddable, currently fallback to Open Button)
        if (link.includes('medium.com')) {
            return null; // No embed for Medium, only the Open Link button
        }

        // GitHub Embed (if embeddable, currently fallback to Open Button)
        if (link.includes('github.com')) {
            return null; // No embed for GitHub, only the Open Link button
        }

        // Fallback for Unsupported Links
        return null;
    };

    return (
        <div className="w-3/10 h-max bg-white/5 rounded-md p-7 col-span-1 flex flex-col gap-2 border border-white/30 border-1 relative">
            <button
                className="absolute top-5 right-5 text-white/70 hover:text-white/90 bg-white/10 hover:bg-white/20 rounded-md px-3 py-1 border border-white/30 text-xl cursor-pointer"
                onClick={() => onDelete?.(content.id)}
                title="Delete"
            >
                &times;
            </button>

            <p className="text-white/90 text-2xl font-semibold">{content.title}</p>

            {/* Render Embedded Content */}
            {hasError ? (
                <div className="text-red-500 text-center bg-white/10 p-4 rounded-md">
                    <p className="text-lg font-semibold">404 - Content Not Found</p>
                    <p className="text-sm">Unable to display the content.</p>
                </div>
            ) : (
                renderEmbeddedContent(content.link)
            )}

            {/* Always Render Open Link Button */}
            {content.link && (
                <a href={content.link} target="_blank" rel="noopener noreferrer">
                    <button className="mt-4 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white/90 border border-white/30 px-4 py-2 rounded-md">
                        Open Link
                    </button>
                </a>
            )}

            <div className="w-full flex gap-2 flex-wrap pb-2">
                {content.tags?.map((tag) => (
                    <Tag key={tag.id} content={tag.title} />
                ))}
            </div>
            <CreateTime />
        </div>
    );
}

export default Card;
