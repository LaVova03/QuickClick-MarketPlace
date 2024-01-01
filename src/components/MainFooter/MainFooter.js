import './MainFooter.scss';

const MainFooter = () => {
    return (
        <div className='main__footer__wrap'>
            <div className='main__footer__logo'>
                <span className='main__footer__word'>Q</span>uick<span className='main__footer__word'>C</span>lick<span className='main__footer__word'>_</span>
            </div>
            <div className='main__footer__center'>
                <ul>
                    <li>Контакти:</li>
                    <li>Зворотній зв’язок</li>
                    <li>Пн - Нд: 08:00 - 20:00</li>
                    <li>+38 (096) 044 95 95</li>
                    <li>+38 (050) 044 95 95</li>
                    <li>contactus@quickclick.ua</li>
                </ul>
                <ul>
                    <li>Розділи:</li>
                    <li><button>Про нас</button></li>
                    <li><button>Контакти</button></li>
                    <li><button>Оплата і доставка</button></li>
                    <li><button>Питання та відповіді</button></li>
                    <li><button>Умови використання</button></li>
                </ul>
            </div>
            <div className='main__footer__right'>
                <ul>
                    <li>Наші акаунти:
                        <div>
                            <button className='main__footer__ut' />
                            <button className='main__footer__fb' />
                            <button className='main__footer__inst' />
                        </div>
                    </li>
                </ul><br /><br /><br /><br /><br /><br /><br />
                <div className='main__footer__lable'>© 2023 QuickClick Усі права<br />захищені</div>
            </div>
        </div>
    )
}

export default MainFooter;