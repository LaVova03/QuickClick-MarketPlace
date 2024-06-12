import './MainRightSide.scss';
import React, { useEffect, useState } from 'react';
import PromotionsAdverts from '../Fetches/Stunneds/PromotionsAdverts';
import GetIdImages from '../Fetches/Images/GetIdImages';
import Camera from '../../assets/main__сards/camera.jpg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainRightSide = () => {

    const navigate = useNavigate();

    const [promotion, setPromotion] = useState([]);
    const [isPhoto, setPhoto] = useState([]);
    const [allIdCard, setAllIdCard] = useState([]);

    const isAllAdverts = useSelector(state => state.myReducer.isAllAdverts);

    useEffect(() => {
        if (promotion.length === 0) {
            PromotionsAdverts({ setPromotion })
        }
        if (promotion.length > 0 && allIdCard.length > 0 && isPhoto.length === 0) {
            GetIdImages({ setPhoto, allIdCardRandom: allIdCard });
        }
        if (allIdCard.length === 0 && promotion.length > 0) {
            const ids = promotion.map(el => el.id);
            setAllIdCard(prevIds => [...prevIds, ...ids]);
        }
    }, [promotion, allIdCard, isPhoto]);

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

    // useEffect(() => {
    //     console.log(promotion)
    // }, [promotion])

    // const arr = [
    //     {
    //         img: Img1,
    //         chapter: 'Відкритий новий магазин',
    //     },
    //     {
    //         img: Img2,
    //         chapter: 'Зменшено ціну',
    //     },
    //     {
    //         img: Img3,
    //         chapter: 'Акції в магазині сантехніки “Акт”',
    //     },
    //     {
    //         img: Img4,
    //         chapter: 'Акції в магазині сантехніки “Малюк”',
    //     },
    //     {
    //         img: Img5,
    //         chapter: 'Відкритий новий магазин',
    //     },
    //     {
    //         img: Img6,
    //         chapter: 'Відкритий новий магазин',
    //     },
    //     {
    //         img: Img7,
    //         chapter: 'Зменшено ціну',
    //     },
    // ]

    return (
        <div className='main__rightside__wrap'>
            <div className='main__rigrtside__card'>
                {promotion?.map((el, i) => {
                    const photo = isPhoto.length > 0 && isPhoto[i][1] ? URL.createObjectURL(isPhoto[i][1]) : Camera;
                    return (
                        <ul key={i}>
                            <li >
                                <img src={photo} alt='logo' />
                                <span>
                                    {el.description}
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('whoIsIt');
                                            localStorage.setItem('whoIsIt', 'user');
                                            showCard(el.id);
                                        }}
                                    >Дивитися

                                    </button>
                                </span>
                            </li>
                        </ul>
                    )
                }
                )}
            </div>
        </div >
    )
}

export default MainRightSide;