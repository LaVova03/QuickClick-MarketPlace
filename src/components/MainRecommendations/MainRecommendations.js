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
    const [allIndexCard, setAllIndexCard] = useState([]);
    const [data, setData] = useState(null);
    const [allIdCardRandom, setAllIdCardRandom] = useState([]);

    const randomItems = isAllAdverts?.sort(() => 0.5 - Math.random()).slice(0, 10);
    const randomItemsCard = isAllAdverts?.sort(() => 0.5 - Math.random()).slice(0, 6);

    useEffect(() => {
        AllAdverts({ dispatch });
    }, [dispatch])

    useEffect(() => {
        if (!isCard && randomItems && !data) {
            setData(randomItems);
        }
        if (isCard && randomItemsCard && !data) {
            setData(randomItemsCard);
        }
        if (data && allIdCardRandom.length === 0) {
            data.forEach((el, i) => {
                setAllIdCardRandom(prevIds => [...prevIds, el.id]);
            });
        }
    }, [data, randomItems, randomItemsCard, isCard, allIdCardRandom]);

    useEffect(() => {
        const newPhotoUrls = [];
        // Проверяем, существует ли массив isFullImages и есть ли в нем хотя бы один элемент
        if (isFullImages) {
            // Перебираем все элементы массива isFullImages
            for (const imageData of isFullImages) {
                // Проверяем, есть ли в текущем элементе изображение под индексом 0
                if (imageData && imageData.length > 0 && imageData[0]) {
                    const base64String = imageData[0];
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
                    newPhotoUrls.push(null);
                }
            }
            // Устанавливаем новые URL в состояние photo
            setPhoto(newPhotoUrls);
        }
    }, []);

    useEffect(() => {
        if (allIdCardRandom && isAllAdverts) {
            allIdCardRandom.forEach(j => {
                const index = isAllAdverts.findIndex(el => el.id === j);
                if (index !== -1) {
                    setAllIndexCard(prevIds => [...prevIds, index]);
                }
            });
        }
    }, [allIndexCard]);

    const showCard = (idCard) => {
        let index = null;
        if (idCard) {
            isAllAdverts.forEach((el, i) => el.id === idCard ? index = i : null);
        }
        localStorage.removeItem('part');
        localStorage.setItem('part', 'main');
        localStorage.removeItem('setIdCard');
        localStorage.setItem('setIdCard', idCard);
        localStorage.removeItem('indexCard');
        localStorage.setItem('indexCard', index);
        navigate('/view_product');
    }

    return (
        <div className={styles.main__recommendations__wrap}>
            <label>Рекомендації</label><br />
            <div>
                {data?.map((el, i) => {
                    {/* console.log(data, isPhoto) */}
                    const indexCard = isAllAdverts.findIndex((item) => item.id === el.id);
                    const curr = el.currency === "EUR" ? '€'
                        : el.currency === "USD" ? "$"
                            : "₴"
                    return (
                        <ul key={i} id={isCard ? styles.main__recommendations__view : null}>
                            <li>
                                <img className={styles.recom_img} src={isPhoto[indexCard] === null ? Camera : isPhoto[indexCard]} alt='logo' />
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