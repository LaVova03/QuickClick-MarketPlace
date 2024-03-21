import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './AddCardBody.scss';
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Categorys from '../MainLeftSide/MainLeftSide';
import { useSelector, useDispatch } from 'react-redux';
import PlacingAnOrder from '../PlacingAnOrder/PlacingAnOrder';
import AddCard from '../Fetches/CreateCardsPage/CraateCard';
import Vector from '../../assets/add__card/Vector.png';
import { useNavigate } from 'react-router-dom';
import { setEditWindow } from '../../redux/Main/actions';

const AddCardBody = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const fileInputRefs = {
        one: useRef(null),
        two: useRef(null),
        three: useRef(null),
        four: useRef(null),
        five: useRef(null),
        six: useRef(null),
        seven: useRef(null),
        eight: useRef(null),
    };

    const [isCategory, setIsCategory] = useState(false);
    const [isAddress, setIsAddress] = useState(false);
    const [isPhoto, setPhoto] = useState([]);
    const [responsOk, setResponseOk] = useState(false);
    const [isNewCard, setNewCard] = useState(
        {
            title: '',
            category: '',
            description: '',
            address: {
                region: '',
                city: '',
            },
            phone: '',
            price: '',
            currency: '',
        }
    );

    const [productNameEmpty, setProductNameEmpty] = useState(
        {
            title: null,
            category: null,
            description: null,
            address: null,
            phone: null,
            price: null,
            currency: null,
        }
    );

    const [photoEmpty, setPhotoEmpty] = useState(null);

    const [isOptions, setOptions] = useState(false);
    const [isInputCategory, setInputCategory] = useState('');

    const isCategoryRedux = useSelector(state => state.myReducer?.isCategoryRedux);
    const isEditWindow = useSelector(state => state.myReducer?.isEditWindow);

    useEffect(() => {
        setNewCard((prevState) => ({
            ...prevState,
            category: isCategoryRedux,
        }));
        setIsCategory(false);
    }, [isCategoryRedux]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.add__input__category')) {
                setIsCategory(false);
            }
            if (!event.target.closest('.add__input__adress')) {
                if (!event.target.closest('.add__address')) {
                    setIsAddress(false);
                }
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (location.pathname !== '/edit_card' && isEditWindow) {
            dispatch(setEditWindow());
        }

        if (responsOk) {
            notifyError('Оголошення створено.')
            setTimeout(() => {
                setResponseOk(false)
            }, 2000)
        }
    }, [location, dispatch, isEditWindow, responsOk]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto([...isPhoto, file]);
    };

    const handleButtonClick = (fileInputRef) => {
        fileInputRef.current.click();
    };

    const showCategorys = () => {
        setIsCategory(true);
    };

    const showAdress = () => {
        setIsAddress(true)
    }

    const resetCard = () => {
        setNewCard({
            title: '',
            category: '',
            description: '',
            address: {
                region: '',
                city: '',
            },
            phone: '',
            price: '',
            currency: '',
        });
        setInputCategory('');
        setPhoto([]);
    };

    const submitCard = () => {
        let address = false;
        for (let key in isNewCard) {
            if (isNewCard[key].length === 0) {
                setProductNameEmpty((prevState) => ({
                    ...prevState,
                    [key]: true,
                }))
            } else {
                setProductNameEmpty((prevState) => ({
                    ...prevState,
                    [key]: false,
                }))
            }
        }

        if (isPhoto.length === 0) {
            setPhotoEmpty(true)
        } else {
            setPhotoEmpty(false)
        }

        for (let key in isNewCard.address) {
            if (isNewCard.address[key].length === 0) {
                address = true;
            }
        }

        if (address) {
            setProductNameEmpty((prevState) => ({
                ...prevState,
                address: true,
            }))
        } else {
            setProductNameEmpty((prevState) => ({
                ...prevState,
                address: false,
            }))
        }
        setTimeout(() => {
            const allFieldsEmpty = Object.values(productNameEmpty).every(value => value === false);
            if (allFieldsEmpty && photoEmpty === false) {
                AddCard(isNewCard, isPhoto, setResponseOk);
                resetCard();
                if (isEditWindow) {
                    dispatch(setEditWindow());
                    navigate("/personal_area")
                }
            }
        }, 0)
    };

    const deletePhoto = (index) => {
        const updatedPhotos = [...isPhoto];
        updatedPhotos.splice(index, 1);
        setPhoto(updatedPhotos);
    };

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
        });
    };

    return (
        <div className='AddCardBody__wrap'>
            <div className='add__left__side'>
                <div >{isEditWindow ? "Редагувати оголошення" : "Створити оголошення"}</div>
                <label >Заповніть основні дані про товар*</label><br />
                <input
                    className={`add__input__name${productNameEmpty.title ? '__empty' : ''}`}
                    type="text"
                    name="title"
                    placeholder='Назва товару'
                    value={isNewCard.title || ''}
                    onChange={(e) => {
                        setProductNameEmpty((prevState) => ({ ...prevState, title: false }))
                        setNewCard({ ...isNewCard, title: e.target.value });
                    }}
                />
                <br />
                <input
                    className={`add__input__category${productNameEmpty.category ? '__empty' : ''}`}
                    type="text"
                    name="category"
                    placeholder='Оберіть категорію'
                    value={isInputCategory || ''}
                    onClick={() => {
                        showCategorys()
                        setProductNameEmpty((prevState) => ({ ...prevState, category: false }))
                    }}
                    onChange={() => {
                        setProductNameEmpty((prevState) => ({ ...prevState, category: false }))
                    }}
                />
                <br />
                <textarea
                    className={`add__textarea__description${productNameEmpty.description ? '__empty' : ''}`}
                    cols="50"
                    rows="8"
                    placeholder='Додайте опис'
                    name="description"
                    value={isNewCard.description || ''}
                    onChange={(e) => {
                        setProductNameEmpty((prevState) => ({ ...prevState, description: false }))
                        setNewCard({ ...isNewCard, description: e.target.value });
                    }}
                />
            </div>
            <div className='add__center__side'>
                <label >Додати фото*</label><br />
                <div className={isCategory ? 'add__categorys' : 'add__categorys__none'}>
                    <Categorys isCategory={isCategory} setInputCategory={setInputCategory} />
                </div>
                <div className={isAddress ? 'add__address' : 'add__address__none'}>
                    <PlacingAnOrder setIsAddress={setIsAddress} isNewCard={isNewCard} setNewCard={setNewCard} />
                </div>
                <ul>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        <div>
                            {isPhoto[0] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isPhoto[0])} alt="logo" />
                                        <button
                                            className='add__trash'
                                            onClick={() => deletePhoto(0)}
                                        />
                                    </div>
                                </> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.one}
                                        onChange={(e) => handleFileChange(e, 0)}
                                    />
                                    <button onClick={() => {
                                        setPhotoEmpty(false);
                                        handleButtonClick(fileInputRefs.one)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        <div>
                            {isPhoto[1] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isPhoto[1])} alt="logo" />
                                        <button
                                            className='add__trash'
                                            onClick={() => deletePhoto(1)}
                                        />
                                    </div>
                                </> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.two}
                                        onChange={(e) => handleFileChange(e, 1)}
                                    />
                                    <button onClick={() => {
                                        setPhotoEmpty(false);
                                        handleButtonClick(fileInputRefs.two)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        <div>
                            {isPhoto[2] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isPhoto[2])} alt="logo" />
                                        <button
                                            className='add__trash'
                                            onClick={() => deletePhoto(2)}
                                        />
                                    </div>
                                </> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.three}
                                        onChange={(e) => handleFileChange(e, 2)}
                                    />
                                    <button onClick={() => {
                                        setPhotoEmpty(false);
                                        handleButtonClick(fileInputRefs.three)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        <div>
                            {isPhoto[3] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isPhoto[3])} alt="logo" />
                                        <button
                                            className='add__trash'
                                            onClick={() => deletePhoto(3)}
                                        />
                                    </div>
                                </> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.four}
                                        onChange={(e) => handleFileChange(e, 3)}
                                    />
                                    <button onClick={() => {
                                        setPhotoEmpty(false);
                                        handleButtonClick(fileInputRefs.four)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        <div>
                            {isPhoto[4] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isPhoto[4])} alt="logo" />
                                        <button
                                            className='add__trash'
                                            onClick={() => deletePhoto(4)}
                                        />
                                    </div>
                                </> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.five}
                                        onChange={(e) => handleFileChange(e, 4)}
                                    />
                                    <button onClick={() => {
                                        setPhotoEmpty(false);
                                        handleButtonClick(fileInputRefs.five)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        <div>
                            {isPhoto[5] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isPhoto[5])} alt="logo" />
                                        <button
                                            className='add__trash'
                                            onClick={() => deletePhoto(5)}
                                        />
                                    </div>
                                </> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.six}
                                        onChange={(e) => handleFileChange(e, 5)}
                                    />
                                    <button onClick={() => {
                                        setPhotoEmpty(false);
                                        handleButtonClick(fileInputRefs.six)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        <div>
                            {isPhoto[6] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isPhoto[6])} alt="logo" />
                                        <button
                                            className='add__trash'
                                            onClick={() => deletePhoto(6)}
                                        />
                                    </div>
                                </> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.seven}
                                        onChange={(e) => handleFileChange(e, 6)}
                                    />
                                    <button onClick={() => {
                                        setPhotoEmpty(false);
                                        handleButtonClick(fileInputRefs.seven)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        <div>
                            {isPhoto[7] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isPhoto[7])} alt="logo" />
                                        <button
                                            className='add__trash'
                                            onClick={() => deletePhoto(7)}
                                        />
                                    </div>
                                </> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.eight}
                                        onChange={(e) => handleFileChange(e, 7)}
                                    />
                                    <button onClick={() => {
                                        setPhotoEmpty(false);
                                        handleButtonClick(fileInputRefs.eight)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                </ul>
            </div>
            <div className='add__right__side'>
                <label >Місцезнаходження товару*</label><br />
                <input
                    className={`add__input__adress${productNameEmpty.address ? '__empty' : ''}`}
                    type="text"
                    name="address"
                    placeholder='Адреса відправки'
                    value={`${isNewCard.address.region}${isNewCard.address.city}` || ''}
                    onClick={() => {
                        showAdress()
                        setProductNameEmpty((prevState) => ({ ...prevState, address: false }))
                    }}
                    onChange={() => {
                        setProductNameEmpty((prevState) => ({ ...prevState, address: false }))
                    }}
                />
                <br />
                <label >Ваші контактні дані*</label><br />
                <input
                    className={`add__input__phone${productNameEmpty.phone ? '__empty' : ''}`}
                    type="text"
                    name="phone"
                    placeholder='Ваш номер телефону'
                    value={isNewCard.phone || ''}
                    onChange={(e) => {
                        setProductNameEmpty((prevState) => ({ ...prevState, phone: false }))
                        setNewCard({ ...isNewCard, phone: e.target.value });
                    }}
                />
                <br />
                <label >Ціна товару*</label><br />
                <input
                    className={`add__input__price${productNameEmpty.price ? '__empty' : ''}`}
                    type="text"
                    name="price"
                    placeholder='Ціна'
                    value={isNewCard.price || ''}
                    onChange={(e) => {
                        setProductNameEmpty((prevState) => ({ ...prevState, price: false }))
                        setNewCard({ ...isNewCard, price: e.target.value });
                    }}
                />
                <button
                    className={isNewCard.currency ? 'add__select__option'
                        : productNameEmpty.currency ? "add__select__empty" : 'add__select'}
                    onClick={() => {
                        setOptions((prev) => !prev);
                        setProductNameEmpty((prev) => ({
                            ...prev,
                            currency: null,
                        }))
                    }}
                >{isNewCard.currency === "UAH" ? 'грн'
                    : isNewCard.currency === "USD" ? 'usd'
                        : isNewCard.currency === "EUR" ? 'eur'
                            : 'Валюта*'}
                    <div><img id={isOptions ? "add_vector_down" : null} alt='logo' src={Vector} /></div>
                </button>
                {isOptions ?
                    <div className='add__options__wrap'>
                        <button
                            className='add__select'
                            onClick={() => {
                                setOptions(false);
                                setProductNameEmpty((prevState) => ({ ...prevState, currency: false }))
                                setNewCard((prevState) => ({
                                    ...prevState,
                                    currency: "UAH",
                                }))
                            }}
                        >грн
                        </button>
                        <button
                            className='add__select'
                            onClick={() => {
                                setOptions(false);
                                setProductNameEmpty((prevState) => ({ ...prevState, currency: false }))
                                setNewCard((prevState) => ({
                                    ...prevState,
                                    currency: "USD",
                                }))
                            }}
                        >usd
                        </button>
                        <button
                            className='add__select'
                            onClick={() => {
                                setOptions(false);
                                setProductNameEmpty((prevState) => ({ ...prevState, currency: false }))
                                setNewCard((prevState) => ({
                                    ...prevState,
                                    currency: "EUR",
                                }))
                            }}
                        >eur
                        </button>
                    </div> : null
                }
                <button id={isOptions ? 'add_submit_none' : 'add_submit'} onClick={submitCard}>Опублікувати</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddCardBody;