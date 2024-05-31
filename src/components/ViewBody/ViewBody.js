import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './ViewBody.module.scss';
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from '../../redux/AddEdit/actions';
import { showSuccessfulModal } from '../../redux/AddEdit/actions';
import { setEditWindow } from '../../redux/Main/actions';
import Person from '../../assets/mainHeader/person.png';
import MainRecommendations from '../MainRecommendations/MainRecommendations';
import AllPersonAdverts from '../Fetches/Stunneds/AllPersonAdverts';
import ArchiveAdverts from '../Fetches/EditCardPage/ArchiveAdverts';
import DeleteAdverts from "../Fetches/EditCardPage/DeleteAdverts";
import FetchActive from '../Fetches/Stunneds/FetchActive';
import Camera from '../../assets/main__сards/camera.jpg';
import { setToats } from '../../redux/Chat/actions';

const ViewBody = () => {

    const sliderRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isData = useSelector(state => state.myReducer2.isData);
    const isAllAdverts = useSelector(state => state.myReducer.isAllAdverts);
    const isArchiveData = useSelector(state => state.myReducer2.isArchiveData);
    const isImages = useSelector(state => state.myReducer2.isImages);
    const isSuccessfulWindow = useSelector(state => state.myReducer2?.isSuccessfulWindow);

    const isIdCard = localStorage.getItem('setIdCard');
    const indexCard = localStorage.getItem('indexCard');
    const token = sessionStorage.getItem('login');
    const part = localStorage.getItem('part');
    const admin = localStorage.getItem('whoIsIt');
    const archive = sessionStorage.getItem('archive');
    const isUserName = localStorage.getItem('email');

    const [photoUrl, addPhotoUrl] = useState([]);
    let [itemSlider, setItemSlider] = useState(0);
    const [localIdCard, setLocalIdCard] = useState('')
    const [allPhoto, setAllPhoto] = useState([]);
    const [person, setPerson] = useState(false);

    useEffect(() => {
        if (allPhoto.length === 0 && isImages) {
            setAllPhoto(isImages);
        }
        const newPhotoUrls = [];
        allPhoto[indexCard]?.forEach((base64String, index) => {
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

    }, [isImages, indexCard, allPhoto]);

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
        if (!isData && isIdCard && part !== 'main') {
            AllPersonAdverts(setData, dispatch, token, part)
        }
    }, [isData, isIdCard, dispatch, token, isImages, part])

    useEffect(() => {
        if (isSuccessfulWindow && archive) {
            dispatch(showSuccessfulModal());
            notifyError('Оголошення відправлено у архів');
            localStorage.removeItem('archive');
        }
    }, [admin, dispatch, archive, isSuccessfulWindow]);

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
        });
    };

    const changeData = async (id) => {
        try {
            await FetchActive(id);
        } catch {
            console.log("fetch data PUT cards error");
        }
    };

    useEffect(() => {
        if (localIdCard) {
            changeData(localIdCard);
            setLocalIdCard("");
        }
    }, [localIdCard])

    return (
        <div className={styles.view_body_wrap}>
            <header>
                <button
                    id={styles.view_btn_back}
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                </button>
            </header>

            {(part === "active" ? isData : part === "main" ? isAllAdverts : isArchiveData)?.map(el => {
                if (el.id === +isIdCard) {
                    const person = el.user.email.includes(isUserName);
                    let jsonString = el.address;
                    let address;
                    if (part) {
                        try {
                            const parsed = JSON.parse(jsonString);
                            // Проверка, что parsed это объект (включая массивы)
                            if (parsed && typeof parsed === 'object') {
                                address = parsed;
                            } else {
                                address = null;
                            }
                        } catch (e) {
                            // Если строка не является валидным JSON, оставляем как строку
                            address = null;
                        }
                    } else {
                        address = null; // Обработка для случая, когда part === 'main'
                    }
                    return (
                        <main key={el.id}>
                            <header>
                                <label>{el.title}</label>
                            </header>
                            <div id={styles.wrap_slider}>
                                <Slider ref={sliderRef} {...settings}>
                                    {photoUrl.length > 0 ? (
                                        photoUrl.map((el, index) => (
                                            <div className={styles.main__first__slide} key={index}>
                                                <img src={el || Camera} alt={`slide-${index}`} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className={styles.main__first__slide} key="default">
                                            <img src={Camera} alt="default-slide" />
                                        </div>
                                    )}
                                </Slider>
                                <button id={styles.mainslider__btn__left} onClick={() => {
                                    if (itemSlider > 0) {
                                        setItemSlider(--itemSlider);
                                    }
                                    handlePrevSlide();
                                }}>
                                </button>
                                <button id={styles.mainslider__btn__right} onClick={() => {
                                    if (itemSlider + 1 < photoUrl.length) {
                                        setItemSlider(++itemSlider);
                                    }
                                    handleNextSlide();
                                }}>
                                </button>
                            </div>
                            <div id={styles.view_card_wrap}>
                                <ul className={styles.view_description_wrap}>
                                    <li>
                                        {`${el.currency === "UAH" ? '₴' :
                                            el.currency === "EUR" ? '€' :
                                                '$'} ${el.price}`}
                                    </li>
                                    <li>{el.category}</li>
                                    <li>н.п. {address ? address.city : el.address}</li>
                                    <li>
                                        <button
                                            className={styles.view_btn_chat}
                                            onClick={() => {
                                                if (!token) {
                                                    dispatch(setToats());
                                                    navigate('/login');
                                                } else {
                                                    sessionStorage.setItem('part', 'inbox_messages');
                                                    navigate('/personal_area/chat');
                                                }
                                            }}
                                        >{person ? "Повідомлення" : "Зв’язатися"}
                                        </button>
                                    </li>
                                    <li id={styles.view_personal_data}>
                                        <ul>
                                            <li>
                                                <img src={Person} alt='logo' />
                                                <div id={styles.viev_salles}>
                                                    <label>{el.user.firstName}</label>
                                                    <div id={styles.view_sallesperon}>Продавець</div>
                                                </div>
                                            </li>
                                            <li>н.п. {address ? address.city : el.address}</li>
                                            <li>Був на сайті 10 хв назад</li>
                                            <li>{el.phone}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div id={styles.view_description}>{el.description}</div>
                            {admin === 'admin' ?
                                <div id={styles.view_edit_btns}>
                                    <button
                                        id={styles.edit__archive}
                                        onClick={() => {
                                            ArchiveAdverts(isIdCard, token, dispatch, showSuccessfulModal);
                                        }}
                                    >Архівувати
                                    </button>
                                    <button
                                        id={styles.edit__delete}
                                        onClick={() => {
                                            DeleteAdverts(isIdCard, dispatch, token, navigate);
                                        }}
                                    >Видалити
                                    </button>
                                    <button
                                        id={styles.edit__put}
                                        onClick={() => {
                                            dispatch(setEditWindow());
                                            navigate("/edit_card");
                                        }}
                                    >
                                        Редагувати
                                    </button>
                                </div>
                                : null}
                        </main>
                    );
                }
                return null;
            })}
            <div className={styles.view_recommend_wrap}>
                <MainRecommendations isCard />
            </div>
            <ToastContainer />
        </div >
    )
}

export default ViewBody;