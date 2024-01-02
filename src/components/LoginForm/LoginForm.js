import './LoginForm.scss';
import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handleNavigate = () => navigate("/");

    const HandleClick = (e) => {
        e.preventDefault();
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
                    <button onClick={HandleClick}>Зареєструватися</button>
                    <button onClick={HandleClick}>Увійти</button>
                </div>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder='Електронна пошта чи телефон'
                /><br />
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder='Пароль*'
                /><br />
                <button
                    className='login__forgot__pasword'
                    onClick={HandleClick}>Забули пароль?
                </button>
                <button
                    type="submit"
                    className='login__summit'>
                    Увійти
                </button>
            </form>
        </div >
    )
}

export default LoginForm;