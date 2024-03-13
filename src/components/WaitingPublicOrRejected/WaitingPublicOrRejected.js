import './WaitingPublicOrRejected.scss';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setEditWindow } from '../../redux/Main/actions';

const WaitingPublicOrRejected = ({ isWaiting, isActive, isData, setIdCard }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    return (
        <div className='personal__category__wrap'>
            <label>{isActive ? 'Ваші активні оголошення' : isWaiting ? 'Очікують публікації' : 'Відхилені публікації'}</label>
            {isActive ?
                <>
                    {isData.map((el) => {
                        return (
                            <ul key={el.id} >
                                <li><img src={el.imageSrc} alt="logo" /></li>
                                <li>{el.Description}</li>
                                <li>{el.Price}</li>
                                <li>{el.Currency}</li>
                                <li><button>Переглянути</button></li>
                                <li><button onClick={() => {
                                    setIdCard(el.id);
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