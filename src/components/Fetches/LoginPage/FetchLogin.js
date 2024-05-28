import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const fetchLogin = async (email, password, setIsShowExit, navigate, notifyError, isAddCardModal) => {

    const personal = sessionStorage.getItem('personal');
    localStorage.setItem('email', email);

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
            if (local && isAddCardModal && !personal) {
                navigate("/add_card");
            } else if (local && !isAddCardModal && !personal) {
                navigate("/");
            } else if (local && personal) {
                navigate("/personal_area");
            }
        }
    } catch (error) {
        notifyError('Такий юзер не зареєстрований, зареєструйтесь будь-ласка');
        console.log("Ошибка при выполнении GET-запроса для входа в аккаунт:", error);
    }
};


export default fetchLogin;

