import './PersonalDelivery.scss';

const PersonalDelivery = ({ isTrack }) => {
    return (
        <div className='personal__payment__wrap'>
            <label>{isTrack ? 'Відслідкувати' : 'Архів'}</label>
        </div>
    )
}

export default PersonalDelivery;