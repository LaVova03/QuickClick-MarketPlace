import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatAll.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import PostComments from '../Fetches/Comments/PostComments';
import GetComments from '../Fetches/Comments/GetComments';

const ChatAll = () => {

    const dispatch = useDispatch();

    const messagesEndRef = useRef(null);
    const [message, setMessage] = useState('');

    const isAllChats = useSelector(state => state.myReducer3.isAllChats);
    const isUserName = localStorage.getItem('email');
    const idCard = localStorage.getItem('setIdCard');

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

    // useEffect(() => {
    //     console.log(isUserName)
    // }, [isUserName])

    useEffect(() => {
        GetComments(idCard, dispatch);
    }, [idCard, dispatch]);

    useEffect(() => {
        scrollToBottom();
    }, [isAllChats]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            PostComments({ message, dispatch });
            setMessage('');
        }
    };

    return (
        <div className={styles.chat_all_wrap}>
            <header>ChatAll</header>
            <main>
                <ul ref={messagesEndRef} className={styles.chat_wrap_messages}>
                    {isAllChats?.map(el => (
                        <li
                            key={el.id}
                            className={el.username.includes(isUserName) ? styles.chat_mess_left : styles.chat_mess_right}
                        >
                            <span
                                className={el.username.includes(isUserName) ? styles.chat_span_left : styles.chat_span_right}
                            >
                                {el.message}
                            </span>
                        </li>
                    ))}
                </ul>
                <label>{message}</label>
                <form onSubmit={handleSubmit} className={styles.chat_input_wrap}>
                    <div className={styles.chat_wrap_input}>
                        <input
                            type="text"
                            placeholder='Ваше повідомлення'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type='submit'></button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default ChatAll;
