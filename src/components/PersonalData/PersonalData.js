import "./PersonalData.scss";
import React, { useRef, useState } from "react";

const PersonalData = () => {

  const fileInputRefs = {
    photo: useRef(null),
  };

  const [isPhoto, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  const handleButtonClick = (fileInputRef) => {
    fileInputRef.current.click();
  };

  return (
    <div className="personal__data__wrap">
      <form>
        <div>
          <label>Основні дані</label>
          <div id="wrap_person">
            {isPhoto ?
              <div className="wrap__personal__photo">
                <img className='add__personal__photo'
                  src={URL.createObjectURL(isPhoto)}
                  alt="logo" />
                <button
                  className='add__personal__backet'
                  onClick={() => deletePhoto()}
                />
              </div>
              :
              <>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRefs.photo}
                  onChange={(e) => handleFileChange(e)}
                />
                <button id="set__photo__personal"
                  onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick(fileInputRefs.photo)
                  }}

                />
              </>
            }
          </div>

          <div className="personal__data__left__side">
            <input type="text" placeholder="Ім’я" />
            <input type="text" placeholder="Номер телефону" />
            <input type="text" placeholder="Змінити телефон*" />
            <div id="personal__data__btn__wrap">
              <button>Зберегти зміни</button>
              <button>Видалити акаунт</button>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label>Зміна паролю</label>
            <input type="text" placeholder="Старий пароль*" />
            <input type="text" placeholder="Новий пароль*" />
            <input type="text" placeholder="Повторіть пароль*" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalData;
