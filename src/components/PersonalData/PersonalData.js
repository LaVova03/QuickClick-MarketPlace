import "./PersonalData.scss";

const PersonalData = () => {
  return (
    <div className="personal__data__wrap">
      <div>
        <label>Основні дані</label>
      </div>
      <form>
        <div className="personal__data__left__side">
          <input type="text" placeholder="Прізвище, ім’я, по-батькові" />
          <input type="text" placeholder="Населений пункт" />
          <input type="text" placeholder="Номер телефону" />
          <div id="personal__data__btn__wrap">
            <button>Зберегти зміни</button>
            <button>Видалити акаунт</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalData;
