import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import { saveBearer } from '../../../redux/AddEdit/actions';

const FetchLogout = async (dispatch) => {
    try {
        const response = await axios.post(`${API_MAIN_URL}auth/logout`);
        if (response.data) {
            dispatch(saveBearer(''))
        }
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса для выхода из аккаунта:", error);
    }
};

export default FetchLogout;

