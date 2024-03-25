import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const createCard = async (email, password) => {

    const data = JSON.stringify({
        name: 'Vova',
        email: email,
        password: password,
    });

    try {
        const response = await axios.post(`${API_MAIN_URL}auth/login`, data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(response.data);
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса для входа в систему:", error);
    } finally {
        console.log(data)
    }
}

export default createCard;
