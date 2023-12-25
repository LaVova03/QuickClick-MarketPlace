import './MainHeader.scss';
import Heart from '../../assets/heart.png';
import User from '../../assets/user.png';

const MainHeader = () => {
    return (
        <div className='MainHeader__wrapp'>
            <div className='main__header__wrapleft'>
                <div className="burger-icon" id="burger-icon">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className='main__headre__greentext'>
                    <span className='main__header__word'>Q</span>uick<span className='main__header__word'>C</span>lick<span className='main__header__word'>_</span>
                </div>
            </div>
            <div className='main__headre__center'>
                <input type="text" />
                <button >
                    <span>Пошук <div></div></span>
                </button>
            </div>
            <div className='main__headre__right'>
                <button><img src={Heart} alt="logo" /></button>
                <button><img src={User} alt="logo" /></button>
                <button>Додати оголошенняы</button>
            </div>
        </div>
    )
}

export default MainHeader;