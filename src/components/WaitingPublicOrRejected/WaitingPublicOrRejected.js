import './WaitingPublicOrRejected.scss';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setEditWindow } from '../../redux/Main/actions';

const WaitingPublicOrRejected = ({ isWaiting, isActive, setIdCard, isArchive }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const isData = useSelector(state => state.myReducer2?.isData);
    const isArchiveData = useSelector(state => state.myReducer2?.isArchiveData);
    const isFullImages = useSelector(state => state.myReducer2?.isImages);

    const addLocalstorage = (id, index) => {
        localStorage.removeItem('setIdCard');
        localStorage.removeItem('indexCard');
        localStorage.setItem('setIdCard', id);
        localStorage.setItem('indexCard', index);
    }

    return (
        <div className='personal__category__wrap'>
            <label>{isActive ? 'Ваші активні оголошення' : isWaiting ? 'Очікують публікації'
                : isArchive ? 'Архів оголошень'
                    : 'Відхилені публікації'}
            </label>
            {isActive || isArchive ?
                <>
                    {isFullImages && (isActive ? isData : isArchiveData)?.map((el, index) => {
                        return (
                            <ul key={el.id} >
                                <li>
                                    <img
                                        src={isFullImages[index]
                                            && isFullImages[index][0]
                                            && isFullImages[index][0].length > 0 ?
                                            `data:image/*;base64,${isFullImages[index][0]}`
                                            : ''}
                                        alt='logo'
                                    />
                                </li>

                                <li>{el.description}</li>
                                <li>{el.currency}</li>
                                <li>{el.firstPrice}</li>
                                <li><button>Переглянути</button></li>
                                <li><button onClick={() => {
                                    setIdCard(el.id);
                                    addLocalstorage(el.id, index)
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
