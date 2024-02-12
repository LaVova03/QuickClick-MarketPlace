import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPasswordModal.scss';
import React, { useState, useEffect } from 'react';

const ForgotPasswordModal = ({ setForgotPassword }) => {

    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isEmail, setEmail] = useState('');

    useEffect(() => {
        addEmail(isEmail)
    }, [isEmail]);

    const addEmail = (email) => {
        const emailRegex = /[A-Za-z0-9_-]+@[A-Za-z0-9_-]+/.test(email);
        setIsEmailValid(emailRegex);
    };

    const setNewEmail = () => {
        if (isEmailValid) {
            notifyError('Заповніть поле')
        }
        if (!isEmailValid && isEmail) {
            notifyError('Невірний формат, внесіть данні у форматі angel@gmail.com')
        } else {
            setEmail('');
            setIsEmailValid(null);
        }
    }

    const notifyError = (message) => {
        toast.error(message, {
            position: 'top-right'
        });
    };

    return (
        <div className='ForgotPasswordModal__wrap'>
            <div>
                <button
                    className='login__btn__back__forgot'
                    onClick={() => setForgotPassword()}>
                </button>
                <div>Забули пароль?</div>
                <label>Яка електронна пошта прив’язана до вашого профілю?</label>
                <input
                    type="text"
                    value={isEmail || ''}
                    placeholder='Електронна пошта'
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    style={{ border: isEmail && !isEmailValid ? '' : '1px solid #FF5858' }}
                />
                <button
                    onClick={setNewEmail}
                >Надіслати лист</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ForgotPasswordModal;
