import 'react-toastify/dist/ReactToastify.css';
import './MainHeader.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setBurgerMenu, setLanguage, setAddCard, setEditWindow } from '../../redux/Main/actions';
import MainBurgerMenu from '../../components/MainBurgerMenu/MainBurgerMenu';
import Logo from '../../assets/mainHeader/logo.png';

const MainHeader = () => {
    const isFlagSet = useSelector(state => state.myReducer?.isFlagSet);
    const isLanguage = useSelector(state => state.myReducer?.isLanguage);
    const isEditWindow = useSelector(state => state.myReducer?.isEditWindow);
    let isLocalLogin = sessionStorage.getItem('login');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [login, setLogin] = useState(false);

    useEffect(() => {
        if (isLocalLogin) {
            setLogin(true)
        }
    }, [isLocalLogin]);

    const handleButtonClick = () => {
        dispatch(setBurgerMenu());
    };

    const changeLanguage = () => {
        dispatch(setLanguage());
    };

    const handleNavigateLogin = () => navigate("/login");
    const handleNavigatePersonalPlace = () => navigate("/personal_area");

    const searchToken = () => {
        if (login) {
            navigate("/add_card");
        } else {
            dispatch(setAddCard());
            dispatch(setEditWindow());
            navigate("/login");
        }
    }

    const setMainPage = () => {
        navigate("/");
    }

    return (
        <div className='main__header__wrap'>
            <div className='main__header__position'>
                <div className='main__header__wrapleft'>
                    <button
                        onClick={() => {
                            handleButtonClick();
                        }}
                        className={`burger-icon${isFlagSet ? 'active' : ''}`}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </button>
                    <div className='main__headre__greentext'>
                        <button onClick={setMainPage}>
                            <img src={Logo} alt="logo" />
                        </button>
                    </div>
                </div>
                <div className='main__headre__center'>
                    <input type="text" />
                    <button >
                        <span>Пошук <div></div></span>
                    </button>
                </div>
                <div className='main__headre__right'>
                    <button id='main__header__heart'><div></div></button>
                    <button
                        id={login ? 'main__header__person' : 'main__header__user'}
                        onClick={!login ? handleNavigateLogin : handleNavigatePersonalPlace}>
                        <div></div>
                    </button>
                    <div className='main__wrap__lang'>
                        <button
                            onClick={changeLanguage}
                            className={isLanguage ? 'main__lang__uk' : 'main__lang__eng'}
                        >
                        </button>
                        <label>{isLanguage ? 'UK' : 'ENG'}</label>
                    </div>
                    <button onClick={() => {
                        searchToken();
                        if (isEditWindow) {
                            dispatch(setEditWindow());
                        }
                    }
                    }>Додати оголошення</button>
                </div>
            </div>
            < MainBurgerMenu isFlagSet={isFlagSet} handleButtonClick={handleButtonClick} setLogin={setLogin} />
        </div >
    )
}

export default MainHeader;