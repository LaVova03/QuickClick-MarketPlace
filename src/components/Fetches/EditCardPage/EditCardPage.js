import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const fetchPutGoods = async (isNewCard, isPhoto, id, showSuccessfulModal, dispatch) => {

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
        "firstPriceDisplayed": isNewCard.firstPriceDisplayed,
        "currency": isNewCard.currency,
        "address": isNewCard.address.region,
        "userId": id,
    }

    try {
        const response = await axios.put(`${API_MAIN_URL}adverts/${id}`, user);
        if (response) {
            const responseFile = await axios.post(`http://localhost:8080/v1.0/images/image/${response.data.id}`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (responseFile) {
                localStorage.setItem('update', id)
            }
            dispatch(showSuccessfulModal());
        } else {
            console.log("Ошибка при выполнении POST-запроса для добавления картинок в созданную карточку товара");
        }
    } catch (error) {
        console.log("fetch data PUT cards error:", error);
    }
};

export default fetchPutGoods;