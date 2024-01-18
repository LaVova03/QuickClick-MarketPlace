import './MainBurgerMenu.scss';
import React from 'react';

const MainBurgerMenu = ({ isFlagSet }) => {
    return (
        <div className={!isFlagSet ? 'main__burgermenu__close' : 'main__burgermenu__wrap'}>
            <ul>
                <li><button>Про нас</button></li>
                <li><button>Контакти</button></li>
                <li><button>Оплата та доставка</button></li>
                <li><button>Питання та відповіді</button></li>
                <li><button>Умови використання</button></li>
            </ul>
        </div>
    )
}

export default MainBurgerMenu;