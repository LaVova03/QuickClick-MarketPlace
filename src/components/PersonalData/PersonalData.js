import "./PersonalData.scss";

const PersonalData = () => {
  return (
    <div className="personal__data__wrap">
      <div>
        <label>Основні дані</label>
        <label>Зміна паролю</label>
      </div>
      <form>
        <div className="personal__data__left__side">
          <input type="text" placeholder="Прізвище, ім’я, по-батькові" />
          <input type="text" placeholder="Номер відділення Нової пошти" />
          <input type="text" placeholder="Основний номер телефону" />
          <input type="text" placeholder="Додатковий номер телефону" />
          <div id="personal__data__btn__wrap">
            <button>Зберегти зміни</button>
            <button>Видалити акаунт</button>
          </div>
        </div>
        <div className="personal__data__right__side">
          <input type="text" placeholder="Змінити пароль*" />
          <input type="text" placeholder="Повторіть пароль*" />
        </div>
      </form>
    </div>
  );
};

export default PersonalData;
