import styles from './Information.module.scss';
import InformBody from '../../components/InformBody/InformBody';
import MainLeftSide from '../../components/MainLeftSide/MainLeftSide';

const Information = () => {
    return (
        <div className={styles.information_wrap}>
            <InformBody />
            <MainLeftSide />
        </div>
    )
}

export default Information;