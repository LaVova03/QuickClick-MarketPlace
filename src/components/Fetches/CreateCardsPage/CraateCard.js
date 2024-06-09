import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const addCard = async (obj, isPhoto, showSuccessfulModal, dispatch, token) => {
    const jsonObj = {
        ...obj,
        address: JSON.stringify(obj.address),
        firstPriceDisplayed: JSON.stringify(obj.firstPriceDisplayed),
    }

    const file = new FormData();
    isPhoto.forEach((item) => {
        file.append(`file`, item);
    });

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        console.log(jsonObj)
        const response = await axios.post(`${API_MAIN_URL}adverts`, jsonObj, config);
        if (response.data) {
            console.log(response.data);
            const responsePhoto = await axios.post(`${API_MAIN_URL}images/${response.data.id}`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (responsePhoto.status === 200) {
                dispatch(showSuccessfulModal());
            }
        } else {
            console.log('error create photo')
        }
    } catch (error) {
        console.error("Ошибка при выполнении POST-запроса для создания карточки товара:", error);
    }
}

export default addCard;
