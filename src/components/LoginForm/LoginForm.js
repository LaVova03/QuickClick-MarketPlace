import './LoginForm.scss';
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form as BootstrapForm } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
    const [registration, setRegistration] = useState(false);
    const [isEye, setIsEye] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);
    const [resRegex, setResRegex] = useState(true);

    useEffect(() => {
        console.log(resRegex)
    }, [resRegex])

    const navigate = useNavigate();

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

    const showPassword = () => {
        setIsEye((prevState) => {
            return !prevState;
        });
    };

    return (
        <div className='login__form__wrap'>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    checkbox: false,
                }}
                onSubmit={(values, { resetForm }) => {

                    const passwordRegex = /^[a-zA-Z!@#$%^&*()_+{}|:"<>?[\],.';~`]+$/;

                    for (let key in values) {
                        if (key === 'password') {
                            let reg = passwordRegex.test(values[key]);
                            if (!reg) {
                                setResRegex(false);
                            }
                        }
                    }

                    const emptyFieldsArray = Object.entries(values)
                        .filter(([key, value]) => (key === 'email' ||
                            (key === 'password')) && !value)
                        .map(([key]) => key);

                    setEmptyFields(emptyFieldsArray);

                    if (emptyFieldsArray.length === 0 && resRegex) {
                        if (registration) {
                            alert(JSON.stringify(values, null, 2));
                        } else {
                            const combinedValues = { email: values.email, password: values.password };
                            alert(JSON.stringify(combinedValues, null, 2));
                        }

                        resetForm();
                        setResRegex(true);
                    }
                }}
            >
                {({ handleSubmit, handleChange, values }) => (
                    <Form onSubmit={handleSubmit} className='login__formik'>
                        <button
                            className='login__btn__back'
                            onClick={handleNavigate}>

                        </button>
                        <button
                            onClick={HandleClick}
                            className='login__btn__google'>
                            <div className='login__google' />
                            Продовжити з Gmail
                        </button>
                        <button
                            onClick={HandleClick}
                            className='login__btn__inst'>
                            <div className='login__inst' />
                            Продовжити з Instagram
                        </button>
                        <button
                            onClick={HandleClick}
                            className='login__btn__facebook'>
                            <div className='login__facebook' />
                            Продовжити з Facebook
                        </button>
                        <span>або</span>
                        <div className='login__btn__wrap'>
                            <button onClick={showRegistration}>Зареєструватися</button>
                            <button onClick={showEnterence}>Увійти</button>
                        </div>
                        <div className='login__wrap__email'>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) => {
                                    handleChange(e);
                                    setEmptyFields((prevFields) => prevFields.filter(field => field !== 'email'));
                                }}
                                value={values.email}
                                placeholder='Електронна пошта чи телефон'
                                autoComplete="email"
                                style={{ border: emptyFields.includes('email') ? '2px solid red' : '' }}
                            />

                        </div>
                        <div className='login__wrap__password'>
                            <Field
                                type={!isEye ? "password" : "text"}
                                id="password"
                                name="password"
                                onChange={(e) => {
                                    handleChange(e);
                                    setEmptyFields((prevFields) => prevFields.filter(field => field !== 'password'));
                                }}
                                value={values.password}
                                placeholder='Пароль*'
                                autoComplete="password"
                                style={{ border: emptyFields.includes('password') || !resRegex ? '2px solid red' : '' }}
                            />
                            <button
                                type='button'
                                onClick={showPassword}
                                className={!isEye ? 'login__eye__close' : 'login__eye__open'}>
                            </button>
                        </div>
                        {!registration ?
                            <button
                                className='login__forgot__pasword'
                                onClick={HandleClick}>Забули пароль?
                            </button> :
                            <div className='login__checkbox'>
                                <BootstrapForm.Group controlId="formCheckbox" className="d-flex align-items-center">
                                    <BootstrapForm.Check
                                        type="checkbox"
                                        name="checkbox"
                                        checked={values.checkbox}
                                        onChange={handleChange}
                                    />
                                    <BootstrapForm.Label className="ml-2" style={{ pointerEvents: 'none' }}>
                                        Створюючи профіль на QuickQlick, ви погоджуєтеся з умовами використання
                                    </BootstrapForm.Label>
                                    <ErrorMessage name="checkbox" component="div" />
                                </BootstrapForm.Group>
                            </div>}
                        <button
                            type="submit"
                            className='login__summit'>
                            {registration ? 'Створити' : 'Увійти'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default LoginForm;
