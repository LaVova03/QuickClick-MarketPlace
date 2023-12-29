import './MainHeader.scss';
import React, { useState } from 'react';

const MainHeader = () => {

    const [isBurger, setIsBurger] = useState(false);

    const handleBurgerClick = () => {
        setIsBurger(prevState => !prevState);
    };

    return (
        <div className='main__header__wrap'>
            <div className='main__header__wrapleft'>
                <button onClick={handleBurgerClick} className={`burger-icon${isBurger ? 'active' : ''}`}>
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
                <button id='main__header__user'><div></div></button>
                <button>Додати оголошення</button>
            </div>
        </div>
    )
}

export default MainHeader;