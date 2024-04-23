import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const createCard = async (email, password) => {
    console.log('reg')
    // const data = JSON.stringify({
    //     name: 'Vova',
    //     email: email,
    //     password: password,
    // });

    try {
        const response = await axios.post(`${API_MAIN_URL}auth/login`,
            {
                "name": "adminnew@gmail.com",
                "email": "adminnew@gmail.com",
                "password": "123456789A!"
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(response.data);
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса для входа в систему:", error);
    }
}

export default createCard;
