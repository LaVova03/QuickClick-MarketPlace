import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import { setTokenBearer } from "../../../redux/Main/actions";

const fetchLogin = async (email, password, setIsShowExit, dispatch) => {
    try {
        const response = await axios.post(`${API_MAIN_URL}auth/login`,
            {
                "email": email,
                "password": password
            });
        if (response.data) {
            setIsShowExit(true);
            sessionStorage.setItem('login', response.data.accessToken);
            dispatch(setTokenBearer(true))
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса для входа в аккаунт:", error);
    }
};


export default fetchLogin;

