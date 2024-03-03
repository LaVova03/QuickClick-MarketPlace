import './PlacingAnOrder.scss';
import { useState } from 'react';
import { API_URL, API_KEY } from '../../constants/Constants';

const PlacingAnOrder = ({ setIsAddress, setNewCard }) => {

    const [region, setRegion] = useState([]);
    const [itemRegion, setItemRegion] = useState([]);
    const [city, setCity] = useState([]);
    const [itemCity, setItemCity] = useState([]);
    const [novaPoshta, setNovaPoshta] = useState([]);

    const sendRequestRegion = async () => {
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    apiKey: `${API_KEY}`,
                    modelName: 'Address',
                    calledMethod: 'getAreas',
                    methodProperties: {},
                }),
            });
            const data = await response.json();

            if (response.ok) {
                setRegion(data.data)
            }
        } catch {
            console.log('Error with fetch setRegion')
        }
    }

    const sendRequestCity = async () => {
        if (region) {
            try {
                const response = await fetch(`${API_URL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        apiKey: `${API_KEY}`,
                        modelName: 'Address',
                        calledMethod: 'getCities',
                        methodProperties: { AreaRef: itemRegion },
                    }),
                });
                const data = await response.json();

                if (response.ok) {
                    setCity(data.data)
                }
            } catch {
                console.log('Error with fetch setRegion')
            }
        }
    }

    const sendRequestNovaPoshta = async () => {
        if (city) {
            try {
                const response = await fetch(`${API_URL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        apiKey: `${API_KEY}`,
                        modelName: 'AddressGeneral',
                        calledMethod: 'getWarehouses',
                        methodProperties: { CityRef: itemCity },
                    }),
                });
                const data = await response.json();

                if (response.ok) {
                    setNovaPoshta(data.data)
                }
            } catch {
                console.log('Error with fetch setRegion')
            }
        }
    }

    const handleChangeRegion = (event) => {
        const newValue = event.target.value;
        const description = event.target.options[event.target.selectedIndex].text;
        setItemRegion(newValue);
        setNewCard((prevState) => ({
            ...prevState,
            location: {
                ...prevState.location,
                region: `${description}, `,
            },
        }))
    };

    const handleChangeCity = (event) => {
        const newValue = event.target.value;
        const description = event.target.options[event.target.selectedIndex].text;
        setItemCity(newValue);
        setNewCard((prevState) => ({
            ...prevState,
            location: {
                ...prevState.location,
                city: `${description}, `,
            },
        }))
    };

    const handleChangeAddress = (event) => {
        const description = event.target.options[event.target.selectedIndex].text;
        setNewCard((prevState) => ({
            ...prevState,
            location: {
                ...prevState.location,
                postAddress: `${description}, `,
            },
        }))
    };

    const setDateAddress = () => {
        setIsAddress(false)
        setRegion([]);
        setItemRegion([]);
        setCity([]);
        setItemCity([]);
        setNovaPoshta([]);
    }

    return (
        <div>
            <div className='grid'>
                <div className='wrap'>
                    <div id='header-placing'>Адреса</div>
                    <div className='parents-placing'>
                        <div>
                            <br /><label className='register-lable'>Оберіть регін: </label>
                            <br /><br /><label className='register-lable'>Оберіть населений пункт: </label>
                            <br /><br /><label className='register-lable'>Оберіть відділення: </label>
                        </div>
                        <div>
                            <br /><select name="select" defaultChecked='Region' className='select' onClick={sendRequestRegion} onChange={handleChangeRegion} >
                                <option value="">Область</option>
                                {region.map((item) => (
                                    <option key={item.Ref} value={item.Ref}>
                                        {item.Description}
                                    </option>
                                ))}
                            </select>
                            <br /><br /><select name="select" className='select' defaultChecked='City' onClick={sendRequestCity} onChange={handleChangeCity}>
                                <option value="">Населенный пункт</option>
                                {city.map((item) => (
                                    <option key={item.Ref} value={item.Ref}>
                                        {item.Description}
                                    </option>
                                ))}
                            </select>
                            <br /><br /><select name="select" defaultChecked='#NP' className='select' onClick={sendRequestNovaPoshta} onChange={handleChangeAddress}>
                                <option value="">Отделение НП</option>
                                {novaPoshta.map((item) => (
                                    <option key={item.Ref} value={item.Ref}>
                                        {item.Description}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <br />
                        <div>
                            <br />
                            <button id='adress__modal__btn' onClick={setDateAddress}>Підтвердити</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PlacingAnOrder;