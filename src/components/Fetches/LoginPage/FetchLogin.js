import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { API_MAIN_URL } from '../../../constants/Constants';

const axiosInstance = axios.create({
    baseURL: API_MAIN_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer efGRkrGRkjC9hIGRrlmIvZCB2bmdkUmduL2FsXGdsZGFua2cvbGRrbnJnL2xhL3JsZy9hbHNhZGcvYWxlaWcvbGR2Zy9lc2xnaWhoL3NsL3NsZWdoL2xzZGpnL3NsamRn`
    }
});

const fetchPostLogin = async (email, password) => {
    try {
        const json = JSON.stringify({ email: email, password: password })
        const response = await axiosInstance.post('/auth/login', json);
        console.log(response.data);

        const token = response.data.token;

        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса для входа:", error);
    } finally {
        console.log({ email: email, password: password });
    }
};

export default fetchPostLogin;

