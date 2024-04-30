import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import fetchLogin from './FetchLogin';
import { BEARER } from "../../../constants/Constants";
import { useNavigate } from "react-router-dom";

const FetchRegistration = async (email, password, setIsShowExit, dispatch, isTokenBearer) => {

    const navigate = useNavigate();

    const data = {
        name: email,
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
            fetchLogin(email, password, setIsShowExit, dispatch, isTokenBearer, navigate)
        }
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса для создания аккаунта:", error);
    }
}

export default FetchRegistration;
