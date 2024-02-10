import './PersonalAreaBody.scss';
import React, { useState } from 'react';
import Plus from '../../assets/personal__area/Plus.png';
import Minus from '../../assets/personal__area/Minus.png';
import Msg from '../../assets/personal__area/msg.png';

const PersonalAreaBody = () => {

    const [isList, setIsList] = useState(
        {
            isOpen1: false,
            isOpen2: false,
            isOpen3: false,
            isOpen4: false,
        }
    );

    const [isPart, setPart] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
        nine: false,
        ten: false,
        eleven: false,
    })

    const changeList = (key) => {
        setIsList((prev) => ({
            ...prev,
            [`isOpen${key}`]: !prev[`isOpen${key}`]
        }));

        const containsTrue = Object.values(isList).every(value => value === false);
        if (containsTrue) {
            for (let key in isPart) {
                if (isPart[key] === true) {
                    setPart((prevState) => ({
                        ...prevState,
                        [key]: !prevState[key]
                    }))
                }
            }
        }
    };

    const setCategory = (num) => {
        for (let key in isPart) {
            if (isPart[key] === true) {
                setPart((prevState) => ({
                    ...prevState,
                    [key]: !prevState[key]
                }))
            }
        }
        setPart((prevState) => ({
            ...prevState,
            [num]: !prevState[num],
        }))
    }

    return (
        <div className='PersonalAreaBody__wrap'>
            <div>
                <label>Оголошення</label>
                <div>
                    <button>Створити</button>
                </div>
                <br />
            </div>
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
                        <li >
                            <button
                                onClick={() => setCategory('one')}
                                className={`personal__part${isPart.one ? '__green' : ''}`}>Активні
                            </button>
                        </li>
                        <li >
                            <button
                                onClick={() => setCategory('two')}
                                className={`personal__part${isPart.two ? '__green' : ''}`}>Очікують публікації
                            </button>
                        </li>
                        <li >
                            <button
                                onClick={() => setCategory('three')}
                                className={`personal__part${isPart.three ? '__green' : ''}`}>Відхилені
                            </button>
                        </li>
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
                        <li >
                            <button
                                onClick={() => setCategory('four')}
                                className={`personal__part${isPart.four ? '__green' : ''}`}>Вхідні
                            </button>
                        </li>
                        <li  >
                            <button
                                onClick={() => setCategory('five')}
                                className={`personal__part${isPart.five ? '__green' : ''}`}>Вихідні
                            </button>
                        </li>
                        <li >
                            <button
                                onClick={() => setCategory('six')}
                                className={`personal__part${isPart.six ? '__green' : ''}`}>Архів
                            </button>
                        </li>
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
                        <li >
                            <button
                                onClick={() => setCategory('seven')}
                                className={`personal__part${isPart.seven ? '__green' : ''}`}>Отримані платежі
                            </button>
                        </li>
                        <li >
                            <button
                                onClick={() => setCategory('eight')}
                                className={`personal__part${isPart.eight ? '__green' : ''}`}>Вихідні платежі
                            </button>
                        </li>
                        <li >
                            <button
                                onClick={() => setCategory('nine')}
                                className={`personal__part${isPart.nine ? '__green' : ''}`}>Повернення
                            </button>
                        </li>
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
                        <li >
                            <button
                                onClick={() => setCategory('ten')}
                                className={`personal__part${isPart.ten ? '__green' : ''}`}>Відслідкувати
                            </button>
                        </li>
                        <li >
                            <button
                                onClick={() => setCategory('eleven')}
                                className={`personal__part${isPart.eleven ? '__green' : ''}`}>Архів
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className='personal__center__img'>
                <img src={Msg} alt="logo" />
            </div>
        </div>
    )
}

export default PersonalAreaBody;