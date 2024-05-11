import styles from './ViewBody.module.scss';
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from '../../redux/AddEdit/actions';
import Person from '../../assets/mainHeader/person.png';
import MainRecommendations from '../MainRecommendations/MainRecommendations';
import AllPersonAdverts from '../Fetches/Stunneds/AllPersonAdverts';

const ViewBody = () => {

    const sliderRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isData = useSelector(state => state.myReducer2.isData);
    const isArchiveData = useSelector(state => state.myReducer2.isArchiveData);
    const isImages = useSelector(state => state.myReducer2.isImages);

    const isIdCard = localStorage.getItem('setIdCard');
    const indexCard = localStorage.getItem('indexCard');
    const token = sessionStorage.getItem('login');
    const part = sessionStorage.getItem('part');

    const [photoUrl, addPhotoUrl] = useState([]);
    let [itemSlider, setItemSlider] = useState(0);

    useEffect(() => {
        const newPhotoUrls = [];

        isImages[indexCard]?.forEach((base64String, index) => {
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            newPhotoUrls.push(url);
        });

        addPhotoUrl(newPhotoUrls);

    }, [isImages, indexCard]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleNextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const handlePrevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    useEffect(() => {
        if (!isData && isIdCard) {
            AllPersonAdverts(setData, dispatch, token, part)
        }
    }, [isData, isIdCard, dispatch, token, isImages, part])

    return (
        <div className={styles.view_body_wrap}>
            <header>
                <button
                    id={styles.view_btn_back}
                    onClick={() => navigate('/personal_area')}
                >
                </button>
            </header>

            {(part === "active" ? isData : isArchiveData).map(el => {
                if (el.id === +isIdCard) {
                    const jsonString = el.address;
                    const address = JSON.parse(jsonString);
                    return (
                        <main key={el.id}>
                            <header>
                                <label>{el.title}</label>
                            </header>
                            <div id={styles.wrap_slider}>
                                {/* <div>Loading...</div> */}
                                <Slider ref={sliderRef} {...settings}>
                                    {photoUrl.map((el, index) => {
                                        if (el) {
                                            return (
                                                <div className={styles.main__first__slide} key={index}>
                                                    <img src={el} alt={`slide-${index}`} />
                                                </div>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })}
                                </Slider>
                                <button id={styles.mainslider__btn__left} onClick={() => {
                                    if (itemSlider > 0) {
                                        setItemSlider(--itemSlider);
                                    }
                                    console.log('back')
                                    handlePrevSlide();
                                }}></button>
                                <button id={styles.mainslider__btn__right} onClick={() => {
                                    if (itemSlider + 1 < photoUrl.length) {
                                        setItemSlider(++itemSlider);
                                    }
                                    console.log('next')
                                    handleNextSlide();
                                }}></button>
                            </div>
                            <div id={styles.view_card_wrap}>
                                <ul className={styles.view_description_wrap}>
                                    <li>
                                        {`${el.currency === "UAH" ? '₴' :
                                            el.currency === "EUR" ? '€' :
                                                '$'} ${el.price}`}
                                    </li>
                                    <li>{el.category}</li>
                                    <li>н.п. {address.city}</li>
                                    <li id={styles.view_personal_data}>
                                        <ul>
                                            <li>
                                                <img src={Person} alt='logo' />
                                                <div id={styles.viev_salles}>
                                                    <label>{el.user.firstName}</label>
                                                    <div id={styles.view_sallesperon}>Продавець</div>
                                                </div>
                                            </li>
                                            <li>н.п. {address.city}</li>
                                            <li>Був на сайті 10 хв назад</li>
                                            <li>{el.phone}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div id={styles.view_description}>{el.description}</div>
                        </main>
                    );
                }
                return null;
            })}
            <div className={styles.view_recommend_wrap}>
                <MainRecommendations isCard />
            </div>
        </div >
    )
}

export default ViewBody;