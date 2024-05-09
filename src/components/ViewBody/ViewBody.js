import './ViewBody.scss';
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Person from '../../assets/mainHeader/person.png';

const ViewBody = () => {

    const sliderRef = useRef(null);
    const navigate = useNavigate();
    const isData = useSelector(state => state.myReducer2.isData);
    const isImages = useSelector(state => state.myReducer2.isImages);

    const isIdCard = localStorage.getItem('setIdCard');
    const indexCard = localStorage.getItem('indexCard');

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

    // useEffect(() => {
    //   if(!isData && )
    // }, [isData])

    return (
        <div className='view_body_wrap'>
            <header>
                <button
                    id='view_btn_back'
                    onClick={() => navigate('/personal_area')}
                >
                </button>
            </header>

            {isData?.map(el => {
                if (el.id === +isIdCard) {
                    const jsonString = el.address;
                    const address = JSON.parse(jsonString);
                    return (
                        <main key={el.id}>
                            <header>
                                <label>{el.title}</label>
                            </header>
                            <div>
                                {/* <div>Loading...</div> */}
                                <Slider ref={sliderRef} {...settings}>
                                    {photoUrl.map((el, index) => {
                                        if (el) {
                                            return (
                                                <div className='main__first__slide' key={index}>
                                                    <img src={el} alt={`slide-${index}`} />
                                                </div>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })}
                                </Slider>
                                <button id='mainslider__btn__left' onClick={() => {
                                    if (itemSlider > 0) {
                                        setItemSlider(--itemSlider);
                                    }
                                    handlePrevSlide();
                                }}></button>
                                <button id='mainslider__btn__right' onClick={() => {
                                    if (itemSlider + 1 < photoUrl.length) {
                                        setItemSlider(++itemSlider);
                                    }
                                    handleNextSlide();
                                }}></button>
                            </div>
                            <div id='view_card_wrap'>
                                <ul className='view_description_wrap'>
                                    <li>
                                        {`${el.currency === "UAH" ? '₴' :
                                            el.currency === "EUR" ? '€' :
                                                '$'} ${el.price}`}
                                    </li>
                                    <li>{el.category}</li>
                                    <li>н.п. {address.city}</li>
                                    <li id='view_personal_data'>
                                        <ul>
                                            <li>
                                                <img src={Person} alt='logo' />
                                                <div id='viev_salles'>
                                                    <label>{el.user.firstName}</label>
                                                    <div id='view_sallesperon'>Продавець</div>
                                                </div>
                                            </li>
                                            <li>н.п. {address.city}</li>
                                            <li>Був на сайті 10 хв назад</li>
                                            <li>{el.phone}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div id='view_description'>{el.description}</div>
                        </main>
                    );
                }
                return null;
            })}
        </div >
    )
}

export default ViewBody;