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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/Main/actions';

const MainLeftSide = ({ isCategory, setInputCategory }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isOnFormPage, setIsOnFormPage] = useState(false);
    const [isOnInfiPage, setIsOninfoPage] = useState(false);
    const [isOnMainPage, setIsOnMainPage] = useState(false);

    useEffect(() => {
        setIsOnFormPage(window.location.pathname === '/add_card' || window.location.pathname === '/edit_card');
        setIsOninfoPage(window.location.pathname === '/info');
        setIsOnMainPage(window.location.pathname === '/');
    }, [isCategory])

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
            chapter: 'Іграшки',
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
    ];

    const categoryMap = {
        'Авто': 'AUTO',
        'Одяг': 'CLOTHES',
        'Квіти': 'FLOWERS',
        'Іграшки': 'TOYS',
        'Тварини': 'ANIMALS',
        'Житло': 'DWELLING',
        'Меблі': 'FURNITURE',
        'Рослини': 'PLANTS',
        'Посуд': 'DISHES',
        'Техніка': 'MACHINERY',
        'Робота': 'WORK',
        'Краса': 'BEAUTY',
        'Оренда': 'RENT',
        'Доставка': 'DELIVERY',
    };

    const checkCategory = (item) => {
        sessionStorage.setItem('ruCategory', item);
        Object.keys(categoryMap).filter((el) => {
            if (el === item) {
                const latinCategory = categoryMap[el];
                handleCategoryClick(latinCategory);
            }
            return false;
        });
    }

    const handleCategoryClick = (latinCategory) => {
        sessionStorage.setItem('category_page', latinCategory);
        if (!isCategory) {
            navigate('/show_category');
        } else {
            dispatch(addCategory(latinCategory))
        }
    };

    return (
        <div className={isOnFormPage ? 'add__categorys__wrap' : isOnInfiPage ? 'add__cat_info__wrap'
            : isOnMainPage ? 'main__leftside__wrap' : null}>
            <div className={isOnFormPage ? 'add__categorys__card' : isOnInfiPage ? 'add__cat_info__card'
                : 'main__leftside__border'}>
                {arr.map((el, i) => {
                    return (
                        <ul key={i}>
                            {Object.keys(el).map((key, j) => (
                                <li key={j}>
                                    {key === 'chapter' ? <div className='main__leftside__text'>{el[key]}</div>
                                        : <button
                                            onClick={isCategory ? () => {
                                                checkCategory(el.chapter);
                                                setInputCategory(el.chapter);
                                            }
                                                : () => {
                                                    checkCategory(el.chapter);
                                                }}
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