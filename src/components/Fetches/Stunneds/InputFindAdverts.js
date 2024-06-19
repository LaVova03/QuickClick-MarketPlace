import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const InputFindAdverts = async () => {

    const title = 'Крісло'

    try {
        const response = await axios.get(`${API_MAIN_URL}adverts/find/${title}`);
        if (response.status === 200) {
            console.log(response.data);
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса поиска через инпут объявлений:", error);
    }
};

export default InputFindAdverts;