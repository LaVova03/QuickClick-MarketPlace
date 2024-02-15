import './PersonalAreaBody.scss';
import React, { useState, useEffect } from 'react';
import Plus from '../../assets/personal__area/Plus.png';
import Minus from '../../assets/personal__area/Minus.png';
import Msg from '../../assets/personal__area/msg.png';
import axios from "axios";
import { API_MOCAPI } from '../../constants/Constants';

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
    });

    const [isData, setData] = useState([]);
    const [isKeyPart, setKeyPart] = useState('');
    const [isIdCard, setIdCard] = useState('');
    const [isPutModal, setPutModal] = useState(false);
    const [isPutData, setPutData] = useState(null);
    const [isLoading, setLoading] = useState({
        active: false,
        putModal: false,
    });

    useEffect(() => {
        fetchGetIdGoods(isIdCard)
    }, [isIdCard, isData.length]);

    const fetchGetGoods = async () => {
        try {
            setLoading((prev) => ({
                ...prev,
                active: !prev,
            }));
            const { data } = await axios.get(`${API_MOCAPI}/Goods`);
            if (data.length === 0) {
                setData(null);
            } else {
                setData(data);
            }
        }
        catch {
            console.log('fetch data GET cards error')
        }
        finally {
            setLoading((prev) => ({
                ...prev,
                active: !prev,
            }));
        }
    };

    const fetchGetIdGoods = async (id) => {
        try {
            setLoading((prev) => ({
                ...prev,
                putModal: !prev,
            }));
            const { data } = await axios.get(`${API_MOCAPI}/Goods/${id}`);
            setPutData(data)
        }
        catch {
            console.log('fetch data GET cards error')
        }
        finally {
            setLoading((prev) => ({
                ...prev,
                putModal: !prev,
            }));
        }
    };

    const fetchPutGoods = async (id) => {
        try {
            await axios.put(`${API_MOCAPI}/Goods/${id}`, isPutData);
            await fetchGetGoods();
        }
        catch {
            console.log('fetch data PUT cards error')
        }
    };

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
    };

    const lookingCard = () => {
        for (let key in isPart) {
            if (isPart[key]) {
                setKeyPart(key)
                return true;
            } else {
                return null;
            }
        }
    };

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
                                onClick={() => {
                                    setCategory('one');
                                    fetchGetGoods();
                                }}
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
                {lookingCard ?
                    <>
                        {isData.map((el) => {
                            return (
                                <ul key={el.id} >
                                    <li><img src={el.imageSrc} alt="logo" /></li>
                                    <li>{el.Description}</li>
                                    <li>{el.Price}</li>
                                    <li><button>Переглянути</button></li>
                                    <li><button onClick={() => {
                                        setIdCard(el.id);
                                        setPutModal(true);
                                    }}>
                                        Редагувати</button></li>
                                </ul>
                            )
                        })}
                    </>
                    : <img src={Msg} alt="logo" />}
            </div>
            {isPutModal &&
                <>
                    {isPutModal &&
                        <div className='persinal__put__modal'>
                            {isLoading ? (
                                <div id='personal__loading'>Loading...</div>
                            ) :
                                <>
                                    <button
                                        id='personal__x__btn'
                                        onClick={() => setPutModal(false)}
                                    ></button>
                                    <ul>
                                        {isPutData && typeof isPutData === 'object' && Object.keys(isPutData).map(key => (
                                            (key !== 'id' && key !== 'ProductId' && key !== 'Category') &&
                                            <li key={key}>
                                                <strong>{String(key)}: </strong>
                                                <div>"{String(isPutData[key])}"</div>
                                                <input
                                                    type="text"
                                                    placeholder={key}
                                                    onChange={(e) => {
                                                        setPutData((prevState) => ({
                                                            ...prevState,
                                                            [key]: e.target.value,
                                                        }))
                                                    }}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                    <button onClick={() => {
                                        fetchPutGoods(isIdCard);
                                        setPutModal(false);
                                    }}>Редагувати</button>
                                </>}
                        </div>
                    }
                </>
            }

        </div >
    )
}

export default PersonalAreaBody;