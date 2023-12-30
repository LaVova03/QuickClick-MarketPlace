import './MainHeader.scss';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setBurgerMenu } from '../../redux/Main/actions';

const MainHeader = () => {

    const isFlagSet = useSelector(state => state.myReducer?.isFlagSet);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleButtonClick = () => {
        dispatch(setBurgerMenu());
    };

    const handleNavigate = () => navigate("/login");

    return (
        <div className='main__header__wrap'>
            <div className='main__header__wrapleft'>
                <button onClick={handleButtonClick} className={`burger-icon${isFlagSet ? 'active' : ''}`}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>
                <div className='main__headre__greentext'>
                    <span className='main__header__word'>Q</span>uick<span className='main__header__word'>C</span>lick<span className='main__header__word'>_</span>
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
                <button>Додати оголошення</button>
            </div>
        </div>
    )
}

export default MainHeader;