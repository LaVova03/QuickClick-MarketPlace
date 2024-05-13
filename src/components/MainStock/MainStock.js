import styles from './MainStock.module.scss';
import React from 'react';
import Img1 from '../../assets/main__сards/newcar.png';
import Img2 from '../../assets/main__сards/armchair.png';
import Img3 from '../../assets/main__сards/sofa.png';
import Img4 from '../../assets/main__сards/flat.png';
import Img5 from '../../assets/main__сards/nut.png';

const MainStock = () => {

    const arr = [
        {
            img: Img1,
            chapter: 'Opel Zefira',
            price: '$ 13,000',
            priceRed: '$ 15, 000',
        },
        {
            img: Img2,
            chapter: 'Кресло мішок',
            price: '₴ 1,000',
            priceRed: '₴ 1,500',
        },
        {
            img: Img3,
            chapter: 'Крісло-кровать',
            price: '₴ 15,000',
            priceRed: '₴ 16,000',
        },
        {
            img: Img4,
            chapter: 'Квартира Поділ',
            price: '$ 113,000',
            priceRed: '$ 115, 000',
        },
        {
            img: Img5,
            chapter: 'Грецький горіх',
            price: '₴ 200',
            priceRed: '₴ 250',
        },
    ];

    const randomItems = arr.sort(() => 0.5 - Math.random()).slice(0, 5);

    return (
        <div className={styles.main__stock__wrap}>
            <label>Ціну знижено</label><br />
            <div>
                {randomItems.map((el, i) => (
                    <ul key={i}>
                        <li>
                            <img className={styles.recom_img} src={el.img} alt='logo' />
                        </li>
                        <li>
                            <span id={styles.main__stock__span1}>{el.chapter}</span>
                        </li>
                        <li className={styles.main__wrap__prices}>
                            <div id={styles.main__stock__span2}>{el.price}</div>
                            <div id={styles.main__stock__span3}>{el.priceRed}</div>
                        </li>
                        <button>Дивитися</button>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default MainStock;