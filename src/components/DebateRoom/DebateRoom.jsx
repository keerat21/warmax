import React, { useState, useEffect, useRef } from 'react';
import mohan from "../../assets/images/Mohan-muruge.jpg";
import './DebateRoom.scss';

function DebateRoom({ topicId, topicTitle }) {
    const [comments, setComments] = useState([]);
    const replyInputRef = useRef(null);

    // Initialize or load comments when topic changes
    useEffect(() => {
        // In a real app, you would fetch comments from Firebase here
        // For now, we'll simulate with local data
        setComments([
            {
                id: `${topicId}-1`,
                author: "Team A",
                avatar: mohan,
                text: `Initial discussion for ${topicTitle}`,
                likes: 0,
                dislikes: 0,
                replies: []
            }
        ]);
    }, [topicId, topicTitle]);

    const handleLike = (commentId) => {
        setComments(prevComments => {
            const updateLikes = (comments) => {
                return comments.map(comment => {
                    if (comment.id === commentId) {
                        return { ...comment, likes: comment.likes + 1 };
                    }
                    if (comment.replies) {
                        return { ...comment, replies: updateLikes(comment.replies) };
                    }
                    return comment;
                });
            };
            return updateLikes(prevComments);
        });
    };

    const handleDislike = (commentId) => {
        setComments(prevComments => {
            const updateDislikes = (comments) => {
                return comments.map(comment => {
                    if (comment.id === commentId) {
                        return { ...comment, dislikes: comment.dislikes + 1 };
                    }
                    if (comment.replies) {
                        return { ...comment, replies: updateDislikes(comment.replies) };
                    }
                    return comment;
                });
            };
            return updateDislikes(prevComments);
        });
    };

    const [newReply, setNewReply] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);

    const handleReply = (commentId) => {
        setReplyingTo(commentId);
    };

    const submitReply = (parentId) => {
        if (!newReply.trim()) return;

        setComments(prevComments => {
            const addReply = (comments) => {
                return comments.map(comment => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            replies: [...comment.replies, {
                                id: `${topicId}-${Date.now()}`,
                                author: "Team B",
                                avatar: mohan,
                                text: newReply,
                                likes: 0,
                                dislikes: 0,
                                replies: []
                            }]
                        };
                    }
                    if (comment.replies) {
                        return { ...comment, replies: addReply(comment.replies) };
                    }
                    return comment;
                });
            };
            return addReply(prevComments);
        });

        setNewReply('');
        setReplyingTo(null);
    };

    const Comment = ({ comment, level = 0 }) => (
        <div className={`debate-comment level-${level}`}>
            <div className="debate-comment__content">
                <img src={comment.avatar} alt={`${comment.author} avatar`} className="debate-comment__avatar" />
                <div className="debate-comment__main">
                    <div className="debate-comment__author">{comment.author}</div>
                    <p className="debate-comment__text">{comment.text}</p>
                    <div className="debate-comment__actions">
                        <button className="debate-comment__button debate-comment__button--like" onClick={() => handleLike(comment.id)}>
                            👍 {comment.likes}
                        </button>
                        <button className="debate-comment__button debate-comment__button--dislike" onClick={() => handleDislike(comment.id)}>
                            👎 {comment.dislikes}
                        </button>
                        <button className="debate-comment__button debate-comment__button--reply" onClick={() => handleReply(comment.id)}>
                            Reply
                        </button>
                    </div>
                    {replyingTo === comment.id && (
                        <div className="debate-comment__reply-form">
                            <textarea
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                placeholder="Write your reply..."
                                className="debate-comment__reply-input"
                                ref={replyInputRef}
                            />
                            <button
                                className="debate-comment__submit-reply"
                                onClick={() => submitReply(comment.id)}
                            >
                                Submit Reply
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {comment.replies && comment.replies.length > 0 && (
                <div className="debate-comment__replies">
                    {comment.replies.map(reply => (
                        <Comment key={reply.id} comment={reply} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="debate-room">
            <h2 className="debate-room__heading">Debate Room - {topicTitle}</h2>
            <section className="debate-threads">
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </section>
        </div>
    );
}

export default DebateRoom;
