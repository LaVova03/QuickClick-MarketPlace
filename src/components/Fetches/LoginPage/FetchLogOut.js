import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const FetchLogout = async () => {
    try {
        const response = await axios.post(`${API_MAIN_URL}auth/logout`);
        if (response.status === 200) {
            sessionStorage.removeItem('login');
            sessionStorage.removeItem('personal');
            sessionStorage.removeItem('archive');
            sessionStorage.removeItem('part');
            localStorage.removeItem('setIdCard');
            localStorage.removeItem('whoIsIt');
            localStorage.removeItem('indexCard');
            localStorage.removeItem('part');
            localStorage.removeItem('delete');
            localStorage.removeItem('chapter');
            localStorage.removeItem('email');
        }
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса для выхода из аккаунта:", error);
    }
};

export default FetchLogout;

