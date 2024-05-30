import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const PromotionsAdverts = async () => {
    try {
        const response = await axios.get(`${API_MAIN_URL}adverts/promotions`);
        if (response.status === 200) {
            // console.log(response.data);
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса объявлений по акции:", error);
    }
};

export default PromotionsAdverts;