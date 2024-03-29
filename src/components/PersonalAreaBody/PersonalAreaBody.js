import "./PersonalAreaBody.scss";
import React, { useState, useEffect } from "react";
import Plus from "../../assets/personal__area/Plus.png";
import Minus from "../../assets/personal__area/Minus.png";
import Msg from "../../assets/personal__area/msg.png";
import axios from "axios";
import { API_MOCAPI } from "../../constants/Constants";
import WaitingPublicOrRejected from "../WaitingPublicOrRejected/WaitingPublicOrRejected";
import PersonalMessages from "../../components/PersonalMessages/PersonalMessages";
import PersonalData from "../PersonalData/PersonalData";

const PersonalAreaBody = () => {
  const [isList, setIsList] = useState({
    isOpen1: false,
    isOpen2: false,
    isOpen3: false,
  });

  const [isPart, setPart] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
  });
  const [isIdCard, setIdCard] = useState("");
  const [isPutModal, setPutModal] = useState(false);
  const [isPutData, setPutData] = useState(null);
  const [isData, setData] = useState([]);
  const [isLoading, setLoading] = useState({
    active: false,
    putModal: false,
  });

  const [isCategory, addCategory] = useState("");

  useEffect(() => {
    fetchGetIdGoods(isIdCard);
  }, [isIdCard, isData.length]);

  useEffect(() => {
    if (isList.isOpen3) {
      setPart({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
      });
    }
  }, [isList]);

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
      }));
    }
    if (list2) {
      setPart((prev) => ({
        ...prev,
        four: false,
        five: false,
        six: false,
      }));
    }
  }, [isList]);

  const fetchGetGoods = async () => {
    setLoading((prev) => ({
      ...prev,
      active: !prev.active,
    }));
    try {
      const { data } = await axios.get(`${API_MOCAPI}/Goods`);
      if (data.length === 0) {
        setData(null);
      } else {
        setData(data);
      }
    } catch {
      console.log("fetch data GET cards error");
    } finally {
      setLoading((prev) => ({
        ...prev,
        active: !prev.active,
      }));
    }
  };

  const fetchGetIdGoods = async (id) => {
    try {
      setLoading((prev) => ({
        ...prev,
        putModal: !prev,
      }));
      const { data } = await axios.get(`${API_MOCAPI}/Goods/${id}`);
      setPutData(data);
    } catch {
      console.log("fetch data GET cards error");
    } finally {
      setLoading((prev) => ({
        ...prev,
        putModal: !prev,
      }));
    }
  };

  const fetchPutGoods = async (id) => {
    try {
      await axios.put(`${API_MOCAPI}/Goods/${id}`, isPutData);
      await fetchGetGoods();
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

  const setPersonalData = () => {
    addCategory("");
    setIsList((prev) => ({
      ...prev,
      isOpen3: !prev.isOpen3,
    }));
  };

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
              onClick={() => changeList("1")}
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
                  setCategory("one");
                  fetchGetGoods();
                }}
                className={`personal__part${isPart.one ? "__green" : ""}`}
              >
                Активні
              </button>
            </li>
            <li>
              <button
                onClick={() => setCategory("two")}
                className={`personal__part${isPart.two ? "__green" : ""}`}
              >
                Очікують публікації
              </button>
            </li>
            <li>
              <button
                onClick={() => setCategory("three")}
                className={`personal__part${isPart.three ? "__green" : ""}`}
              >
                Відхилені
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
              onClick={() => changeList("2")}
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
                onClick={() => setCategory("four")}
                className={`personal__part${isPart.four ? "__green" : ""}`}
              >
                Вхідні
              </button>
            </li>
            <li>
              <button
                onClick={() => setCategory("five")}
                className={`personal__part${isPart.five ? "__green" : ""}`}
              >
                Вихідні
              </button>
            </li>
            <li>
              <button
                onClick={() => setCategory("six")}
                className={`personal__part${isPart.six ? "__green" : ""}`}
              >
                Архів
              </button>
            </li>
          </ul>
        </li>
        <li>
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
              onClick={() => setPersonalData()}
            >
              <img src={!isList.isOpen3 ? Plus : Minus} alt="logo" />
            </button>
          </label>
        </li>
      </ul>
      <div className="personal__center__img">
        {isLoading.active ? (
          <div id="personal__loading__active">Loading...</div>
        ) : isCategory === "one" && isList.isOpen1 ? (
          <WaitingPublicOrRejected
            isActive
            isData={isData}
            setIdCard={setIdCard}
            setPutModal={setPutModal}
          />
        ) : isCategory === "two" && isList.isOpen1 ? (
          <WaitingPublicOrRejected isWaiting />
        ) : isCategory === "three" && isList.isOpen1 ? (
          <WaitingPublicOrRejected />
        ) : isCategory === "four" && isList.isOpen2 ? (
          <PersonalMessages isEntrance />
        ) : isCategory === "five" && isList.isOpen2 ? (
          <PersonalMessages isExit />
        ) : isCategory === "six" && isList.isOpen2 ? (
          <PersonalMessages />
        ) : isList.isOpen3 ? (
          <PersonalData />
        ) : (
          <img src={Msg} alt="logo" />
        )}
      </div>
      {isPutModal && (
        <>
          {isPutModal && (
            <div className="personal__put__modal">
              {isLoading.putModal ? (
                <div id="personal__loading">Loading...</div>
              ) : (
                <>
                  <button
                    id="personal__x__btn"
                    onClick={() => setPutModal(false)}
                  ></button>
                  <ul>
                    {isPutData &&
                      typeof isPutData === "object" &&
                      Object.keys(isPutData).map(
                        (key) =>
                          key !== "id" &&
                          key !== "ProductId" &&
                          key !== "Category" && (
                            <li key={key}>
                              <strong>{String(key)}: </strong>
                              {key === "Currency" ? (
                                <select
                                  id="personal__edit__select"
                                  value={isPutData[key]}
                                  onChange={(e) => {
                                    setPutData((prevState) => ({
                                      ...prevState,
                                      [key]: e.target.value,
                                    }));
                                  }}
                                >
                                  <option value="грн">грн</option>
                                  <option value="usd">usd</option>
                                </select>
                              ) : (
                                <>
                                  <div>"{String(isPutData[key])}"</div>
                                  <input
                                    type="text"
                                    placeholder={key}
                                    value={isPutData[key]}
                                    onChange={(e) => {
                                      setPutData((prevState) => ({
                                        ...prevState,
                                        [key]: e.target.value,
                                      }));
                                    }}
                                  />
                                </>
                              )}
                            </li>
                          )
                      )}
                  </ul>
                  <button
                    onClick={() => {
                      fetchPutGoods(isIdCard);
                      setPutModal(false);
                    }}
                  >
                    Редагувати
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PersonalAreaBody;
