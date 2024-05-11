import './MainBurgerMenu.scss';
import { useNavigate } from 'react-router-dom';
import FetchLogout from '../Fetches/LoginPage/FetchLogOut';

const MainBurgerMenu = ({ isFlagSet, handleButtonClick, setLogin }) => {
    const navigate = useNavigate();

    const deleteToken = () => {
        FetchLogout();
        navigate("/");
        setLogin(false);
    };

    return (
        <div className={!isFlagSet ? 'main__burgermenu__close' : 'main__burgermenu__wrap'}>
            <ul>
                <li><button onClick={handleButtonClick}>
                    Про нас
                </button></li>
                <li><button onClick={handleButtonClick}>
                    Контакти
                </button></li>
                <li><button onClick={handleButtonClick}>
                    Оплата та доставка
                </button></li>
                <li><button onClick={handleButtonClick}>
                    Питання та відповіді
                </button></li>
                <li><button onClick={handleButtonClick}>
                    Умови використання
                </button></li>
                <li><button onClick={() => {
                    navigate("/personal_area");
                    handleButtonClick();
                }}>
                    Особистий кабінет
                </button></li>
                <li><button onClick={() => {
                    handleButtonClick();
                    deleteToken();
                }}>
                    Вийти
                </button></li>
            </ul>
        </div >
    )
}

export default MainBurgerMenu;
