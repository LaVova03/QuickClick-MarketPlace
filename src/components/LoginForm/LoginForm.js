import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginForm.scss";
import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { setAddCard, setEditWindow } from "../../redux/Main/actions";
import FetchLogin from '../Fetches/LoginPage/FetchLogin';
import FetchRegistration from '../Fetches/LoginPage/FetchRegistration';

const LoginForm = () => {
  const [isRepeatPassword, setRepeatPassword] = useState("");
  const [registration, setRegistration] = useState(false);
  const [isEye, setIsEye] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [password, setPassword] = useState("");
  const [isShowExit, setIsShowExit] = useState(false);
  const [resRegex, setResRegex] = useState({
    email: true,
    password: true,
  });
  const [isLogin, setIsLogin] = useState({
    phone: false,
    email: false,
  });

  const isAddCardModal = useSelector((state) => state.myReducer?.isAddModal);
  const isEditWindow = useSelector((state) => state.myReducer?.isEditWindow);
  const isTokenBearer = useSelector(state => state.myReducer?.isTokenBearer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAddCardModal) {
      notifyError("Для створення оголошення потрібно зареєструватися");
    }
  }, [isAddCardModal, dispatch]);

  const notifyError = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (isAddCardModal) {
      dispatch(setAddCard());
    }
    navigate("/");
  };

  const HandleClick = (e) => {
    e.preventDefault();
  };

  const showRegistration = (e) => {
    e.preventDefault();
    setRegistration(true);
  };

  const showPassword = () => {
    setIsEye((prevState) => {
      return !prevState;
    });
  };

  const checkPasswordRegex = (password) => {
    if (password.length > 9) {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}|:"<>?[\],.';~`\\/-]+$/;
      return passwordRegex.test(password);
    } else {
      return false;
    }
  };

  const checkLoginRegex = (email) => {
    const phoneRegex = /\+{1}\d{12}/.test(email);
    const emailRegex = /[A-Za-z0-9_-]+@{1}[A-Za-z0-9_-]+/.test(email);
    if (phoneRegex && email.length === 13) {
      return phoneRegex;
    }
    if (emailRegex) {
      return emailRegex;
    }
  };

  const validateLogin = (login) => {
    const isEmail = /^[a-zA-Z0-9=!@#$%^&*()_{}+|:"<>?[\],.';~`\\/-]+$/.test(
      login
    );
    const isPhone = /\+{1}\d+/.test(login);
    if (isEmail) {
      setIsLogin((prevState) => ({
        ...prevState,
        phone: false,
        email: true,
      }));
    } else if (isPhone) {
      setIsLogin((prevState) => ({
        ...prevState,
        email: false,
        phone: true,
      }));
    } else {
      setIsLogin({
        phone: false,
        email: false,
      });
    }
    return isEmail || isPhone;
  };

  const deleteToken = () => {
    sessionStorage.removeItem('login');
    setIsShowExit(false);
  };

  const searchPassword = () => {
    if (password === isRepeatPassword) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (email, password) => {
    if (registration) {
      FetchRegistration(email, password, setIsShowExit, dispatch, isTokenBearer, navigate)
    } else {
      FetchLogin(email, password, setIsShowExit, dispatch, isTokenBearer, navigate);
    }
  };

  return (
    <div className="login__form__wrap">
      <Formik
        initialValues={{
          email: "",
          password: "",
          agree: false,
          remember: false,
        }}
        onSubmit={(values, { resetForm }) => {
          setPassword(values.password);
          const emptyFieldsArray = Object.entries(values)
            .filter(
              ([key, value]) =>
                (key === "email" || key === "password") && !value
            )
            .map(([key]) => key);
          setEmptyFields(emptyFieldsArray);

          if (!isRepeatPassword) {
            setEmptyFields((prevFields) => [...prevFields, "repeat-password"]);
          }

          const resultPassword = checkPasswordRegex(values.password);
          const resultPhone = isLogin.phone
            ? checkLoginRegex(values.email)
            : false;
          const resultEmail = isLogin.email
            ? checkLoginRegex(values.email)
            : false;
          const resultIsLogin = validateLogin(values.email);

          if (
            emptyFieldsArray.length === 0 &&
            resultPassword &&
            (isLogin.phone ? resultPhone : resultEmail)
          ) {
            handleSubmit(values.email, values.password);
            if (isEditWindow) {
              dispatch(setEditWindow());
              navigate("/add_card");
            }
            resetForm();
            setResRegex((prevState) => ({
              ...prevState,
              password: true,
              email: true,
            }));
            setEmptyFields([]);
            setRepeatPassword([]);
            if (isAddCardModal) {
              dispatch(setAddCard());
            }
          }
          if (emptyFieldsArray.length > 0) {
            notifyError("Заповніть обов'язкові поля");
          } else if (isLogin.phone && (!resultPhone || !resultIsLogin)) {
            notifyError(
              "Не вірний формат. Введіть телефон у форматі +380939119191"
            );
          } else if (!resultPassword) {
            notifyError(
              "У пароля мають бути лише латинські літери, хоча б одна велика літера, та хоча б одна цифра, довжина не менше 10 символів"
            );
          } else if (isLogin.email && (!resultEmail || !resultIsLogin)) {
            notifyError(
              "Не вірний формат. Email має бути у форматі angel@gmail.com"
            );
          }

          if (isShowExit) {
            deleteToken();
          }
        }}
      >
        {({ handleSubmit, handleChange, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit} className="login__formik">
            <button
              className="login__btn__back"
              onClick={handleNavigate}
            ></button>
            <button onClick={HandleClick} className="login__btn__google">
              <div className="login__google" />
              Продовжити з Gmail
            </button>
            <span>або</span>
            <div className="login__btn__wrap">
              <button
                className={
                  isShowExit ? "login__btn__desable" : "login__btn__able"
                }
                onClick={showRegistration}
                disabled={isShowExit}
              >
                Зареєструватися
              </button>
              <button
                className={
                  isShowExit ? "login__btn__desable" : "login__btn__able"
                }
                disabled={isShowExit}
                onClick={(e) => {
                  e.preventDefault();
                  setRegistration(false);
                }}
              >
                {isShowExit ? "Вийти" : "Увійти"}
              </button>
            </div>
            <div className="login__wrap__email">
              <Field
                type="text"
                id="email"
                name="email"
                onChange={(e) => {
                  handleChange(e);
                  setEmptyFields((prevFields) =>
                    prevFields.filter((field) => field !== "email")
                  );
                  setResRegex((statePrev) => ({
                    ...statePrev,
                    email: checkLoginRegex(e.target.value),
                  }));
                  validateLogin(e.target.value);
                }}
                value={values.email}
                placeholder="Електронна пошта чи телефон*"
                autoComplete="email"
                style={{
                  border:
                    emptyFields.includes("email") || !resRegex.email
                      ? "1px solid #FF5858"
                      : "",
                }}
              />
            </div>
            <div className="login__wrap__password">
              <Field
                type={!isEye ? "password" : "text"}
                id="password"
                name="password"
                onChange={(e) => {
                  handleChange(e);
                  setPassword(e.target.value);
                  setEmptyFields((prevFields) =>
                    prevFields.filter((field) => field !== "password")
                  );
                  setResRegex((statePrev) => ({
                    ...statePrev,
                    password: checkPasswordRegex(e.target.value),
                  }));
                }}
                value={values.password}
                placeholder="Пароль*"
                autoComplete="password"
                style={{
                  border:
                    emptyFields.includes("password") || !resRegex.password
                      ? "1px solid #FF5858"
                      : "",
                }}
              />
              <button
                type="button"
                onClick={showPassword}
                className={!isEye ? "login__eye__close" : "login__eye__open"}
              ></button>
            </div>
            {registration ? (
              <div className="login__wrap__repeat__password">
                <Field
                  type="text"
                  id="repeat__password"
                  name="repeat__password"
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                    setEmptyFields((prevFields) =>
                      prevFields.filter((field) => field !== "repeat-password")
                    );
                  }}
                  value={isRepeatPassword || ""}
                  placeholder="Повторіть пароль*"
                  autoComplete="repeat__password"
                  style={{
                    border:
                      emptyFields.includes("repeat-password") ||
                        !searchPassword()
                        ? "1px solid #FF5858"
                        : "",
                  }}
                />
              </div>
            ) : null}
            {!registration && !isShowExit ? (
              <div className="login__forgot__pasword">
                <label>
                  <button
                    type="button"
                    name="agree"
                    id="login__forgot__btn"
                    onClick={() => {
                      navigate("/forgot_password");
                    }}
                  >
                    Забули пароль?
                  </button>
                </label>
              </div>
            ) : registration ? (
              <div className="login__checkbox">
                <label>
                  <button
                    className={`checkbox${values.agree ? "__checked" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setFieldValue("agree", !values.agree);
                    }}
                  ></button>
                  Створюючи профіль на QuickQlick, ви погоджуєтеся з умовами
                  використання
                </label>
                <ErrorMessage name="agree" component="div" />
              </div>
            ) : null}
            <label className="login__lbl__remember">
              <button
                className={`checkbox${values.remember ? "__checked" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setFieldValue("remember", !values.remember);
                }}
              ></button>
              Запам’ятати мене
            </label>
            <ErrorMessage name="remember" component="div" />
            <button
              type="submit"
              className={
                registration && !values.agree
                  ? "login__sumbmit__disabled"
                  : "login__submit"
              }
              disabled={registration && !values.agree}
            >
              {registration ? "Створити" : isShowExit ? "Вийти" : "Увійти"}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  )
};

export default LoginForm;
