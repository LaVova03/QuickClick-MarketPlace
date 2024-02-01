import './AddCardBody.scss';
import React, { useState } from 'react';

const AddCardBody = () => {

    const [isNewCard, setNewCard] = useState(
        {
            productName: '',
            category: '',
            discription: '',
            photo: [],
            location: '',
            phone: '',
        }
    )

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
                        <button />
                    </li>
                    <li>
                        <button />
                    </li>
                    <li>
                        <button />
                    </li>
                    <li>
                        <button />
                    </li>
                    <li>
                        <button />
                    </li>
                    <li>
                        <button />
                    </li>
                    <li>
                        <button />
                    </li>
                    <li>
                        <button />
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