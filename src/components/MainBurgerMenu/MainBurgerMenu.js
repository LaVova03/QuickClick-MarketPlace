import './MainBurgerMenu.scss';
import { useNavigate } from 'react-router-dom';
import FetchLogout from '../Fetches/LoginPage/FetchLogOut';
import { useSelector, useDispatch } from 'react-redux';
import { setBurgerMenu, setLanguage, setAddCard, setEditWindow } from '../../redux/Main/actions';

const MainBurgerMenu = ({ isFlagSet, handleButtonClick, setLogin }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = sessionStorage.getItem('login');

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
                    if (login) {
                        navigate("/personal_area");
                    } else {
                        dispatch(setAddCard());
                        sessionStorage.setItem('personal', 'true');
                        navigate("/login");
                    }
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
