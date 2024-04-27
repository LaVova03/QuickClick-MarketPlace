import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const fetchPutGoods = async (isNewCard, id, showSuccessfulModal, dispatch, token, photoUrl) => {
    console.log(id)
    const file = new FormData();

    // Функция для загрузки Blob из URL
    async function fetchBlobFromUrl(url) {
        const response = await fetch(url);
        const blob = await response.blob();
        return blob;
    }

    // Проходим по каждому URL в массиве photoUrl
    for (let index = 0; index < photoUrl.length; index++) {
        const url = photoUrl[index];
        try {
            // Получаем Blob объект из URL
            const blob = await fetchBlobFromUrl(url);

            // Создаем объект File из Blob
            const fileData = new File([blob], `image${index + 1}.jpg`, { type: 'image/jpeg' });

            // Добавляем объект File в FormData
            file.append('file', fileData);
        } catch (error) {
            console.error(`Error fetching blob from URL ${url}:`, error);
        }
    }

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
        // Отправляем запрос на обновление данных объявления
        const response = await axios.put(`${API_MAIN_URL}adverts/${id}`, user, config);

        if (response.data) {
            console.log(file)
            // Отправляем запрос на загрузку изображений на сервер
            const responseFile = await axios.post(`${API_MAIN_URL}images/${response.data.id}`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (responseFile) {
                localStorage.setItem('update', id);
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
