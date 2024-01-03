import './LoginForm.scss';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const [registration, setRegistration] = useState(false);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            checkbox: false,
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handleNavigate = () => navigate("/");

    const HandleClick = (e) => {
        e.preventDefault();
    }

    const showRegistration = (e) => {
        e.preventDefault();
        setRegistration(true);
    }

    const showEnterence = (e) => {
        e.preventDefault();
        setRegistration(false);
    }

    return (
        <div className='login__form__wrap'>
            <form onSubmit={formik.handleSubmit} className='login__formik'>
                <button className='login__btn__back' onClick={handleNavigate}></button>
                <button onClick={HandleClick} className='login__btn__google'><div className='login__google' /> Продовжити з Gmail</button>
                <button onClick={HandleClick} className='login__btn__inst'><div className='login__inst' /> Продовжити з Instagram</button>
                <button onClick={HandleClick} className='login__btn__facebook'><div className='login__facebook' /> Продовжити з Facebook</button>
                <span>або</span><br />
                <div className='login__btn__wrap'>
                    <button onClick={showRegistration}>Зареєструватися</button>
                    <button onClick={showEnterence}>Увійти</button>
                </div>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder='Електронна пошта чи телефон'
                    autoComplete="email"
                /><br />
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder='Пароль*'
                    autoComplete="password"
                /><br />
                {!registration ?
                    <button
                        className='login__forgot__pasword'
                        onClick={HandleClick}>Забули пароль?
                    </button> :
                    <div className='login__checkbox'>
                        <input
                            id="checkbox"
                            name="checkbox"
                            type="checkbox"
                            checked={formik.values.checkbox}
                            onChange={formik.handleChange}
                        />
                        Створюючи профіль на QuickQlick, ви погоджуєтеся з умовами використання
                    </div>}
                <button
                    type="submit"
                    className='login__summit'>
                    {registration ? 'Створити' : 'Увійти'}
                </button>
            </form>
        </div >
    )
}

export default LoginForm;