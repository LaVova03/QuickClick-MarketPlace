import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const createCard = async (email, password) => {

    try {
        const response = await axios.post(`${API_MAIN_URL}login`,
            {
                "name": 'Vova',
                "email": email,
                "password": password,
            });
        console.log(response.data)
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса для создания аккаунта:", error);
    }
}

export default createCard;
