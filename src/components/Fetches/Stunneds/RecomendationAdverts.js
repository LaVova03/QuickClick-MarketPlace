import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const RecomendationAdverts = async ({ setRecomendation }) => {

    try {
        const response = await axios.get(`${API_MAIN_URL}adverts/max_viewed`);
        if (response.status === 200) {
            setRecomendation(response.data);
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса рекомендуемых объявлений:", error);
    }
};

export default RecomendationAdverts;