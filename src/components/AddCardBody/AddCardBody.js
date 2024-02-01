import './AddCardBody.scss';
import React, { useState, useRef } from 'react';

const AddCardBody = () => {

    const fileInputRef = useRef(null);
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log('Выбранный файл:', file);
        setNewCard(prevState => ({
            ...prevState,
            photo: [...prevState.photo, file]
        }))
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='AddCardBody__wrap'>
            <div className='add__left__side'>
                <div >Створити оголошення</div>
                <label >Заповніть основні дані про товар*</label><br />
                <input className='add__input' type="text" placeholder=' Назва товару' /><br />
                <input className='add__input' type="t" placeholder=' Оберіть категорію' /><br />
                <textarea cols="50" rows="8" placeholder=' Додайте опис' />
            </div>
            <div className='add__center__side'>
                <label >Додати фото*</label><br />
                <ul>
                    <li>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <button onClick={handleButtonClick} />
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <button onClick={handleButtonClick} />
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <button onClick={handleButtonClick} />
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <button onClick={handleButtonClick} />
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <button onClick={handleButtonClick} />
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <button onClick={handleButtonClick} />
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <button onClick={handleButtonClick} />
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <button onClick={handleButtonClick} />
                        </div>
                    </li>
                </ul>
            </div>
            <div className='add__right__side'>
                <label >Місцезнаходження товару*</label><br />
                <input className='add__input' type="text" placeholder=' Адреса відправки' /><br />
                <label >Ваші контактні дані*</label><br />
                <input className='add__input' type="t" placeholder=' Ваш номер телефону' /><br />
                <button>Опублікувати</button>
            </div>
        </div>
    )
}

export default AddCardBody;