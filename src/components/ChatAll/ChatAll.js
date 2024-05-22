import React, { useState } from 'react';
import styles from './ChatAll.module.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AllAdverts from '../Fetches/Stunneds/AllAdverts';
// import EditCard from '../Fetches/EditCardPage/EditCardPage';

const ChatAll = () => {

    const dispatch = useDispatch();

    const [message, setMessage] = useState('');
    const [isCard, setCard] = useState(null);

    const isAllAdverts = useSelector(state => state.myReducer?.isAllAdverts);
    const idCard = localStorage.getItem('setIdCard');

    useEffect(() => {
        AllAdverts({ dispatch });
    }, [])

    useEffect(() => {
        if (isAllAdverts) {
            const advert = isAllAdverts.find(el => el.id === +idCard);
            setCard(advert);
        }
        console.log(isCard)
    }, [isAllAdverts, idCard, isCard])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // EditCard(isNewCard, isLocalHostiId, showSuccessfulModal, dispatch,
            //     tokenBearer, photoForServer, isData);
            setMessage('');
        }
    };

    return (
        <div className={styles.chat_all_wrap}>
            <header>ChatAll</header>
            <main>
                <label>{message}</label>
                <form onSubmit={handleSubmit} className={styles.chat_input_wrap}>
                    <input
                        type="text"
                        placeholder='Ваше повідомлення'
                        value={message || ''}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type='submit'>
                        Sent
                    </button>
                </form>
            </main>
        </div>
    )
}

export default ChatAll;