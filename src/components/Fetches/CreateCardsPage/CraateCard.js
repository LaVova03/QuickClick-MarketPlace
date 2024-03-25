import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const addCard = async (obj, isPhoto, showSuccessfulModal, dispatch) => {
    const jsonAddress = {
        ...obj,
        address: JSON.stringify(obj.address)
    }

    const file = new FormData();
    isPhoto.forEach((item) => {
        file.append(`file`, item);
    });

    try {
        const responseData = await axios.post(`${API_MAIN_URL}adverts`, jsonAddress);
        if (responseData) {
            await axios.post(`http://localhost:8080/v1.0/images/image/${responseData.data.id}`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            dispatch(showSuccessfulModal());
        } else {
            console.log("Ошибка при выполнении POST-запроса для добавления картинок в созданную карточку товара");
        }
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса для создания карточки товара:", error);
    }
}

export default addCard;
