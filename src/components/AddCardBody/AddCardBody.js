import './AddCardBody.scss';
import React, { useState, useRef, useEffect } from 'react';
import Categorys from '../MainLeftSide/MainLeftSide';
import { useSelector } from 'react-redux';
import PlacingAnOrder from '../PlacingAnOrder/PlacingAnOrder';
import axios from 'axios';

const AddCardBody = () => {

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
    const [isNewCard, setNewCard] = useState(
        {
            productName: '',
            category: '',
            discription: '',
            photo: [],
            location: {
                region: '',
                city: '',
                postAddress: '',
            },
            phone: '',
            price: '',
        }
    );

    const [productNameEmpty, setProductNameEmpty] = useState(
        {
            productName: null,
            category: null,
            discription: null,
            photo: null,
            location: null,
            phone: null,
            price: null,
        }
    );

    const isCategoryRedux = useSelector(state => state.myReducer?.isCategoryRedux);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewCard(prevState => ({
            ...prevState,
            photo: [...prevState.photo, file]
        }))
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
            productName: '',
            category: '',
            discription: '',
            photo: [],
            location: {
                region: '',
                city: '',
                postAddress: '',
            },
            phone: '',
            price: '',
        });
    };

    const addCard = () => {
        let location = false;
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

        for (let key in isNewCard.location) {
            if (isNewCard.location[key].length === 0) {
                location = true;
            }
        }

        if (location) {
            setProductNameEmpty((prevState) => ({
                ...prevState,
                location: true,
            }))
        } else {
            setProductNameEmpty((prevState) => ({
                ...prevState,
                location: false,
            }))
        }

        setTimeout(() => {
            const allFieldsEmpty = Object.values(productNameEmpty).every(value => value === false);
            if (allFieldsEmpty) {
                console.log(productNameEmpty, allFieldsEmpty, isNewCard)
                resetCard()
            }
        }, 0)
    };

    const deletePhoto = (num) => {
        const updatedPhotos = [...isNewCard.photo];
        updatedPhotos.splice(num, 1);
        setNewCard(prevState => ({
            ...prevState,
            photo: updatedPhotos
        }));
        console.log(updatedPhotos);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/v1.0/adverts',
                {
                    "title": "Big dog",
                    "description": "description a toy Big dog",
                    "category": "TOYS",
                    "status": "PUBLISHED",
                    "phone": "+380507778855",
                    "price": "100.00",
                    "firstPriceDisplayed": "true",
                    "currency": "EUR",
                    "address": "Dania",
                }
            );
            console.log(response.data);
        } catch (error) {
            console.log("Ошибка при выполнении POST-запроса для создания карточки товара:", error);
        } finally {
            console.log("End");
        }
    };

    return (
        <div className='AddCardBody__wrap'>
            <div className='add__left__side'>
                <div >Створити оголошення</div>
                <label >Заповніть основні дані про товар*</label><br />
                <input
                    className={`add__input__name${productNameEmpty.productName ? '__empty' : ''}`}
                    type="text"
                    name="productName"
                    placeholder='Назва товару'
                    value={isNewCard.productName || ''}
                    onChange={(e) => {
                        setProductNameEmpty((prevState) => ({ ...prevState, productName: false }))
                        setNewCard({ ...isNewCard, productName: e.target.value });
                    }}
                />
                <br />
                <input
                    className={`add__input__category${productNameEmpty.category ? '__empty' : ''}`}
                    type="text"
                    name="category"
                    placeholder='Оберіть категорію'
                    value={isNewCard.category || ''}
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
                    className={`add__textarea__discription${productNameEmpty.discription ? '__empty' : ''}`}
                    cols="50"
                    rows="8"
                    placeholder='Додайте опис'
                    name="discription"
                    value={isNewCard.discription || ''}
                    onChange={(e) => {
                        setProductNameEmpty((prevState) => ({ ...prevState, discription: false }))
                        setNewCard({ ...isNewCard, discription: e.target.value });
                    }}
                />
            </div>
            <div className='add__center__side'>
                <label >Додати фото*</label><br />
                <div className={isCategory ? 'add__categorys' : 'add__categorys__none'}>
                    <Categorys isCategory={isCategory} />
                </div>
                <div className={isAddress ? 'add__address' : 'add__address__none'}>
                    <PlacingAnOrder setIsAddress={setIsAddress} isNewCard={isNewCard} setNewCard={setNewCard} />
                </div>
                <ul>
                    <li className={`add__input__photo${productNameEmpty.photo ? '__empty' : ''}`}>
                        <div>
                            {isNewCard.photo[0] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isNewCard.photo[0])} alt="logo" />
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
                                        setProductNameEmpty((prevState) => ({ ...prevState, photo: false }))
                                        handleButtonClick(fileInputRefs.one)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${productNameEmpty.photo ? '__empty' : ''}`}>
                        <div>
                            {isNewCard.photo[1] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isNewCard.photo[1])} alt="logo" />
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
                                        setProductNameEmpty((prevState) => ({ ...prevState, photo: false }))
                                        handleButtonClick(fileInputRefs.two)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${productNameEmpty.photo ? '__empty' : ''}`}>
                        <div>
                            {isNewCard.photo[2] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isNewCard.photo[2])} alt="logo" />
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
                                        setProductNameEmpty((prevState) => ({ ...prevState, photo: false }))
                                        handleButtonClick(fileInputRefs.three)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${productNameEmpty.photo ? '__empty' : ''}`}>
                        <div>
                            {isNewCard.photo[3] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isNewCard.photo[3])} alt="logo" />
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
                                        setProductNameEmpty((prevState) => ({ ...prevState, photo: false }))
                                        handleButtonClick(fileInputRefs.four)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${productNameEmpty.photo ? '__empty' : ''}`}>
                        <div>
                            {isNewCard.photo[4] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isNewCard.photo[4])} alt="logo" />
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
                                        setProductNameEmpty((prevState) => ({ ...prevState, photo: false }))
                                        handleButtonClick(fileInputRefs.five)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${productNameEmpty.photo ? '__empty' : ''}`}>
                        <div>
                            {isNewCard.photo[5] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isNewCard.photo[5])} alt="logo" />
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
                                        setProductNameEmpty((prevState) => ({ ...prevState, photo: false }))
                                        handleButtonClick(fileInputRefs.six)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${productNameEmpty.photo ? '__empty' : ''}`}>
                        <div>
                            {isNewCard.photo[6] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isNewCard.photo[6])} alt="logo" />
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
                                        setProductNameEmpty((prevState) => ({ ...prevState, photo: false }))
                                        handleButtonClick(fileInputRefs.seven)
                                    }} />
                                </>
                            }
                        </div>
                    </li>
                    <li className={`add__input__photo${productNameEmpty.photo ? '__empty' : ''}`}>
                        <div>
                            {isNewCard.photo[7] ?
                                <>
                                    <div className='add__photo'>
                                        <img className='add__img' src={URL.createObjectURL(isNewCard.photo[7])} alt="logo" />
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
                                        setProductNameEmpty((prevState) => ({ ...prevState, photo: false }))
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
                    className={`add__input__adress${productNameEmpty.location ? '__empty' : ''}`}
                    type="text"
                    name="location"
                    placeholder='Адреса відправки'
                    value={`${isNewCard.location.region}${isNewCard.location.city}${isNewCard.location.postAddress}` || ''}
                    onClick={() => {
                        showAdress()
                        setProductNameEmpty((prevState) => ({ ...prevState, location: false }))
                    }}
                    onChange={() => {
                        setProductNameEmpty((prevState) => ({ ...prevState, location: false }))
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
                /><br />
                <button onClick={submitForm}>Опублікувати</button>
            </div>
        </div>
    )
}

export default AddCardBody;