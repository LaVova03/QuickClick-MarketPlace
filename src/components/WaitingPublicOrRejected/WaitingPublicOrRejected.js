import './WaitingPublicOrRejected.scss';

const WaitingPublicOrRejected = ({ isWaiting, isActive, isData, setIdCard, setPutModal }) => {
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
                                    setPutModal(true);
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