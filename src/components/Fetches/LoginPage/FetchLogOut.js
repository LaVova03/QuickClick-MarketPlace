import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const FetchLogout = async () => {
    try {
        const response = await axios.post(`${API_MAIN_URL}auth/logout`);
        if (response.data) {
            sessionStorage.removeItem('login');
        }
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса для выхода из аккаунта:", error);
    }
};

export default FetchLogout;

