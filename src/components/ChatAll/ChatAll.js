import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatAll.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostComments from '../Fetches/Comments/PostComments';
import GetComments from '../Fetches/Comments/GetComments';
import AllAdverts from '../Fetches/Stunneds/AllAdverts';
import GetIdImages from '../Fetches/Stunneds/GetIdImages';
// import DeleteComments from '../Fetches/Comments/DeleteComments';
import Trash from '../../assets/chat/trash.png';

const ChatAll = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const messagesEndRef = useRef(null);
    const [message, setMessage] = useState('');
    const [dataId, setDataId] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    const isAllChats = useSelector(state => state.myReducer3.isAllChats);
    const isAllAdverts = useSelector(state => state.myReducer?.isAllAdverts);
    const isAllIdimages = useSelector(state => state.myReducer2.isAllIdimages);
    const isUserName = localStorage.getItem('email');
    const idCard = localStorage.getItem('setIdCard');

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        let advert;
        if (isAllAdverts) {
            advert = isAllAdverts.find(el => el.id === +idCard);
        } else {
            AllAdverts({ dispatch })
        }
        if (advert && dataId.length === 0) {
            setDataId([advert]);
        }
    }, [idCard, isAllAdverts, dispatch, dataId]);

    useEffect(() => {
        if (idCard && photo.length === 0) {
            const id = [idCard];
            GetIdImages({ setPhoto, allIdCardRandom: id })
        }
    }, [isAllIdimages, idCard, photo])

    useEffect(() => {
        if (photo.length > 0) {
            const blob = photo[0][1];
            const url = URL.createObjectURL(blob);
            setImageUrl(url);

            // Очистка URL при размонтировании компонента
            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [photo]);

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

    // useEffect(() => {
    //     console.log(dataId)
    // }, [dataId])

    return (
        <div className={styles.chat_all_wrap}>
            <header>
                <ul>
                    <li>
                        <img src={imageUrl} alt='logo' />
                    </li>
                    <li>{dataId[0]?.title}</li>
                    <li>{dataId[0]?.currency} {dataId[0]?.firstPrice}</li>
                    <li>
                        <button
                        // onClick={() => DeleteComments(idCard)}
                        >
                            <img src={Trash} alt='logo' />
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate('/view_product')}>
                            Переглянути
                        </button>
                    </li>
                </ul>
            </header>
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
        </div >
    );
};

export default ChatAll;
