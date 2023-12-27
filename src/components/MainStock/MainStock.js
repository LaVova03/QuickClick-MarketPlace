import './MainStock.scss';
import Img1 from '../../assets/MainCards/car.png';
import Img2 from '../../assets/MainCards/armchair.png';
import Img3 from '../../assets/MainCards/sofa.png';
import Img4 from '../../assets/MainCards/flat.png';
import Img5 from '../../assets/MainCards/nut.png';

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
            price: 'UAH 1,000',
            priceRed: 'UAH 1,500',
        },
        {
            img: Img3,
            chapter: 'Крісло-кровать',
            price: 'UAH 15,000',
            priceRed: 'UAH 16,000',
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
            price: 'UAH 200',
            priceRed: 'UAH 250',
        },
    ]

    return (
        <div className='MainStock__wrap'>
            <label>Акції</label><br />
            <div>
                {arr.map((el, i) => (
                    <ul key={i}>
                        <li>
                            <img src={el.img} alt='logo' />
                        </li>
                        <li>
                            <span id='main__stock__span1'>{el.chapter}</span>
                        </li>
                        <li className='main__wrap__prices'>
                            <div id='main__stock__span2'>{el.price}</div>
                            <div id='main__stock__span3'>{el.priceRed}</div>
                        </li>
                        <button>Дивитися</button>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default MainStock;