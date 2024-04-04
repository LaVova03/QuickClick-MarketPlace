import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const fetchPutGoods = async (isNewCard, id, showSuccessfulModal, dispatch, idFotoEdit) => {

    // console.log(id)

    const file = new FormData();
    idFotoEdit.forEach((base64String, index) => {
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const fileData = new File([byteArray], `image${index + 1}.jpg`, { type: 'image/jpeg' });
        file.append(`file`, fileData);
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
        if (response && file) {
            const responseFile = await axios.post(`http://localhost:8080/v1.0/images/${response.data.id}`, file, {
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
