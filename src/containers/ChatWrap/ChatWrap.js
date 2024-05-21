import styles from './ChatWrap.module.scss';
import PersonalMessages from '../../components/PersonalMessages/PersonalMessages';

const ChatWrap = () => {
    return (
        <div className={styles.chat_wrap}>
            <PersonalMessages />
        </div>
    )
}

export default ChatWrap;