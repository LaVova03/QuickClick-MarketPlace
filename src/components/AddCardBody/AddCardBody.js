import './AddCardBody.scss';
import React, { useState, useRef, useEffect } from 'react';
import Categorys from '../MainLeftSide/MainLeftSide';
import { useSelector } from 'react-redux';

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
    const [isNewCard, setNewCard] = useState(
        {
            productName: '',
            category: '',
            discription: '',
            photo: [],
            location: '',
            phone: '',
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
            if (!event.target.closest('.add__input')) {
                setIsCategory(false);
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log('Выбранный файл:', file);
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

    return (
        <div className='AddCardBody__wrap'>
            <div className='add__left__side'>
                <div >Створити оголошення</div>
                <label >Заповніть основні дані про товар*</label><br />
                <input
                    className='add__input'
                    type="text"
                    placeholder='Назва товару'
                />
                <br />
                <input
                    className='add__input'
                    type="text"
                    placeholder='Оберіть категорію'
                    value={isNewCard.category}
                    onClick={showCategorys}
                    onChange={(e) => {
                        setNewCard({ ...isNewCard, category: e.target.value });
                    }}
                />
                <br />
                <textarea cols="50" rows="8" placeholder='Додайте опис' />
            </div>
            <div className='add__center__side'>
                <label >Додати фото*</label><br />
                <div className={isCategory ? 'add__categorys' : 'add__categorys__none'}>
                    <Categorys isCategory={isCategory} />
                </div>
                <ul>
                    <li>
                        <div>
                            {isNewCard.photo[0] ?
                                <img className='add__img' src={URL.createObjectURL(isNewCard.photo[0])} alt="logo" /> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.one}
                                        onChange={(e) => handleFileChange(e, 0)}
                                    />
                                    <button onClick={() => handleButtonClick(fileInputRefs.one)} />
                                </>
                            }
                        </div>
                    </li>
                    <li>
                        <div>
                            {isNewCard.photo[1] ?
                                <img className='add__img' src={URL.createObjectURL(isNewCard.photo[1])} alt="logo" /> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.two}
                                        onChange={(e) => handleFileChange(e, 1)}
                                    />
                                    <button onClick={() => handleButtonClick(fileInputRefs.two)} />
                                </>
                            }
                        </div>
                    </li>
                    <li>
                        <div>
                            {isNewCard.photo[2] ?
                                <img className='add__img' src={URL.createObjectURL(isNewCard.photo[2])} alt="logo" /> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.three}
                                        onChange={(e) => handleFileChange(e, 2)}
                                    />
                                    <button onClick={() => handleButtonClick(fileInputRefs.three)} />
                                </>
                            }
                        </div>
                    </li>
                    <li>
                        <div>
                            {isNewCard.photo[3] ?
                                <img className='add__img' src={URL.createObjectURL(isNewCard.photo[3])} alt="logo" /> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.four}
                                        onChange={(e) => handleFileChange(e, 3)}
                                    />
                                    <button onClick={() => handleButtonClick(fileInputRefs.four)} />
                                </>
                            }
                        </div>
                    </li>
                    <li>
                        <div>
                            {isNewCard.photo[4] ?
                                <img className='add__img' src={URL.createObjectURL(isNewCard.photo[4])} alt="logo" /> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.five}
                                        onChange={(e) => handleFileChange(e, 4)}
                                    />
                                    <button onClick={() => handleButtonClick(fileInputRefs.five)} />
                                </>
                            }
                        </div>
                    </li>
                    <li>
                        <div>
                            {isNewCard.photo[5] ?
                                <img className='add__img' src={URL.createObjectURL(isNewCard.photo[5])} alt="logo" /> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.six}
                                        onChange={(e) => handleFileChange(e, 5)}
                                    />
                                    <button onClick={() => handleButtonClick(fileInputRefs.six)} />
                                </>
                            }
                        </div>
                    </li>
                    <li>
                        <div>
                            {isNewCard.photo[6] ?
                                <img className='add__img' src={URL.createObjectURL(isNewCard.photo[6])} alt="logo" /> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.seven}
                                        onChange={(e) => handleFileChange(e, 6)}
                                    />
                                    <button onClick={() => handleButtonClick(fileInputRefs.seven)} />
                                </>
                            }
                        </div>
                    </li>
                    <li>
                        <div>
                            {isNewCard.photo[7] ?
                                <img className='add__img' src={URL.createObjectURL(isNewCard.photo[7])} alt="logo" /> :
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRefs.eight}
                                        onChange={(e) => handleFileChange(e, 7)}
                                    />
                                    <button onClick={() => handleButtonClick(fileInputRefs.eight)} />
                                </>
                            }
                        </div>
                    </li>
                </ul>
            </div>
            <div className='add__right__side'>
                <label >Місцезнаходження товару*</label><br />
                <input
                    className='add__input'
                    type="text"
                    placeholder='Адреса відправки'
                />
                <br />
                <label >Ваші контактні дані*</label><br />
                <input
                    className='add__input'
                    type="t"
                    placeholder='Ваш номер телефону'
                />
                <br />
                <label >Ціна товару*</label><br />
                <input
                    className='add__input'
                    type="t"
                    placeholder='Ціна'
                /><br />
                <button>Опублікувати</button>
            </div>
        </div>
    )
}

export default AddCardBody;