import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const fetchPutGoods = async (isNewCard, id, showSuccessfulModal, dispatch, idFotoEdit, token) => {

    const file = new FormData();
    idFotoEdit?.forEach((base64String, index) => {
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
    };

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.put(`${API_MAIN_URL}adverts/${id}`, user, config);
        if (response.data) {
            console.log(response.data)
            const responseFile = await axios.post(`${API_MAIN_URL}images/${response.data.id}`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (responseFile) {
                localStorage.setItem('update', id)
            }
            dispatch(showSuccessfulModal());
        } else {
            console.log("error edit photo");
        }
    } catch (error) {
        console.log("fetch data PUT cards error:", error);
    }
};

export default fetchPutGoods;
