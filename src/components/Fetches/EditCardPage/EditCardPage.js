import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const fetchPutGoods = async (isNewCard, isPhoto, id, showSuccessfulModal, dispatch, setData) => {

    const file = new FormData();
    isPhoto.forEach((item) => {
        file.append(`file`, item);
    });

    const user = {
        "title": isNewCard.title,
        "description": isNewCard.description,
        "category": isNewCard.category,
        "status": "PUBLISHED",
        "phone": isNewCard.phone,
        "price": isNewCard.price,
        "firstPriceDisplayed": "true",
        "currency": isNewCard.currency,
        "address": isNewCard.address.region,
        "userId": id,
    }

    try {
        const response = await axios.put(`${API_MAIN_URL}adverts/${id}`, user);
        if (response) {
            await axios.post(`http://localhost:8080/v1.0/images/image/${response.data.id}`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            dispatch(showSuccessfulModal());
        } else {
            console.log("Ошибка при выполнении POST-запроса для добавления картинок в созданную карточку товара");
        }
    } catch {
        console.log("fetch data PUT cards error");
    }
};

export default fetchPutGoods;