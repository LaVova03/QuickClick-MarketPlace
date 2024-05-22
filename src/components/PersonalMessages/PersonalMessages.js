import './PersonalMessages.scss';
import ChatAll from '../ChatAll/ChatAll';

const PersonalMessages = ({ isExit, isEntrance, isArchive }) => {
    return (
        <div className='personal__messages__wrap'>
            <label>{isEntrance ? 'Вхідні повідомлення' : isExit ? 'Вихідні повідомлення'
                : isArchive ? 'Архів' : null}</label>
            {isEntrance ? <ChatAll /> : null}

        </div>
    )
}

export default PersonalMessages;