import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RepeatPasswordModal.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RepeatPasswordModal = ({ closeModal, initialValue }) => {

    const [isPassword, setPassword] = useState('');

    const navigate = useNavigate();

    const checkPassowrd = () => {
        if (isPassword === initialValue) {
            navigate("/personal_area");
        } else {
            notifyError("Помилка, спробуйте ще раз")
        }
    }

    const notifyError = (message) => {
        toast.error(message, {
            position: 'top-right'
        });
    };

    return (
        <div>
            <div className="RepeatPasswordModal__wrap">
                <div>
                    <button onClick={closeModal} id='repeat__btn__x'></button>
                </div>
                <input
                    type="text"
                    placeholder='повторіть пароль'
                    name="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                < button onClick={checkPassowrd} id='repeat__btn__agree'>Підтвердити</button>
            </div >
            <ToastContainer className='repeat__toast' />
        </div>
    )
}

export default RepeatPasswordModal;