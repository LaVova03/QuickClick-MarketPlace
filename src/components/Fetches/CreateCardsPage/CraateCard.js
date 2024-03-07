import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const addCard = async (obj) => {
    const jsonAddress = {
        ...obj,
        address: JSON.stringify(obj.address)
    }
    try {
        const response = await axios.post(`${API_MAIN_URL}adverts`, jsonAddress);
        console.log(response.data);
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса для создания карточки товара:", error);
    } finally {
        console.log(obj);
    }
}

export default addCard;