import './MainLeftSide.scss';
import React, { useEffect, useState } from 'react';
import Car from '../../assets/mainLeftSide/car.png';
import Beauty from '../../assets/mainLeftSide/beauty.png';
import Coach from '../../assets/mainLeftSide/coach.png';
import Delivery from '../../assets/mainLeftSide/delivery.png';
import Dish from '../../assets/mainLeftSide/dish.png';
import Dog from '../../assets/mainLeftSide/dog.png';
import Flower from '../../assets/mainLeftSide/flower.png';
import Garden from '../../assets/mainLeftSide/garden.png';
import Job from '../../assets/mainLeftSide/job.png';
import Key from '../../assets/mainLeftSide/key.png';
import Rent from '../../assets/mainLeftSide/rent.png';
import Shirt from '../../assets/mainLeftSide/shirt.png';
import Techn from '../../assets/mainLeftSide/techn.png';
import Toy from '../../assets/mainLeftSide/toy.png';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/Main/actions';

const MainLeftSide = ({ isCategory }) => {

    const [isOnFormPage, setIsOnFormPage] = useState(false);

    useEffect(() => {
        setIsOnFormPage(window.location.pathname === '/add_card');
    }, [isCategory])

    const dispatch = useDispatch();

    const handleCategoryClick = (isCategoryRedux) => {
        dispatch(addCategory(isCategoryRedux));
    };

    const arr = [
        {
            img: Car,
            chapter: 'Авто',
        },
        {
            img: Shirt,
            chapter: 'Одяг',
        },
        {
            img: Flower,
            chapter: 'Квіти',
        },
        {
            img: Toy,
            chapter: 'Играшки',
        },
        {
            img: Dog,
            chapter: 'Тварини',
        },
        {
            img: Key,
            chapter: 'Житло',
        },
        {
            img: Coach,
            chapter: 'Меблі',
        },
        {
            img: Garden,
            chapter: 'Рослини',
        },
        {
            img: Dish,
            chapter: 'Посуд',
        },
        {
            img: Techn,
            chapter: 'Техніка',
        },
        {
            img: Job,
            chapter: 'Робота',
        },
        {
            img: Beauty,
            chapter: 'Краса',
        },
        {
            img: Rent,
            chapter: 'Оренда',
        },
        {
            img: Delivery,
            chapter: 'Доставка',
        },
    ]

    return (
        <div className={isOnFormPage ? 'add__categorys__wrap' : 'main__leftside__wrap'}>
            <div className={isOnFormPage ? 'add__categorys__card' : 'main__leftside__border'}>
                {arr.map((el, i) => {
                    return (
                        <ul key={i}>
                            {Object.keys(el).map((key, j) => (
                                <li key={j}>
                                    {key === 'chapter' ? <div className='main__leftside__text'>{el[key]}</div> :
                                        <button
                                            onClick={isCategory ? () => { handleCategoryClick(el.chapter) } : null}
                                            className='main__leftside__logo'
                                        >
                                            <img src={el[key]}
                                                alt='logo'
                                                className='left__side__img'
                                            />
                                        </button>}
                                </li>
                            ))}
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}

export default MainLeftSide;