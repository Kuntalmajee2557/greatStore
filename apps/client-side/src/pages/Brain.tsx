import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BrainCard from '../components/BrainCard';
import LogoIcon from '../Icons/Logo';

// Define the types for the API response
type Tag = {
    id: string;
    title: string;
};

type Content = {
    id: string;
    link: string;
    type: string;
    title: string;
    userId: string;
    tags: Tag[];
};

type BrainResponse = {
    username: string;
    links: {
        hash: string;
    }[];
    contents: Content[];
};

function Brain() {
    const [user, setUser] = useState<string>('');
    const [brain, setBrain] = useState<Content[]>([]); // Only contents will be mapped
    const { link } = useParams<{ link: string }>();

    useEffect(() => {
        if (link) {
            axios({
                url: `${import.meta.env.BACKEND_URL}/api/v1/brain/${link}`,
                method: 'GET',
            })
                .then((res) => {
                    console.log("API response:", res.data); // Debugging API response
                    if (res.status === 200) {
                        setUser(res.data.username);
                        // Ensure contents are extracted and set
                        setBrain(Array.isArray(res.data.brain.contents) ? res.data.brain.contents : []);
                    } else {
                        alert('Invalid link');
                    }
                })
                .catch((error) => console.error('Error fetching content:', error));
        }
    }, [link]);

    return (
        <div
            className="w-full h-full min-h-screen flex flex-col"
            style={{
                background:
                    'linear-gradient(90deg, rgba(21, 45, 60, 1) 0%, rgba(8, 72, 66, 1) 28%, rgba(21, 87, 72, 1) 77%, rgba(28, 100, 111, 1) 100%)',
            }}
        >
            {/* Navbar */}
            <div className='navbar bg-black/10 border border-b-white/5 h-20 flex items-center px-5'>
                <div className='text-white rotate-90'>
                    <LogoIcon color1="#FF5733" color2="#4A90E2" size='32' />
                </div>
                <p className='font-medium font-semibold text-4xl font-bold bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 text-transparent bg-clip-text'>GreateStore</p>
            </div>

            {/* Content */}
            <div className="p-4 max-w-screen-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-white">Brain of {user}</h1>
                <div
                    className="grid gap-6"
                    style={{
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    }}
                >
                    {brain.length > 0 ? (
                        brain.map((content: Content) => (
                            <BrainCard key={content.id} content={content} />
                        ))
                    ) : (
                        <p className="text-white/80 text-xl w-full text-center mt-10">
                            No content available
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Brain;
