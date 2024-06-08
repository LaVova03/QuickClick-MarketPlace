import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const CategoryAdverts = async ({ category, setCategoryAdverts }) => {
    try {
        const response = await axios.get(`${API_MAIN_URL}adverts/?category=${category}`);
        if (response.status === 200) {
            setCategoryAdverts(response.data);
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса объявлений по категории:", error);
    }
};

export default CategoryAdverts;
