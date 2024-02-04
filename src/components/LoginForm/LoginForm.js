import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginForm.scss';
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form as BootstrapForm } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RepeatPasswordModal from '../RepeatPasswordModal/RepeatPasswordModal';
import { useSelector, useDispatch } from 'react-redux';
import { setAddCard, showButtonExit } from '../../redux/Main/actions';

const LoginForm = () => {
    const [registration, setRegistration] = useState(false);
    const [isEye, setIsEye] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);
    const [isModalRepeatPassword, setModalRepeatPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [resRegex, setResRegex] = useState(
        {
            email: true,
            password: true,
        }
    );
    const [isLogin, setIsLogin] = useState(
        {
            phone: false,
            email: false,
        }
    )

    const isAddCard = useSelector(state => state.myReducer?.isAddModal);
    const isShowExit = useSelector(state => state.myReducer?.isShowExit);
    const dispatch = useDispatch();

    useEffect(() => {

        if (isAddCard) {
            notifyError('Для створення оголошення потрібно зареєструватися');
        }

    }, [isAddCard, dispatch]);

    const notifyError = (message) => {
        toast.error(message, {
            position: 'top-right'
        });
    };

    const navigate = useNavigate();

    const handleNavigate = () => {
        if (isAddCard) {
            dispatch(setAddCard());
        }
        navigate("/");
    }

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

    const checkPasswordRegex = (password) => {
        if (password.length > 9) {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}|:"<>?[\],.';~`\\/-]+$/;
            return passwordRegex.test(password);
        } else {
            return false;
        }
    };

    const checkLoginRegex = (email) => {
        const phoneRegex = /\+{1}\d{12}/.test(email);
        const emailRegex = /[A-Za-z_-]+@{1}[A-Za-z_-]+/.test(email);
        if (phoneRegex && email.length === 13) {
            return phoneRegex
        }
        if (emailRegex) {
            return emailRegex
        }
    };

    const validateLogin = (login) => {
        const isEmail = /^[a-zA-Z=!@#$%^&*()_{}+|:"<>?[\],.';~`\\/-]+$/.test(login);
        const isPhone = /\+{1}\d+/.test(login);
        if (isEmail) {
            setIsLogin(prevState => ({
                ...prevState,
                phone: false,
                email: true,
            }))
        } else if (isPhone) {
            setIsLogin(prevState => ({
                ...prevState,
                email: false,
                phone: true,
            }))
        } else {
            setIsLogin({
                phone: false,
                email: false,
            });
        }
        return isEmail || isPhone;
    };

    const closeModal = () => {
        setModalRepeatPassword(false)
    }

    const deleteToken = (e) => {
        e.preventDefault()
        sessionStorage.removeItem("token");
        dispatch(showButtonExit());
    }

    return (
        <div className='login__form__wrap'>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    checkbox: false,
                }}
                onSubmit={(values, { resetForm }) => {

                    setPassword(values.password);
                    const emptyFieldsArray = Object.entries(values)
                        .filter(([key, value]) => (key === 'email' ||
                            (key === 'password')) && !value)
                        .map(([key]) => key);

                    setEmptyFields(emptyFieldsArray);

                    const resultPassword = checkPasswordRegex(values.password);
                    const resultPhone = isLogin.phone ? checkLoginRegex(values.email) : false;
                    const resultEmail = isLogin.email ? checkLoginRegex(values.email) : false;
                    const resultIsLogin = validateLogin(values.email)

                    if (emptyFieldsArray.length === 0 && resultPassword && (isLogin.phone ? resultPhone : resultEmail)) {
                        if (registration) {
                            setModalRepeatPassword(true);
                        } else {
                            sessionStorage.setItem("token", "gffsdfvcb1fsfdsfgf");
                            dispatch(showButtonExit());
                            navigate("/personal_area");
                        }
                        resetForm();
                        setResRegex((prevState) => ({ ...prevState, password: true, email: true }));
                        setEmptyFields([]);
                        if (isAddCard) {
                            dispatch(setAddCard());
                        }
                    }
                    if (emptyFieldsArray.length > 0) {
                        notifyError("Заповніть обов'язкові поля");
                    } else if (isLogin.phone && (!resultPhone || !resultIsLogin)) {
                        notifyError("Не вірний формат. Введіть телефон у форматі +380939119191");
                    } else if (!resultPassword) {
                        notifyError("У пароля мають бути лише латинські літери, хоча б одна велика літера, та хоча б одна цифра, довжина не менше 10 символів");
                    } else if (isLogin.email && (!resultEmail || !resultIsLogin)) {
                        notifyError("Не вірний формат. Email має бути у форматі angel@gmail.com")
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
                            <button onClick={isShowExit ? deleteToken : showEnterence}>{isShowExit ? 'Вийти' : 'Увійти'}</button>
                        </div>
                        <div className='login__wrap__email'>
                            <Field
                                type="text"
                                id="email"
                                name="email"
                                onChange={(e) => {
                                    handleChange(e);
                                    setEmptyFields((prevFields) => prevFields.filter(field => field !== 'email'));
                                    setResRegex((statePrev) => ({ ...statePrev, email: checkLoginRegex(e.target.value) }));
                                    validateLogin(e.target.value)
                                }}
                                value={values.email}
                                placeholder='Електронна пошта чи телефон*'
                                autoComplete="email"
                                style={{ border: emptyFields.includes('email') || !resRegex.email ? '1px solid #FF5858' : '' }}
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
                                    setResRegex((statePrev) => ({ ...statePrev, password: checkPasswordRegex(e.target.value) }));
                                }}
                                value={values.password}
                                placeholder='Пароль*'
                                autoComplete="password"
                                style={{ border: emptyFields.includes('password') || !resRegex.password ? '1px solid #FF5858' : '' }}
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
                            className={registration && !values.checkbox ? 'login__sumbmit__disabled' : 'login__submit'}
                            disabled={registration && !values.checkbox}
                        >
                            {registration ? 'Створити' : 'Увійти'}
                        </button>
                    </Form>
                )}
            </Formik>
            <ToastContainer />
            {isModalRepeatPassword ? <RepeatPasswordModal closeModal={closeModal} initialValue={password} /> : null}
        </div >
    )
}

export default LoginForm;
