import React, { useState, useEffect } from 'react';
import mohan from "../../assets/images/Mohan-muruge.jpg";
import './TeamRoom.scss';

function TeamRoom({ topicId, topicTitle }) {
    const [chats, setChats] = useState([]);

    // Initialize or load chats when topic changes
    useEffect(() => {
        // In a real app, you would fetch chats from Firebase here
        // For now, we'll simulate with local data
        setChats([
            {
                id: `${topicId}-1`,
                author: "Team Member",
                avatar: mohan,
                text: `Team discussion for ${topicTitle}`,
                likes: 0,
                dislikes: 0
            }
        ]);
    }, [topicId, topicTitle]);

    const handleLike = (chatId) => {
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === chatId
                    ? { ...chat, likes: chat.likes + 1 }
                    : chat
            )
        );
    };

    const handleDislike = (chatId) => {
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === chatId
                    ? { ...chat, dislikes: chat.dislikes + 1 }
                    : chat
            )
        );
    };

    const Chat = ({ chat }) => (
        <div className="chats__posted">
            <div className="chats__content">
                <img src={chat.avatar} alt={`${chat.author} avatar`} className="chats__image" />
                <div className="chats__main">
                    <div className="chats__author">{chat.author}</div>
                    <p className="chats__text">{chat.text}</p>
                    <div className="chats__actions">
                        <button className="chats__button chats__button--like" onClick={() => handleLike(chat.id)}>
                            👍 {chat.likes}
                        </button>
                        <button className="chats__button chats__button--dislike" onClick={() => handleDislike(chat.id)}>
                            👎 {chat.dislikes}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className='team-room'>
            <h2 className="team-room__heading">Team Room - {topicTitle}</h2>
            <section className="chats">
                {chats.map(chat => (
                    <Chat key={chat.id} chat={chat} />
                ))}
            </section>
        </div>
    );
}

export default TeamRoom;