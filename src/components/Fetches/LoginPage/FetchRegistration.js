import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import fetchLogin from './FetchLogin';
import { BEARER } from "../../../constants/Constants";

const createCard = async (email, password) => {
    const data = {
        name: 'User',
        email: email,
        password: password,
    }

    try {
        const response = await axios.post(`${API_MAIN_URL}auth/signup`, data,
            {
                headers: {
                    'Authorization': BEARER
                }
            }
        );
        if (response.data) {
            fetchLogin(email, password)
        }
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса для создания аккаунта:", error);
    }
}

export default createCard;
