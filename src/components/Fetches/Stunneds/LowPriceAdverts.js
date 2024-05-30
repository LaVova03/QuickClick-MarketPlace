import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const LowPriceAdverts = async ({ setLowPrice }) => {

    try {
        const response = await axios.get(`${API_MAIN_URL}adverts/discounts`);
        if (response.status === 200) {
            setLowPrice(response.data);
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса объявлений со сниженой ценой:", error);
    }
};

export default LowPriceAdverts;