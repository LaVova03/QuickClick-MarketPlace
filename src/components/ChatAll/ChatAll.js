import React, { useState } from 'react';
import styles from './ChatAll.module.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostComments from '../Fetches/Comments/PostComments';
import GetComments from '../Fetches/Comments/GetComments';

const ChatAll = () => {

    const dispatch = useDispatch();

    const [message, setMessage] = useState('');

    const isAllChats = useSelector(state => state.myReducer3.isAllChats);
    const isUserName = useSelector(state => state.myReducer3.isUserName);

    useEffect(() => {
        console.log(isAllChats)
    }, [isAllChats])

    useEffect(() => {
        GetComments()
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            PostComments({ message, dispatch })
            setMessage('');
        }
    };

    return (
        <div className={styles.chat_all_wrap}>
            <header>ChatAll</header>
            <main>
                <ul className={styles.chat_wrap_messages}>
                    {isAllChats?.map(el => (
                        <li
                            key={el.id}
                            className={isUserName === el.username ? styles.chat_mess_left : styles.chat_mess_right}
                        >
                            <span
                                className={isUserName === el.username ? styles.chat_span_left : styles.chat_span_right}
                            >{el.message}</span>
                        </li>
                    ))}
                </ul>
                <label>{message}</label>
                <form onSubmit={handleSubmit} className={styles.chat_input_wrap}>
                    <div className={styles.chat_wrap_input}>
                        <input
                            type="text"
                            placeholder='Ваше повідомлення'
                            value={message || ''}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type='submit'>
                        </button>
                    </div>
                </form>
            </main >
        </div >
    )
}

export default ChatAll;