import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import AllPersonAdverts from "../Stunneds/AllPersonAdverts";
import { setData } from "../../../redux/AddEdit/actions";

const fetchPutGoods = async (isNewCard, id, showSuccessfulModal, dispatch, token, photoForServer) => {
    // console.log(isData)

    const part = sessionStorage.getItem('part');

    const file = new FormData();

    photoForServer.forEach((item) => {
        file.append(`file`, item);
    });

    // Подготавливаем данные о пользователе для отправки на сервер
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
    };

    // Конфигурация для запроса
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.put(`${API_MAIN_URL}adverts/${id}`, user, config);
        if (response.data && photoForServer.length > 0) {
            const responseFile = await axios.post(`${API_MAIN_URL}images/${response.data.id}`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (responseFile) {
                localStorage.setItem('update', id);
                AllPersonAdverts(setData, dispatch, token, part);
            }
        } else {
            console.log("error edit photo");
        }
        if (response.status === 200) {
            dispatch(showSuccessfulModal());
        }
    } catch (error) {
        console.log("fetch data PUT cards error:", error);
    }
};

export default fetchPutGoods;
