import styles from './MainRecommendations.module.scss';
import React from 'react';
// import AllAdverts from '../Fetches/Stunneds/AllAdverts';
import Img1 from '../../assets/main__сards/newcar.png';
import Img2 from '../../assets/main__сards/armchair.png';
import Img3 from '../../assets/main__сards/sofa.png';
import Img4 from '../../assets/main__сards/flat.png';
import Img5 from '../../assets/main__сards/nut.png';

const MainRecommendations = ({ isCard }) => {

    const arr = [
        {
            img: Img1,
            chapter: 'Opel Zefira',
            price: '$ 13,000',
        },
        {
            img: Img2,
            chapter: 'Кресло мішок',
            price: '₴ 1,000',
        },
        {
            img: Img3,
            chapter: 'Крісло-кровать',
            price: '₴ 15,000',
        },
        {
            img: Img4,
            chapter: 'Квартира Поділ',
            price: '$ 113,000',
        },
        {
            img: Img5,
            chapter: 'Грецький горіх',
            price: '₴ 200',
        },
        {
            img: Img1,
            chapter: 'Opel Zefira',
            price: '$ 13,000',
        },
        {
            img: Img2,
            chapter: 'Кресло мішок',
            price: '₴ 1,000',
        },
        {
            img: Img3,
            chapter: 'Крісло-кровать',
            price: '₴ 15,000',
        },
        {
            img: Img4,
            chapter: 'Квартира Поділ',
            price: '$ 113,000',
        },
        {
            img: Img5,
            chapter: 'Грецький горіх',
            price: '₴ 200',
        },
    ];

    const randomItems = arr.sort(() => 0.5 - Math.random()).slice(0, 10);
    const randomItemsCard = arr.sort(() => 0.5 - Math.random()).slice(0, 7);

    // useEffect(()=>{
    //     AllAdverts();
    // })

    return (
        <div className={styles.main__recommendations__wrap}>
            <label>Рекомендації</label><br />
            <div>
                {!isCard ? randomItems.map((el, i) => (
                    <ul key={i}>
                        <li>
                            <img src={el.img} alt='logo' />
                        </li>
                        <li>
                            <span id={styles.main__recommendations__span1}>{el.chapter}</span>
                        </li>
                        <li className={styles.main__recommendations__prices}>
                            <div id={styles.main__recommendations__span2}>{el.price}</div>
                        </li>
                        <button>Дивитися</button>
                    </ul>
                ))
                    :
                    randomItemsCard.map((el, i) => (
                        <ul key={i}>
                            <li>
                                <img src={el.img} alt='logo' />
                            </li>
                            <li>
                                <span id={styles.main__recommendations__span1}>{el.chapter}</span>
                            </li>
                            <li className={styles.main__recommendations__prices}>
                                <div id={styles.main__recommendations__span2}>{el.price}</div>
                            </li>
                            <button>Дивитися</button>
                        </ul>
                    ))
                }
            </div>
        </div>
    )
}

export default MainRecommendations;