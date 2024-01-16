import './MainRightSide.scss';
import React from 'react';
import Img1 from '../../assets/mainRightSide/image 2.png';
import Img2 from '../../assets/mainRightSide/image 2 (1).png';
import Img3 from '../../assets/mainRightSide/image 2 (2).png';
import Img4 from '../../assets/mainRightSide/image 2 (3).png';
import Img5 from '../../assets/mainRightSide/image 2 (4).png';
import Img6 from '../../assets/mainRightSide/image 2 (5).png';
import Img7 from '../../assets/mainRightSide/image 2 (6).png';

const MainRightSide = () => {

    const arr = [
        {
            img: Img1,
            chapter: 'Відкритий новий магазин',
        },
        {
            img: Img2,
            chapter: 'Зменшено ціну',
        },
        {
            img: Img3,
            chapter: 'Акції в магазині сантехніки “Акт”',
        },
        {
            img: Img4,
            chapter: 'Акції в магазині сантехніки “Малюк”',
        },
        {
            img: Img5,
            chapter: 'Відкритий новий магазин',
        },
        {
            img: Img6,
            chapter: 'Відкритий новий магазин',
        },
        {
            img: Img7,
            chapter: 'Зменшено ціну',
        },
    ]

    return (
        <div className='main__rightside__wrap'>
            <div className='main__rigrtside__card'>
                {arr.map((el, i) => (
                    <ul key={i}>
                        {Object.keys(el).map((item, j) => (
                            <li key={j}>
                                {item === 'img' ? (
                                    <img src={el[item]} alt='logo' />
                                ) : (
                                    <span>
                                        {el[item]} <button>Дивитися</button>
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )
                )}
            </div>
        </div >
    )
}

export default MainRightSide;