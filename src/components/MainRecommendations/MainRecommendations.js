import styles from './MainRecommendations.module.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllAdverts from '../Fetches/Stunneds/AllAdverts';
import Camera from '../../assets/main__сards/camera.jpg';
import { useNavigate } from 'react-router-dom';

const MainRecommendations = ({ isCard }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAllAdverts = useSelector(state => state.myReducer.isAllAdverts);
    const isFullImages = useSelector(state => state.myReducer2?.isImages);

    const [isPhoto, setPhoto] = useState([]);

    const randomItems = isAllAdverts?.sort(() => 0.5 - Math.random()).slice(0, 10);
    const randomItemsCard = isAllAdverts?.sort(() => 0.5 - Math.random()).slice(0, 6);

    useEffect(() => {
        AllAdverts({ dispatch });
    }, [dispatch])

    useEffect(() => {
        const allIdCardRandom = [];

        if (randomItems) {
            randomItems.forEach(el => {
                allIdCardRandom.push(el.id);
            });
        }

        if (isFullImages) {
            const newPhotoUrls = [];
            allIdCardRandom?.forEach(el => {
                const imageData = isFullImages[el];
                if (imageData && imageData.length > 0) {
                    const base64String = imageData[0]; // Берем только нулевой элемент массива, если он существует
                    const byteCharacters = atob(base64String);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'image/jpeg' });
                    const url = URL.createObjectURL(blob);
                    newPhotoUrls.push(url);
                } else {
                    newPhotoUrls.push(null); // Если нулевого элемента нет, добавляем null
                }
            });
            setPhoto(newPhotoUrls);
        }

    }, [isFullImages]);

    const showCard = (idCard) => {
        localStorage.removeItem('part');
        localStorage.setItem('part', 'main');
        localStorage.removeItem('setIdCard');
        localStorage.setItem('setIdCard', idCard);
        navigate('/view_product');
    }

    useEffect(() => {
        console.log(isAllAdverts);
    }, [isAllAdverts])

    return (
        <div className={styles.main__recommendations__wrap}>
            <label>Рекомендації</label><br />
            <div>
                {(!isCard ? randomItems : randomItemsCard)?.map((el, i) => {
                    const curr = el.currency === "EUR" ? '€'
                        : el.currency === "USD" ? "$"
                            : "₴"
                    return (
                        <ul key={i} id={isCard ? styles.main__recommendations__view : null}>
                            <li>
                                <img className={styles.recom_img} src={isPhoto[i] === null ? Camera : isPhoto[i]} alt='logo' />
                            </li>
                            <li>
                                <span id={styles.main__recommendations__span1}>{el.description}</span>
                            </li>
                            <li className={styles.main__recommendations__prices}>
                                <div id={styles.main__recommendations__span2}>{curr} {el.price}</div>
                            </li>
                            <button onClick={() => showCard(el.id)}>Дивитися</button>
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}

export default MainRecommendations;