import './MainViewed.scss';
import React from 'react';
import Img1 from '../../assets/MainCards/car.png';
import Img2 from '../../assets/MainCards/armchair.png';
import Img3 from '../../assets/MainCards/sofa.png';
import Img4 from '../../assets/MainCards/flat.png';
import Img5 from '../../assets/MainCards/nut.png';

const MainViewed = () => {

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

    return (
        <div className='MainViewed__wrap'>
            <label>Переглянуті товари</label><br />
            <div>
                {randomItems.map((el, i) => (
                    <ul key={i}>
                        <li>
                            <img src={el.img} alt='logo' />
                        </li>
                        <li>
                            <span id='main__viewed__span1'>{el.chapter}</span>
                        </li>
                        <li className='main__viewed__prices'>
                            <div id='main__viewed__span2'>{el.price}</div>
                        </li>
                        <button>Дивитися</button>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default MainViewed;