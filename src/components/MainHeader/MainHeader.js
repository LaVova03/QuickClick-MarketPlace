import 'react-toastify/dist/ReactToastify.css';
import './MainHeader.scss';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setBurgerMenu, setLanguage, setAddCard } from '../../redux/Main/actions';
import MainBurgerMenu from '../../components/MainBurgerMenu/MainBurgerMenu';
import Logo from '../../assets/mainHeader/logo.png';

const MainHeader = () => {

    const isFlagSet = useSelector(state => state.myReducer?.isFlagSet);
    const isLanguage = useSelector(state => state.myReducer?.isLanguage);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleButtonClick = () => {
        dispatch(setBurgerMenu());
    };

    const changeLanguage = () => {
        dispatch(setLanguage());
    };

    const handleNavigate = () => navigate("/login");

    const searchToken = () => {
        if (sessionStorage.getItem('token')) {
            navigate("/add_card");
        } else {
            dispatch(setAddCard());
            navigate("/login");
        }
    }

    return (
        <div className='main__header__wrap'>
            <div className='main__header__position'>
                <div className='main__header__wrapleft'>
                    <button onClick={handleButtonClick} className={`burger-icon${isFlagSet ? 'active' : ''}`}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </button>
                    <div className='main__headre__greentext'>
                        <img src={Logo} alt="logo" />
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
                    <button id='main__header__user' onClick={handleNavigate}><div></div></button>
                    <div className='main__wrap__lang'>
                        <button
                            onClick={changeLanguage}
                            className={isLanguage ? 'main__lang__uk' : 'main__lang__eng'}
                        >
                        </button>
                        <label>{isLanguage ? 'UK' : 'ENG'}</label>
                    </div>
                    <button onClick={searchToken}>Додати оголошення</button>
                </div>
            </div>
            < MainBurgerMenu isFlagSet={isFlagSet} />
        </div >
    )
}

export default MainHeader;