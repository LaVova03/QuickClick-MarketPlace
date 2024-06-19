import React, { useEffect, useState } from 'react';
import styles from './CategoryPageBody.module.scss';
import CategoryAdverts from '../Fetches/Stunneds/CategoryAdverts';
import Camera from '../../assets/main__сards/camera.jpg';
import GetIdImages from '../Fetches/Images/GetIdImages';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputFindAdverts from '../Fetches/Stunneds/InputFindAdverts';

const CategoryPageBody = () => {
    const isCategoryLocal = sessionStorage.getItem('category_page');
    const ruCategory = sessionStorage.getItem('ruCategory');
    const search = sessionStorage.getItem('search');

    const isAllAdverts = useSelector(state => state.myReducer.isAllAdverts);

    const navigate = useNavigate();

    const [categoryAdverts, setCategoryAdverts] = useState([]);
    const [category, setCategory] = useState('');
    const [isPhoto, setPhoto] = useState([]);
    const [allIdCardRandom, setAllIdCardRandom] = useState([]);

    useEffect(() => {
        InputFindAdverts()
    }, [])

    useEffect(() => {
        if (isCategoryLocal && !category) {
            setCategory(isCategoryLocal);
        }
    }, [isCategoryLocal, category]);

    useEffect(() => {
        if (category && categoryAdverts.length === 0) {
            CategoryAdverts({ category, setCategoryAdverts });
        }
    }, [category, categoryAdverts.length]);

    useEffect(() => {
        if (categoryAdverts.length > 0 && allIdCardRandom.length > 0) {
            GetIdImages({ setPhoto, allIdCardRandom })
        }
        if (categoryAdverts?.length > 0 && allIdCardRandom?.length === 0) {
            const allId = categoryAdverts.map(el => el.id);
            // Проверяем, изменилось ли состояние перед установкой нового значения
            if (JSON.stringify(allIdCardRandom) !== JSON.stringify(allId)) {
                setAllIdCardRandom(allId);
            }
        }
    }, [allIdCardRandom, categoryAdverts]);

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
        <div className={styles.category_page_wrap}>
            <label>
                {search ?
                    <>
                        <button onClick={() => navigate(-1)}></button>Результати пошуку
                    </>
                    : ruCategory}
            </label>
            <br />
            {categoryAdverts.length === 0 ?
                <div className={styles.category_page_empty}>
                    <label>Тут поки що не має оголошень</label>
                    <div />
                </div>
                : <div>
                    {categoryAdverts?.map((el, i) => {
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
                            <ul key={i} id={styles.category_page_view}>
                                <li>
                                    <img className={styles.category_page_img}
                                        src={isPhoto.length > 0 ? searchPhoto(el.id) : Camera} alt='logo' />
                                </li>
                                <li>
                                    <span id={styles.category_page_span1}>{el.description}</span>
                                </li>
                                <li className={styles.category_page_prices}>
                                    <div id={styles.category_page_span2}>{curr} {el.price}</div>
                                </li>
                                <button onClick={() => {
                                    localStorage.removeItem('whoIsIt');
                                    localStorage.setItem('whoIsIt', 'user');
                                    showCard(el.id);
                                }}>Дивитися</button>
                            </ul>
                        );
                    })}
                </div>
            }
        </div>
    );
};

export default CategoryPageBody;
