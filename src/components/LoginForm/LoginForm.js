import './LoginForm.scss';
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form as BootstrapForm } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
    const [registration, setRegistration] = useState(false);
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

    return (
        <div className='login__form__wrap'>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    checkbox: false,
                }}
                onSubmit={values => {
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {({ handleSubmit, handleChange, values }) => (
                    <Form onSubmit={handleSubmit} className='login__formik'>
                        <button className='login__btn__back' onClick={handleNavigate}></button>
                        <button onClick={HandleClick} className='login__btn__google'><div className='login__google' /> Продовжити з Gmail</button>
                        <button onClick={HandleClick} className='login__btn__inst'><div className='login__inst' /> Продовжити з Instagram</button>
                        <button onClick={HandleClick} className='login__btn__facebook'><div className='login__facebook' /> Продовжити з Facebook</button>
                        <span>або</span><br />
                        <div className='login__btn__wrap'>
                            <button onClick={showRegistration}>Зареєструватися</button>
                            <button onClick={showEnterence}>Увійти</button>
                        </div>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            placeholder='Електронна пошта чи телефон'
                            autoComplete="email"
                        /><br />
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                            placeholder='Пароль*'
                            autoComplete="password"
                        /><br />
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
                                <BootstrapForm.Label className="ml-2">
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
        </div>
    )
}

export default LoginForm;
