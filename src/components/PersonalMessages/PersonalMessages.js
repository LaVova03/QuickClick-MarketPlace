import './PersonalMessages.scss';

const PersonalMessages = ({ isExit, isEntrance, isArchive }) => {
    return (
        <div className='personal__messages__wrap'>
            <label>{isEntrance ? 'Вхідні повідомлення' : isExit ? 'Вихідні повідомлення'
                : isArchive ? 'Архів' : null}</label>
        </div>
    )
}

export default PersonalMessages;