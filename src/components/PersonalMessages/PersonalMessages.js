import './PersonalMessages.scss';

const PersonalMessages = ({ isExit, isEntrance }) => {
    return (
        <div className='personal__messages__wrap'>
            <label>{isEntrance ? 'Вхідні повідомлення' : isExit ? 'Вихідні повідомлення' : 'Архів'}</label>
        </div>
    )
}

export default PersonalMessages;