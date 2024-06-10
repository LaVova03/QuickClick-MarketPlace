import './MainBurgerMenu.scss';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FetchLogout from '../Fetches/LoginPage/FetchLogOut';
import { useDispatch } from 'react-redux';
import { setAddCard } from '../../redux/Main/actions';

const MainBurgerMenu = ({ isBurger, handleButtonClick, setLogin, setBurger }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const login = sessionStorage.getItem('login');
    const locationStorage = sessionStorage.getItem('location');

    const deleteToken = () => {
        FetchLogout();
        navigate("/");
        setLogin(false);
    };

    useEffect(() => {
        const locationBurger = location.pathname;
        if (locationStorage !== locationBurger && isBurger) {
            sessionStorage.removeItem('location');
            setBurger();
        }
    }, [isBurger, location.pathname, locationStorage, setBurger]);

    return (
        <div className={!isBurger ? 'main__burgermenu__close' : 'main__burgermenu__wrap'}>
            <ul>
                <li><button onClick={handleButtonClick}>
                    Про нас
                </button></li>
                <li><button onClick={handleButtonClick}>
                    Контакти
                </button></li>
                <li><button onClick={handleButtonClick}>
                    Оплата та доставка
                </button></li>
                <li><button onClick={handleButtonClick}>
                    Питання та відповіді
                </button></li>
                <li><button onClick={handleButtonClick}>
                    Умови використання
                </button></li>
                <li><button onClick={() => {
                    if (login) {
                        sessionStorage.removeItem('part');
                        navigate("/personal_area");
                    } else {
                        dispatch(setAddCard());
                        sessionStorage.setItem('personal', 'true');
                        navigate("/login");
                    }
                    handleButtonClick();
                }}>
                    Особистий кабінет
                </button></li>
                <li><button onClick={() => {
                    handleButtonClick();
                    deleteToken();
                }}>
                    Вийти
                </button></li>
            </ul>
        </div >
    )
}

export default MainBurgerMenu;
