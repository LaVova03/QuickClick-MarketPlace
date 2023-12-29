import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MainSlider.scss';
import FirstSlide from '../../assets/mainSlider/Rectangle1.png';
import SecondSlide from '../../assets/mainSlider/Rectangle2.png';
import ThirdSlide from '../../assets/mainSlider/Rectangle3.png';
import MainStock from '../MainStock/MainStock';
import MainRecommendations from '../MainRecommendations/MainRecommendations';
import MainViewed from '../../components/MainViewed/MainViewed';

const MainSlider = () => {
    const sliderRef = useRef(null);

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

    return (
        <div className="main__slider__wrap">
            <div className='main__wrap__slider'>
                <Slider ref={sliderRef} {...settings}>
                    <div className='main__first__slide'>
                        <img src={FirstSlide} alt="slide 1" />
                        <div className='mainslider__div__onslider'>
                            <span>Щастя для малечі</span><br />
                            <button>Дивитися умови</button>
                        </div>
                    </div>
                    <div className='main__second__slide'>
                        <img src={SecondSlide} alt="slide 2" />
                        <div className='mainslider__div__onslider'>
                            <span>Виграйте машину на<br />новорічні свята</span><br />
                            <button>Дивитися умови</button>
                        </div>
                    </div>
                    <div className='main__third__slide'>
                        <img src={ThirdSlide} alt="slide 3" />
                        <div className='mainslider__div__onslider'>
                            <span>Придбайте новорічні<br />товари за приємними<br />знижками</span><br />
                            <button>Купити</button>
                        </div>
                    </div>
                </Slider>
                <button id='mainslider__btn__left' onClick={handlePrevSlide}></button>
                <button id='mainslider__btn__right' onClick={handleNextSlide}></button>
            </div>
            <MainStock />
            <MainRecommendations />
            <MainViewed />
        </div>
    );
};

export default MainSlider;

