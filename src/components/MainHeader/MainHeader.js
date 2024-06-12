import 'react-toastify/dist/ReactToastify.css';
import './MainHeader.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage, setAddCard, setEditWindow } from '../../redux/Main/actions';
import MainBurgerMenu from '../../components/MainBurgerMenu/MainBurgerMenu';
import Logo from '../../assets/mainHeader/logo.png';
import FetchLogout from '../Fetches/LoginPage/FetchLogOut';

const MainHeader = () => {
    const isLanguage = useSelector(state => state.myReducer?.isLanguage);
    const isEditWindow = useSelector(state => state.myReducer?.isEditWindow);
    const isAllAdverts = useSelector(state => state.myReducer.isAllAdverts);

    const isUserName = localStorage.getItem('email');
    let isLocalLogin = sessionStorage.getItem('login');

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [login, setLogin] = useState(false);
    const [isBurger, setBurger] = useState(false);
    const [filteredAdverts, setFilteredAdverts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (isLocalLogin) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [isLocalLogin]);

    useEffect(() => {
        if (search && isAllAdverts.length > 0) {
            const lowerCaseQuery = search.toLowerCase();
            const filtered = isAllAdverts.filter(advert =>
                advert.title.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredAdverts(filtered);
        } else {
            setFilteredAdverts([]);
        }
    }, [search, isAllAdverts]);

    const handleButtonClick = () => {
        const locationBurger = location.pathname;
        sessionStorage.setItem('location', locationBurger);
        setBurger(prev => !prev);
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

    const logOut = () => {
        FetchLogout();
        setLogin(false);
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleClick = (e) => {
        setSearch(e);
        setTimeout(() => {
            setFilteredAdverts([])
        }, 0)
    }

    return (
        <div className='main__header__wrap'>
            <div className='main__header__position'>
                <div className='main__header__wrapleft'>
                    <button
                        onClick={handleButtonClick}
                        className={`burger-icon${isBurger ? 'active' : ''}`}>
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
                <div className={login ? 'main__headre__center__log' : 'main__headre__center'}>
                    <input
                        type="text"
                        name='search'
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <button id='main_header_btn'>
                        <span>Пошук <div></div></span>
                    </button>
                    {filteredAdverts.length > 0 &&
                        <ul className='main_header_list'>
                            {filteredAdverts.map((el, i) =>
                                <li key={i}>
                                    <button onClick={() => handleClick(el.title)}>
                                        {el.title}
                                    </button>
                                </li>
                            )}
                        </ul>
                    }
                </div>
                <div className='main__headre__right'>
                    <button id='main__header__heart'><div></div></button>
                    <button
                        id='main__header__user'
                        onClick={() => {
                            sessionStorage.removeItem('part');
                            !login ? handleNavigateLogin() : handleNavigatePersonalPlace()
                        }}>
                        <div></div>
                    </button>
                    {login &&
                        <div id='main__header__exit' className='visible'>
                            <span>{isUserName}</span>
                            <button onClick={logOut}></button>
                        </div>
                    }
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
                    }}>Додати оголошення</button>
                </div>
            </div>
            <MainBurgerMenu isBurger={isBurger} handleButtonClick={handleButtonClick}
                setLogin={setLogin} setBurger={setBurger} />
        </div >
    )
}

export default MainHeader;
