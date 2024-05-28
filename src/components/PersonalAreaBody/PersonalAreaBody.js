import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PersonalAreaBody.scss";
import React, { useState, useEffect } from "react";
import { Outlet, Link } from 'react-router-dom';
import Plus from "../../assets/personal__area/Plus.png";
import Minus from "../../assets/personal__area/Minus.png";
import Msg from "../../assets/personal__area/msg.png";
import WaitingPublicOrRejected from "../WaitingPublicOrRejected/WaitingPublicOrRejected";
import PersonalMessages from "../../components/PersonalMessages/PersonalMessages";
import PersonalData from "../PersonalData/PersonalData";
import fetchActiveStunneds from '../Fetches/Stunneds/FetchActive';
import AllPersonAdverts from '../Fetches/Stunneds/AllPersonAdverts';
import { useDispatch, useSelector } from 'react-redux';
import { setData, showSuccessfulModal } from '../../redux/AddEdit/actions';
import { useNavigate } from 'react-router-dom';
import FetchLogout from '../Fetches/LoginPage/FetchLogOut';

const PersonalAreaBody = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tokenBearer = sessionStorage.getItem('login');
  const isSuccessfulWindow = useSelector(state => state.myReducer2?.isSuccessfulWindow);
  const localStorageDelete = localStorage.getItem('delete');
  const isDeletee = localStorage.getItem('isDelete');
  const chapter = localStorage.getItem('chapter');
  const part = sessionStorage.getItem('part');

  const [isList, setIsList] = useState({
    isOpen1: false,
    isOpen2: false,
    isOpen3: false,
    isOpen4: false,
  });

  const [isPart, setPart] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
  });
  const [isIdCard, setIdCard] = useState("");
  const [isLoading, setLoading] = useState({
    active: false,
    putModal: false,
  });

  const [isCategory, addCategory] = useState("");

  useEffect(() => {
    if (isList.isOpen3) {
      setPart({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
      });
    }
  }, [isList]);

  useEffect(() => {
    if (isIdCard) {
      changeData(isIdCard);
      setIdCard("");
    }

  }, [isIdCard])

  //закрываем подкатегории при закрытии категории
  useEffect(() => {
    const list1 = Object.keys(isList).some(
      (key) => key === "isOpen1" && isList[key] === false
    );
    const list2 = Object.keys(isList).some(
      (key) => key === "isOpen2" && isList[key] === false
    );
    if (list1) {
      setPart((prev) => ({
        ...prev,
        one: false,
        two: false,
        three: false,
        four: false,
      }));
    }
    if (list2) {
      localStorage.removeItem('chapter');
      setPart((prev) => ({
        ...prev,
        five: false,
        six: false,
        seven: false,
      }));
    }
  }, [isList]);

  useEffect(() => {
    // console.log(isSuccessfulWindow, localStorageDelete)
    if (isSuccessfulWindow && localStorageDelete) {
      notifyError('Оголошення видалено.')
      setTimeout(() => {
        dispatch(showSuccessfulModal())
      }, 0)
      localStorage.removeItem('delete');
    }
  }, [isSuccessfulWindow, localStorageDelete, dispatch, isDeletee])

  const fetchGetGoods = async (part) => {
    setLoading((prev) => ({
      ...prev,
      active: !prev.active,
    }));
    try {
      AllPersonAdverts(setData, dispatch, tokenBearer, part);
    } catch {
      console.log("fetch data GET cards error");
    } finally {
      setLoading((prev) => ({
        ...prev,
        active: !prev.active,
      }));
    }
  };

  const changeData = async (id) => {
    try {
      await fetchActiveStunneds(id);
    } catch {
      console.log("fetch data PUT cards error");
    }
  };

  const changeList = (key) => {
    setIsList((prev) => ({
      ...prev,
      [`isOpen${key}`]: !prev[`isOpen${key}`], //открыть список
    }));

    //если все главы закрыты, то закрыть вложенные списки
    const containsTrue = Object.values(isList).every(
      (value) => value === false
    );
    if (containsTrue) {
      for (let key in isPart) {
        if (isPart[key] === true) {
          setPart((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
          }));
        }
      }
      //очистить категорию, чтоб появилась картинка на экране
      setCategory("");
    }
  };

  //открыть или закрыть подкатегорию
  const setCategory = (num) => {
    if (num && isList.isOpen3) {
      //закрыть последнюю главу, если открыта какая-то подкатегория выше
      setPersonalData();
    }
    addCategory(num);
    for (let key in isPart) {
      // при выборе подкатегории, сначала закрываем все
      if (isPart[key] === true) {
        setPart((prevState) => ({
          ...prevState,
          [key]: !prevState[key],
        }));
      }
    }
    setPart((prevState) => ({
      // при выборе подкатегории, открываем нужную подкатегорию
      ...prevState,
      [num]: !prevState[num],
    }));
  };

  useEffect(() => {
    if (part === 'inbox_messages') {
      setCategory("five");
      setIsList(prev => ({
        ...prev,
        isOpen2: true,
      }));
    }
  }, [chapter, part])

  const setPersonalData = () => {
    addCategory("");
    setIsList((prev) => ({
      ...prev,
      isOpen3: !prev.isOpen3,
    }));
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };

  const LogOut = () => {
    FetchLogout();
    navigate("/");
  }

  return (
    <div className="PersonalAreaBody__wrap">
      <div>
        <div>
          <label>Оголошення</label>
        </div>
        <br />
      </div>
      <ul className="personal__main__ul">
        <li>
          <label
            className={
              !isList.isOpen1
                ? "personal__color__black"
                : "personal__color__green"
            }
          >
            Оголошення
            <button
              className="personal__bnt__plus"
              onClick={() => {
                if (isList.isOpen1) {
                  sessionStorage.removeItem('part');
                  localStorage.removeItem('chapter');
                  localStorage.setItem('chapter', 'adverts');
                } else {
                  navigate('/personal_area');
                }
                changeList("1");
              }}
            >
              <img src={!isList.isOpen1 ? Plus : Minus} alt="logo" />
            </button>
          </label>
          <ul
            className={
              !isList.isOpen1
                ? "personal__colum__none"
                : "personal__colum__block"
            }
          >
            <li>
              <button
                onClick={() => {
                  sessionStorage.removeItem('part');
                  sessionStorage.setItem('part', 'active');
                  setCategory("one");
                  fetchGetGoods("active");
                }}
                className={`personal__part${isPart.one ? "__green" : ""}`}
              >
                Активні
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  sessionStorage.removeItem('part');
                  sessionStorage.setItem('part', 'waiting_public');
                  setCategory("two");
                }}
                className={`personal__part${isPart.two ? "__green" : ""}`}
              >
                Очікують публікації
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  sessionStorage.removeItem('part');
                  sessionStorage.setItem('part', 'cancelled');
                  setCategory("three");
                }}
                className={`personal__part${isPart.three ? "__green" : ""}`}
              >
                Відхилені
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  sessionStorage.removeItem('part');
                  sessionStorage.setItem('part', 'archive');
                  setCategory("four");
                  fetchGetGoods("archive");
                }}
                className={`personal__part${isPart.four ? "__green" : ""}`}
              >
                Архів оголошень
              </button>
            </li>
          </ul>
        </li>
        <li>
          <label
            className={
              !isList.isOpen2
                ? "personal__color__black"
                : "personal__color__green"
            }
          >
            Повідомлення
            <button
              className="personal__bnt__plus"
              onClick={() => {
                if (isList.isOpen2) {
                  sessionStorage.removeItem('part');
                  localStorage.removeItem('chapter');
                  localStorage.setItem('chapter', 'messages');
                } else {
                  navigate('/personal_area');
                }
                changeList("2");
              }}
            >
              <img src={!isList.isOpen2 ? Plus : Minus} alt="logo" />
            </button>
          </label>
          <ul
            className={
              !isList.isOpen2
                ? "personal__colum__none"
                : "personal__colum__block"
            }
          >
            <li>
              <button
                onClick={() => {
                  sessionStorage.removeItem('part');
                  sessionStorage.setItem('part', 'inbox_messages');
                  setCategory("five");
                }}
                className={`personal__part${isPart.five ? "__green" : ""}`}
              >
                <Link className="link_none" to="chat">Вхідні</Link>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  sessionStorage.removeItem('part');
                  sessionStorage.setItem('part', 'outgoing_messages');
                  setCategory("six");
                }}
                className={`personal__part${isPart.six ? "__green" : ""}`}
              >
                Вихідні
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  sessionStorage.removeItem('part');
                  sessionStorage.setItem('part', 'archive_messages');
                  setCategory("seven");
                }}
                className={`personal__part${isPart.seven ? "__green" : ""}`}
              >
                Архів
              </button>
            </li>
          </ul>
        </li>
        <li id="personal__btn__data">
          <label
            className={
              !isList.isOpen3
                ? "personal__color__black"
                : "personal__color__green"
            }
          >
            Особисті дані
            <button
              className="personal__bnt__plus"
              onClick={() => {
                if (isList.isOpen3) {
                  localStorage.removeItem('chapter');
                  localStorage.setItem('chapter', 'personal_data');
                } else {
                  sessionStorage.removeItem('part');
                  navigate('/personal_area');
                }
                setPersonalData();
              }}
            >
              <img src={!isList.isOpen3 ? Plus : Minus} alt="logo" />
            </button>
          </label>
        </li>
        <li>
          <label
            id="personal__btn__exit"
            className="personal__color__black"
          >
            Вихід
            <button
              className="personal__bnt__plus"
              onClick={() => LogOut()}
            >
            </button>
          </label>
        </li>
      </ul >
      <div className="personal__center__img">
        {isLoading.active ? (
          <div id="personal__loading__active">Loading...</div>
        ) : isCategory === "one" && isList.isOpen1 ? (
          <WaitingPublicOrRejected
            isActive
            setIdCard={setIdCard}
          />
        ) : isCategory === "two" && isList.isOpen1 ? (
          <WaitingPublicOrRejected isWaiting />
        ) : isCategory === "three" && isList.isOpen1 ? (
          <WaitingPublicOrRejected />
        ) : isCategory === "four" && isList.isOpen1 ? (
          <WaitingPublicOrRejected
            isArchive
            setIdCard={setIdCard}
          />
        ) : isCategory === "five" && isList.isOpen2 ? (
          <PersonalMessages isEntrance />
        ) : isCategory === "six" && isList.isOpen2 ? (
          <PersonalMessages isExit />
        ) : isCategory === "seven" && isList.isOpen2 ? (
          <PersonalMessages isArchive />
        ) : isList.isOpen3 ? (
          <PersonalData />
        ) : (
          <img className="personal__center__man" src={Msg} alt="logo" />
        )}
      </div>
      <ToastContainer
        style={{ position: 'fixed', right: '0 !important', width: 'max-content' }}
      />
      <Outlet isActive setIdCard={setIdCard} isWaiting isArchive />
    </div >
  );
};

export default PersonalAreaBody;
