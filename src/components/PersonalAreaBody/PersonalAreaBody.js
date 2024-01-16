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
    };

    return (
        <div className='PersonalAreaBody__wrap'>
            <label>Оголошення</label>
            <ul className='personal__main__ul'>
                <li>
                    <label className={!isList.isOpen1 ? 'personal__color__black' : 'personal__color__green'}>Оголошення
                        <button
                            className='personal__bnt__plus'
                            onClick={() => changeList('1')}>
                            <img src={!isList.isOpen1 ? Plus : Minus} alt="logo" />
                        </button>
                    </label>
                    <ul className={!isList.isOpen1 ? 'personal__colum__none' : 'personal__colum__block'}>
                        <li><button>Активні</button></li>
                        <li><button>Очікують публікації</button></li>
                        <li><button>Відхилені</button></li>
                    </ul>
                </li>
                <li>
                    <label className={!isList.isOpen2 ? 'personal__color__black' : 'personal__color__green'}>Повідомлення
                        <button
                            className='personal__bnt__plus'
                            onClick={() => changeList('2')}>
                            <img src={!isList.isOpen2 ? Plus : Minus} alt="logo" />
                        </button>
                    </label>
                    <ul className={!isList.isOpen2 ? 'personal__colum__none' : 'personal__colum__block'}>
                        <li><button>Вхідні</button></li>
                        <li><button>Вихідні</button></li>
                        <li><button>Архів</button></li>
                    </ul>
                </li>
                <li>
                    <label className={!isList.isOpen3 ? 'personal__color__black' : 'personal__color__green'}>Оплати
                        <button
                            className='personal__bnt__plus'
                            onClick={() => changeList('3')}>
                            <img src={!isList.isOpen3 ? Plus : Minus} alt="logo" />
                        </button>
                    </label>
                    <ul className={!isList.isOpen3 ? 'personal__colum__none' : 'personal__colum__block'}>
                        <li><button>Отримані платежі</button></li>
                        <li><button>Вихідні платежі</button></li>
                        <li><button>Повернення</button></li>
                    </ul>
                </li>
                <li>
                    <label className={!isList.isOpen4 ? 'personal__color__black' : 'personal__color__green'}>Доставка
                        <button
                            className='personal__bnt__plus'
                            onClick={() => changeList('4')}>
                            <img src={!isList.isOpen4 ? Plus : Minus} alt="logo" />
                        </button>
                    </label>
                    <ul className={!isList.isOpen4 ? 'personal__colum__none' : 'personal__colum__block'}>
                        <li><button>Відслідкувати</button></li>
                        <li><button>Архів</button></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default PersonalAreaBody;