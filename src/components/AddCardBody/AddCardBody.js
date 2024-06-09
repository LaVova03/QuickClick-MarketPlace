import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './AddCardBody.scss';
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Categorys from '../MainLeftSide/MainLeftSide';
import { useSelector, useDispatch } from 'react-redux';
import PlacingAnOrder from '../PlacingAnOrder/PlacingAnOrder';
import AddCard from '../Fetches/CreateCardsPage/CraateCard';
import EditCard from '../Fetches/EditCardPage/EditCardPage';
import Vector from '../../assets/add__card/Vector.png';
import { useNavigate } from 'react-router-dom';
import { setEditWindow } from '../../redux/Main/actions';
import { showSuccessfulModal, setData } from '../../redux/AddEdit/actions';
import fetchActiveStunneds from '../Fetches/Stunneds/FetchActive';
import DeleteAdverts from '../Fetches/EditCardPage/DeleteAdverts';
import DeletePhoto from '../Fetches/EditCardPage/DeletePhoto';
import AllPersonAdverts from '../Fetches/Stunneds/AllPersonAdverts';
import ArchiveAdverts from "../Fetches/EditCardPage/ArchiveAdverts";

const AddCardBody = () => {

    const isCategoryRedux = useSelector(state => state.myReducer?.isCategoryRedux);
    const isEditWindow = useSelector(state => state.myReducer?.isEditWindow);
    const isData = useSelector(state => state.myReducer2?.isIdCard);
    let isFullImages = useSelector(state => state.myReducer2?.isImages);
    const isSuccessfulWindow = useSelector(state => state.myReducer2?.isSuccessfulWindow);
    const isAllIdimages = useSelector(state => state.myReducer2.isAllIdimages);
    const isDataforDelete = useSelector(state => state.myReducer2.isDataforDelete);
    const isDownloadPictures = useSelector(state => state.myReducer2.isDownloadPictures);

    const tokenBearer = sessionStorage.getItem('login');
    const isLocalHostiId = localStorage.getItem('setIdCard');
    const indexCard = localStorage.getItem('indexCard');
    const isUpdateId = localStorage.getItem('update');
    const isDelete = localStorage.getItem('delete');
    const isArchive = sessionStorage.getItem('archive');

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
    const [photoUrl, addPhotoUrl] = useState([]);
    const [photoForServer, setPhotoForServer] = useState([]);
    const [isNewCard, setNewCard] = useState(
        {
            title: isEditWindow ? isData?.title : '',
            category: isEditWindow ? isData?.category : '',
            description: isEditWindow ? isData?.description : '',
            address: {
                region: isEditWindow ? isData?.address : '',
                city: isEditWindow ? '.' : '',
            },
            phone: isEditWindow ? isData?.phone : '',
            price: isEditWindow ? isData?.price : '',
            ...(isEditWindow && { firstPriceDisplayed: isData?.firstPriceDisplayed }),
            currency: isEditWindow ? isData?.currency : '',
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
    const [isInputCategory, setInputCategory] = useState(isEditWindow ? isData?.category : '');

    useEffect(() => {
        if (isEditWindow && isLocalHostiId) {
            const part = localStorage.getItem('part');
            AllPersonAdverts(setData, dispatch, tokenBearer, part);
        }
    }, [isLocalHostiId, isEditWindow, dispatch, tokenBearer])

    useEffect(() => {
    }, [isAllIdimages, isDownloadPictures])

    useEffect(() => {
        setNewCard((prevState) => ({
            ...prevState,
            category: isCategoryRedux,
        }));
        setIsCategory(false);

    }, [isCategoryRedux]);

    useEffect(() => {
        if (isEditWindow) {
            const newPhotoUrls = [];
            // Обработка файлов, полученных из чаркодов
            isFullImages[indexCard]?.forEach((base64String, index) => {
                const byteCharacters = atob(base64String);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/jpeg' });
                const url = URL.createObjectURL(blob);
                newPhotoUrls.push(url);
            });

            // Обработка файлов, загруженных пользователем
            isPhoto?.forEach((file) => {
                const url = URL.createObjectURL(file);
                newPhotoUrls.push(url);
            });

            addPhotoUrl(newPhotoUrls)
        }
    }, [indexCard, isPhoto, isFullImages, isEditWindow]);

    useEffect(() => {
        setNewCard({
            title: isEditWindow ? isData?.title : '',
            category: isEditWindow ? isData?.category : '',
            description: isEditWindow ? isData?.description : '',
            address: {
                region: isEditWindow ? isData?.address : '',
                city: isEditWindow ? '.' : '',
            },
            phone: isEditWindow ? isData?.phone : '',
            price: isEditWindow ? isData?.price : '',
            firstPriceDisplayed: isEditWindow ? isData?.firstPriceDisplayed : false,
            currency: isEditWindow ? isData?.currency : '',
        });
        setInputCategory(isEditWindow ? isData?.category : '');

        setProductNameEmpty({
            title: isData?.title ? false : null,
            category: isData?.category ? false : null,
            description: isData?.description ? false : null,
            address: isData?.address ? false : null,
            phone: isData?.phone ? false : null,
            price: isData?.price ? false : null,
            currency: isData?.currency ? false : null,
        })

    }, [isData, isEditWindow, isFullImages, dispatch]);

    // useEffect(() => {
    //     console.log(isNewCard);
    // }, [isNewCard])

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

        if (isArchive && isSuccessfulWindow) {
            sessionStorage.removeItem('archive');
            notifyError('Оголошення відправлено в архів');
            dispatch(showSuccessfulModal());
        }

        if (isSuccessfulWindow && !isArchive) {
            notifyError(isEditWindow ? 'Оголошення відредактовано' : 'Оголошення створено.')
            dispatch(showSuccessfulModal());
        }
        if ((isLocalHostiId || isUpdateId) && isEditWindow) {
            localStorage.removeItem('update');
            fetchActiveStunneds(dispatch, isLocalHostiId, tokenBearer);
        }
        if (!isLocalHostiId && isEditWindow) {
            navigate('/personal_area');
        }

    }, [location, dispatch, isEditWindow, isSuccessfulWindow, isLocalHostiId, isUpdateId,
        navigate, isDelete, tokenBearer, isArchive]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhotoForServer([...photoForServer, file])
        setPhoto([...isPhoto, file]);
        setPhotoEmpty(false)
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
        setPhotoForServer([]);
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
            if (allFieldsEmpty && !photoEmpty) {
                if (isEditWindow) {
                    EditCard(isNewCard, isLocalHostiId, showSuccessfulModal, dispatch,
                        tokenBearer, photoForServer, isData);
                    dispatch(setEditWindow());
                    navigate("/personal_area");
                } else {
                    console.log(isNewCard);
                    AddCard(isNewCard, isPhoto, showSuccessfulModal, dispatch, tokenBearer);
                    resetCard();
                }
            }
        }, 0)
    };

    const deletePhoto = (idPhoto) => {
        const updatedPhotos = [...isPhoto];
        updatedPhotos.splice(idPhoto, 1);
        setPhoto(updatedPhotos);
        DeletePhoto(idPhoto, showSuccessfulModal, dispatch, tokenBearer, isDataforDelete)
    };

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
        });
    };

    const checkRegex = (value, item) => {
        if (item === 'title') {
            const titleRegex = /^.{0,25}$/;
            if (titleRegex.test(value) || value === '') {
                setNewCard({ ...isNewCard, title: value });
            }
        }
        if (item === 'description') {
            const descriptionRegex = /^.{0,200}$/;
            if (descriptionRegex.test(value) || value === '') {
                setNewCard({ ...isNewCard, description: value });
            }
        }
        if (item === 'phone') {
            const phoneRegex = /^\+?\d{0,12}$/;
            if (phoneRegex.test(value) || value === '') {
                setNewCard({ ...isNewCard, phone: value });
            }
        }
        if (item === 'price') {
            const priceRegex = /^\d{1,10}$/;
            if (priceRegex.test(value) || value === '') {
                setNewCard({ ...isNewCard, price: value });
            }
        }
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
                        checkRegex(e.target.value, "title");
                        setProductNameEmpty((prevState) => ({ ...prevState, title: false }))
                    }}
                />
                <br />
                <input
                    className={`add__input__category${productNameEmpty.category ? '__empty' : ''}`}
                    type="text"
                    name="category"
                    placeholder='Оберіть категорію'
                    value={isInputCategory ? isInputCategory : ''}
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
                        checkRegex(e.target.value, "description");
                        setProductNameEmpty((prevState) => ({ ...prevState, description: false }))
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
                        {isDownloadPictures && isEditWindow ?
                            <label>loading...</label> :
                            <div>
                                {((photoUrl[0] && isEditWindow) || (isPhoto[0])) ? (
                                    <div className='add__photo'>
                                        <img className='add__img'
                                            src={isEditWindow ? photoUrl[0] : (isPhoto && isPhoto[0]) ? URL.createObjectURL(isPhoto[0]) : ''}
                                            alt="logo" />
                                        <button
                                            className='add__trash'
                                            onClick={() => deletePhoto(isAllIdimages[0])}
                                        />
                                    </div>
                                ) : (
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
                                )}
                            </div>
                        }
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        {isDownloadPictures && isEditWindow ?
                            <label>loading...</label> :
                            <div>
                                {((photoUrl[1] && isEditWindow) || (isPhoto[1])) ?
                                    <>
                                        <div className='add__photo'>
                                            <img className='add__img'
                                                src={isEditWindow ? photoUrl[1] : (isPhoto && isPhoto[1]) ? URL.createObjectURL(isPhoto[1]) : ''}
                                                alt="logo" />
                                            <button
                                                className='add__trash'
                                                onClick={() => deletePhoto(isAllIdimages[1])}
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
                        }
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        {isDownloadPictures && isEditWindow ?
                            <label>loading...</label> :
                            <div>
                                {((photoUrl[2] && isEditWindow) || (isPhoto[2])) ?
                                    <>
                                        <div className='add__photo'>
                                            <img className='add__img'
                                                src={isEditWindow ? photoUrl[2] : (isPhoto && isPhoto[2]) ? URL.createObjectURL(isPhoto[2]) : ''}
                                                alt="logo" />
                                            <button
                                                className='add__trash'
                                                onClick={() => deletePhoto(isAllIdimages[2])}
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
                        }
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        {isDownloadPictures && isEditWindow ?
                            <label>loading...</label> :
                            <div>
                                {((photoUrl[3] && isEditWindow) || (isPhoto[3])) ?
                                    <>
                                        <div className='add__photo'>
                                            <img className='add__img'
                                                src={isEditWindow ? photoUrl[3] : (isPhoto && isPhoto[3]) ? URL.createObjectURL(isPhoto[3]) : ''}
                                                alt="logo" />
                                            <button
                                                className='add__trash'
                                                onClick={() => deletePhoto(isAllIdimages[3])}
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
                        }
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        {isDownloadPictures && isEditWindow ?
                            <label>loading...</label> :
                            <div>
                                {((photoUrl[4] && isEditWindow) || (isPhoto[4])) ?
                                    <>
                                        <div className='add__photo'>
                                            <img className='add__img'
                                                src={isEditWindow ? photoUrl[4] : (isPhoto && isPhoto[4]) ? URL.createObjectURL(isPhoto[4]) : ''}
                                                alt="logo" />
                                            <button
                                                className='add__trash'
                                                onClick={() => deletePhoto(isAllIdimages[4])}
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
                        }
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        {isDownloadPictures && isEditWindow ?
                            <label>loading...</label> :
                            <div>
                                {((photoUrl[5] && isEditWindow) || (isPhoto[5])) ?
                                    <>
                                        <div className='add__photo'>
                                            <img className='add__img'
                                                src={isEditWindow ? photoUrl[5] : (isPhoto && isPhoto[5]) ? URL.createObjectURL(isPhoto[5]) : ''}
                                                alt="logo" />
                                            <button
                                                className='add__trash'
                                                onClick={() => deletePhoto(isAllIdimages[5])}
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
                        }
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        {isDownloadPictures && isEditWindow ?
                            <label>loading...</label> :
                            <div>
                                {((photoUrl[6] && isEditWindow) || (isPhoto[6])) ?
                                    <>
                                        <div className='add__photo'>
                                            <img className='add__img'
                                                src={isEditWindow ? photoUrl[6] : (isPhoto && isPhoto[6]) ? URL.createObjectURL(isPhoto[6]) : ''}
                                                alt="logo" />
                                            <button
                                                className='add__trash'
                                                onClick={() => deletePhoto(isAllIdimages[6])}
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
                        }
                    </li>
                    <li className={`add__input__photo${photoEmpty ? '__empty' : ''}`}>
                        {isDownloadPictures && isEditWindow ?
                            <label>loading...</label> :
                            <div>
                                {((photoUrl[7] && isEditWindow) || (isPhoto[7])) ?
                                    <>
                                        <div className='add__photo'>
                                            <img className='add__img'
                                                src={isEditWindow ? photoUrl[7] : (isPhoto && isPhoto[7]) ? URL.createObjectURL(isPhoto[7]) : ''}
                                                alt="logo" />
                                            <button
                                                className='add__trash'
                                                onClick={() => deletePhoto(isAllIdimages[7])}
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
                        }
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
                    value={`${isNewCard.address?.region}${isNewCard.address?.city}` || ''}
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
                        checkRegex(e.target.value, "phone");
                        setProductNameEmpty((prevState) => ({ ...prevState, phone: false }))
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
                        checkRegex(e.target.value, "price");
                        setProductNameEmpty((prevState) => ({ ...prevState, price: false }))
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
                {isOptions || !isOptions ?
                    <div className='add__options__wrap'>
                        <button
                            className={!isOptions ? 'add__select_none' : 'add__select'}
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
                            className={!isOptions ? 'add__select_none' : 'add__select'}
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
                            className={!isOptions ? 'add__select_none' : 'add__select'}
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
                {isEditWindow ?
                    <div className="edit__check__wrap">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setNewCard(prevState => ({
                                    ...prevState,
                                    firstPriceDisplayed: !prevState.firstPriceDisplayed
                                }));
                            }}
                            className={`edit__checkbox${isNewCard.firstPriceDisplayed ? '__active' : ''}`}>
                        </button>
                        <label>
                            Відображати акцію на сторінці
                        </label>
                    </div>
                    : null
                }
                <div className="add__submit__wrap">
                    {isEditWindow ?
                        <button
                            id={'edit__cancel'}
                            onClick={() => navigate('/personal_area')}>Повернутися
                        </button> : null
                    }
                    <button
                        id={isOptions && !isEditWindow ? 'add_submit_none' : 'add_submit'}
                        onClick={submitCard}>{isEditWindow ? 'Оновити' : 'Опублікувати'}
                    </button>
                    {isEditWindow ?
                        <>
                            <button
                                id={'edit__delete'}
                                onClick={() => {
                                    DeleteAdverts(isLocalHostiId, dispatch, tokenBearer, navigate);
                                }}>Видалити
                            </button>
                            <button
                                id={'edit__archive'}
                                onClick={() => ArchiveAdverts(isLocalHostiId, tokenBearer, dispatch, showSuccessfulModal)}>Архівувати
                            </button>
                        </>
                        : null
                    }
                </div>
            </div>
            <ToastContainer
                style={{ position: 'fixed', right: '0 !important', width: 'max-content' }}
            />
        </div>
    )
}

export default AddCardBody;