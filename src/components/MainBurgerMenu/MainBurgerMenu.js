import './MainBurgerMenu.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBurgerMenu } from '../../redux/Main/actions';

const MainBurgerMenu = ({ isFlagSet }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const closeBurger = () => {
        dispatch(setBurgerMenu())
    }

    const deleteToken = () => {
        sessionStorage.removeItem("isShowExit");
        const item = sessionStorage.getItem("isShowExit");
        if (!item) {
            navigate("/")
        }
    }

    return (
        <div className={!isFlagSet ? 'main__burgermenu__close' : 'main__burgermenu__wrap'}>
            <ul>
                <li><button onClick={() => closeBurger()}>
                    Про нас
                </button></li>
                <li><button onClick={() => closeBurger()}>
                    Контакти
                </button></li>
                <li><button onClick={() => closeBurger()}>
                    Оплата та доставка
                </button></li>
                <li><button onClick={() => closeBurger()}>
                    Питання та відповіді
                </button></li>
                <li><button onClick={() => closeBurger()}>
                    Умови використання
                </button></li>
                <li><button
                    onClick={() => {
                        navigate("/personal_area");
                        closeBurger();
                    }}>
                    Особистий кабінет</button></li>
                <li><button onClick={() => {
                    closeBurger();
                    deleteToken();
                }}>
                    Вийти
                </button></li>
            </ul>
        </div >
    )
}

export default MainBurgerMenu;