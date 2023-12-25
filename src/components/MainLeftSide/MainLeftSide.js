import './MainLeftSide.scss';
import Car from '../../assets/leftSide/car.png';
import Beauty from '../../assets/leftSide/beauty.png';
import Coach from '../../assets/leftSide/coach.png';
import Delivery from '../../assets/leftSide/delivery.png';
import Dish from '../../assets/leftSide/dish.png';
import Dog from '../../assets/leftSide/dog.png';
import Flower from '../../assets/leftSide/flower.png';
import Garden from '../../assets/leftSide/garden.png';
import Job from '../../assets/leftSide/job.png';
import Key from '../../assets/leftSide/key.png';
import Rent from '../../assets/leftSide/rent.png';
import Shirt from '../../assets/leftSide/shirt.png';
import Techn from '../../assets/leftSide/techn.png';
import Toy from '../../assets/leftSide/toy.png';

const MainLeftSide = () => {

    const arr = [
        {
            img: Car,
            chapter: 'Авто',
        },
        {
            img: Shirt,
            chapter: 'Одяг',
        },
        {
            img: Flower,
            chapter: 'Квіти',
        },
        {
            img: Toy,
            chapter: 'Играшки',
        },
        {
            img: Dog,
            chapter: 'Тварини',
        },
        {
            img: Key,
            chapter: 'Житло',
        },
        {
            img: Coach,
            chapter: 'Меблі',
        },
        {
            img: Garden,
            chapter: 'Рослини',
        },
        {
            img: Dish,
            chapter: 'Посуд',
        },
        {
            img: Techn,
            chapter: 'Техніка',
        },
        {
            img: Job,
            chapter: 'Робота',
        },
        {
            img: Beauty,
            chapter: 'Краса',
        },
        {
            img: Rent,
            chapter: 'Оренда',
        },
        {
            img: Delivery,
            chapter: 'Доставка',
        },
    ]

    return (
        <div className='MainLeftSide__wrap'>
            <div className='main__leftside__border'>
                {arr.map((el, i) => {
                    return (
                        <ul key={i}>
                            {Object.keys(el).map((key, j) => (
                                <li key={j}>
                                    {key === 'chapter' ? <div className='main__leftside__text'>{el[key]}</div> :
                                        <button className='main__leftside__logo'><img src={el[key]} alt='logo' /></button>}
                                </li>
                            ))}
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}

export default MainLeftSide;