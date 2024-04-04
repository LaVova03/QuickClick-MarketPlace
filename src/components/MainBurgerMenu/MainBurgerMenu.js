import './MainBurgerMenu.scss';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MainBurgerMenu = ({ isFlagSet, handleButtonClick, isBurger, setBurger, closeBurger }) => {

    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    // const closeBurger = useCallback(() => {
    //     dispatch(setBurgerMenu());
    // }, [dispatch]);

    useEffect(() => {
        // Функция-обработчик клика за пределами блока
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                handleButtonClick(); // Вызываем функцию закрытия окна
            }
        };

        // Добавляем обработчик клика при монтировании компонента
        document.addEventListener("mousedown", handleClickOutside);

        // Убираем обработчик клика при размонтировании компонента
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleButtonClick]);

    const deleteToken = () => {
        sessionStorage.removeItem("isShowExit");
        const item = sessionStorage.getItem("isShowExit");
        if (!item) {
            navigate("/")
        }
    }

    return (
        <div className={!isFlagSet ? 'main__burgermenu__close' : 'main__burgermenu__wrap'} ref={wrapperRef}>
            <ul>
                <li><button onClick={() => handleButtonClick()}>
                    Про нас
                </button></li>
                <li><button onClick={() => handleButtonClick()}>
                    Контакти
                </button></li>
                <li><button onClick={() => handleButtonClick()}>
                    Оплата та доставка
                </button></li>
                <li><button onClick={() => handleButtonClick()}>
                    Питання та відповіді
                </button></li>
                <li><button onClick={() => handleButtonClick()}>
                    Умови використання
                </button></li>
                <li><button
                    onClick={() => {
                        navigate("/personal_area");
                        handleButtonClick();
                    }}>
                    Особистий кабінет</button></li>
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