import './PersonalPayment.scss';

const PersonalPayment = ({ isReceived, isOutgoing }) => {
    return (
        <div className='personal__payment__wrap'>
            <label>{isReceived ? 'Отримані платежі' : isOutgoing ? 'Вихідні платежі' : 'Повернення'}</label>
        </div>
    )
}

export default PersonalPayment;