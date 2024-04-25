import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const addCard = async (obj, isPhoto, showSuccessfulModal, dispatch, token) => {
    const jsonAddress = {
        ...obj,
        address: JSON.stringify(obj.address)
    }

    const file = new FormData();
    isPhoto.forEach((item) => {
        file.append(`file`, item);
    });

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.post(`${API_MAIN_URL}adverts`, jsonAddress, config);

        if (response.data) {
            console.log(response.data)

            await axios.post(`${API_MAIN_URL}images/${response.data.id}`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

        } else {
            console.log('error create photo')
        }
        dispatch(showSuccessfulModal());
    } catch (error) {
        console.error("Ошибка при выполнении POST-запроса для создания карточки товара:", error);
    }
}

export default addCard;
