import './WaitingPublicOrRejected.scss';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setEditWindow } from '../../redux/Main/actions';

const WaitingPublicOrRejected = ({ isWaiting, isActive, setIdCard }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const isData = useSelector(state => state.myReducer2?.isData);

    const addLocalstorage = (id) => {
        localStorage.removeItem('setIdCard');
        localStorage.setItem('setIdCard', id);
    }

    return (
        <div className='personal__category__wrap'>
            <label>{isActive ? 'Ваші активні оголошення' : isWaiting ? 'Очікують публікації' : 'Відхилені публікації'}</label>
            {isActive ?
                <>
                    {isData?.map((el) => {
                        return (
                            <ul key={el.id} >
                                <li><img src={el.imageSrc} alt="logo" /></li>
                                <li>{el.description}</li>
                                <li>{el.currency}</li>
                                <li>{el.firstPrice}</li>
                                <li><button>Переглянути</button></li>
                                <li><button onClick={() => {
                                    setIdCard(el.id);
                                    addLocalstorage(el.id)
                                    dispatch(setEditWindow());
                                    navigate("/edit_card");
                                }}>
                                    Редагувати</button></li>
                            </ul>
                        )
                    })}
                </>
                : null}
        </div >
    )
}

export default WaitingPublicOrRejected;