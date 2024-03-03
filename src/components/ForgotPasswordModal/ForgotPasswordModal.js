import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPasswordModal.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordModal = () => {

    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isEmail, setEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (isEmail === '') {
            setIsEmailValid(null);
        } else {
            const emailRegex = /[A-Za-z0-9_-]+@[A-Za-z0-9_-]+/.test(isEmail);
            setIsEmailValid(emailRegex);
        }
    }, [isEmail]);

    const setNewEmail = () => {
        if (isEmail === '') {
            notifyError('Заповніть поле');
            setIsEmailValid(false);
            return;
        }
        if (!isEmailValid) {
            notifyError('Невірний формат, внесіть данні у форматі angel@gmail.com')
        } else {
            setEmail('');
            setIsEmailValid(true);
        }
    }

    const notifyError = (message) => {
        toast.error(message, {
            position: 'top-right'
        });
    };

    return (
        <div className='ForgotPasswordModal__main'>
            <div className='ForgotPasswordModal__wrap'>
                <div>
                    <button
                        className='login__btn__back__forgot'
                        onClick={() => navigate("/login")}>
                    </button>
                    <div className='forgot__header'>Забули пароль?</div>
                    <label>Яка електронна пошта прив’язана до вашого профілю?</label>
                    <input
                        type="text"
                        value={isEmail || ''}
                        placeholder='Електронна пошта'
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        style={{ border: isEmailValid === false ? '1px solid #FF5858' : '' }}
                    />
                    <button
                        onClick={setNewEmail}
                    >Надіслати лист</button>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default ForgotPasswordModal;
