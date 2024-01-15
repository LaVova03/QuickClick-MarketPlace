import './PersonalAreaBody.scss';
import React, { useState } from 'react';
import Plus from '../../assets/personal__area/Plus.png';
import Minus from '../../assets/personal__area/Minus.png';

const PersonalAreaBody = () => {

    const [isList, setIsList] = useState(
        {
            isOpen1: false,
            isOpen2: false,
            isOpen3: false,
            isOpen4: false,
        }
    )

    const changeList = (key) => {
        setIsList((prev) => ({
            ...prev,
            [`isOpen${key}`]: !prev[`isOpen${key}`]
        }));
        console.log(isList.isOpen1)
    };

    return (
        <div className='PersonalAreaBody__wrap'>
            <label>Оголошення</label>
            <ul>
                <li>
                    <label>Оголошення</label>
                    <button
                        className='personal__bnt__plus'
                        onClick={() => changeList('1')}>
                        <img src={!isList.isOpen1 ? Plus : Minus} alt="logo" />
                    </button>
                </li>
                <li>
                    <label>Повідомлення</label>
                    <button
                        className='personal__bnt__plus'
                        onClick={() => changeList('2')}>
                        <img src={!isList.isOpen2 ? Plus : Minus} alt="logo" />
                    </button>
                </li>
                <li>
                    <label>Оплати</label>
                    <button
                        className='personal__bnt__plus'
                        onClick={() => changeList('3')}>
                        <img src={!isList.isOpen3 ? Plus : Minus} alt="logo" />
                    </button>
                </li>
                <li>
                    <label>Доставка</label>
                    <button
                        className='personal__bnt__plus'
                        onClick={() => changeList('4')}>
                        <img src={!isList.isOpen4 ? Plus : Minus} alt="logo" />
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default PersonalAreaBody;