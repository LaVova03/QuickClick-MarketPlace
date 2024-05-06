import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const AllAdverts = async () => {

    try {
        const response = await axios.get(`${API_MAIN_URL}adverts`);
        if (response.status === 200) {
            console.log(response.data)
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса всех объявлений:", error);
    }
};


export default AllAdverts;