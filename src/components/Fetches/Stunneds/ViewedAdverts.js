import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const ViewedAdverts = async ({ setViewed }) => {

    try {
        const response = await axios.get(`${API_MAIN_URL}adverts/max_viewed`);
        if (response.status === 200) {
            setViewed(response.data);
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса просмотренных объявлений:", error);
    }
};

export default ViewedAdverts;