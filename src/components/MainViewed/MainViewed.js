import styles from './MainViewed.module.scss';
import React, { useEffect, useState } from 'react';
import ViewedAdverts from '../Fetches/Stunneds/ViewedAdverts';
import { useDispatch, useSelector } from 'react-redux';
import Camera from '../../assets/main__сards/camera.jpg';
import { useNavigate } from 'react-router-dom';
import GetIdImages from '../Fetches/Images/GetIdImages';

const MainViewed = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAllAdverts = useSelector(state => state.myReducer.isAllAdverts);
    const isFullImages = useSelector(state => state.myReducer2?.isImages);

    const [isPhoto, setPhoto] = useState([]);
    const [allIndexCard, setAllIndexCard] = useState([]);
    const [allIdCardRandom, setAllIdCardRandom] = useState([]);
    const [viewed, setViewed] = useState([]);

    useEffect(() => {
        if (viewed.length === 0) {
            ViewedAdverts({ setViewed });
        }
        if (viewed.length > 0 && allIdCardRandom.length > 0) {
            GetIdImages({ setPhoto, allIdCardRandom })
        }
    }, [viewed, dispatch, isFullImages, allIdCardRandom])

    useEffect(() => {
        if (viewed?.length > 0 && allIdCardRandom?.length === 0) {
            const allId = viewed.map(el => el.id);
            // Проверяем, изменилось ли состояние перед установкой нового значения
            if (JSON.stringify(allIdCardRandom) !== JSON.stringify(allId)) {
                setAllIdCardRandom(allId);
            }
        }
    }, [viewed, allIdCardRandom]);

    useEffect(() => {
        if (allIdCardRandom && isAllAdverts && !allIndexCard) {
            allIdCardRandom.forEach(j => {
                const index = isAllAdverts.findIndex(el => el.id === j);
                if (index !== -1) {
                    setAllIndexCard(prevIds => [...prevIds, index]);
                }
            });
        }
    }, [allIndexCard, allIdCardRandom, isAllAdverts]);

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
        <div className={styles.main__viewed__wrap}>
            <label>Переглянуті товари</label><br />
            <div>
                {viewed.map((el, i) => {
                    const searchPhoto = (id) => {
                        const found = isPhoto.length > 0 ? isPhoto.find(item => item[0] === id) : null;
                        if (found && found[1] !== null) {
                            const blob = found[1];
                            return URL.createObjectURL(blob);
                        }
                        return Camera;
                    }

                    const curr = el.currency === "EUR" ? '€'
                        : el.currency === "USD" ? "$"
                            : "₴";
                    return (
                        <ul key={i}>
                            <li>
                                <img className={styles.viewed_img}
                                    src={isPhoto.length > 0 ? searchPhoto(el.id) : Camera} alt='logo' />
                            </li>
                            <li>
                                <span id={styles.main__viewed__span1}>{el.description}</span>
                            </li>
                            <li className={styles.main__wrap__prices}>
                                <div id={styles.main__viewed__span2}>{curr} {el.price}</div>
                            </li>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('whoIsIt');
                                    localStorage.setItem('whoIsIt', 'user');
                                    showCard(el.id);
                                }}
                            > Дивитися
                            </button>
                        </ul>
                    );
                })}
            </div>
        </div >
    )
}

export default MainViewed;