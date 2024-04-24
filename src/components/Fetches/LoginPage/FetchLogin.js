import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import { saveBearer } from '../../../redux/AddEdit/actions';

const fetchLogin = async (email, password, dispatch, setIsShowExit) => {
    try {
        const response = await axios.post(`${API_MAIN_URL}auth/login`,
            {
                "email": email,
                "password": password
            });
        if (response.data) {
            dispatch(saveBearer(response.data.accessToken));
            setIsShowExit(true);
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса для входа в аккаунт:", error);
    }
};


export default fetchLogin;

