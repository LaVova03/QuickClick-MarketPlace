import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const fetchLogin = async (email, password, setIsShowExit, dispatch, isTokenBearer, navigate, notifyError) => {

    try {
        const response = await axios.post(`${API_MAIN_URL}auth/login`,
            {
                "email": email,
                "password": password
            });
        if (response.data) {
            setIsShowExit(true);
            sessionStorage.setItem('login', response.data.accessToken);
            const local = sessionStorage.getItem('login')
            if (local) {
                navigate("/");
            }
        }
    } catch (error) {
        notifyError('Такий юзер не зареєстрований, зареєструйтесь будь-ласка');
        console.log("Ошибка при выполнении GET-запроса для входа в аккаунт:", error);
    }
};


export default fetchLogin;

