import axios from "axios";
// import { jwtDecode } from 'jwt-decode';
import { API_MAIN_URL } from '../../../constants/Constants';
import { saveBearer } from '../../../redux/AddEdit/actions';

// const axiosInstance = axios.create({
//     baseURL: API_MAIN_URL,
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer efGRkrGRkjC9hIGRrlmIvZCB2bmdkUmduL2FsXGdsZGFua2cvbGRrbnJnL2xhL3JsZy9hbHNhZGcvYWxlaWcvbGR2Zy9lc2xnaWhoL3NsL3NsZWdoL2xzZGpnL3NsamRn`
//     }
// });

// const fetchPostLogin = async (email, password) => {
//     try {
//         const json = JSON.stringify({ email: email, password: password })
//         const response = await axiosInstance.post('/auth/login', json);
//         console.log(response.data);

//         const token = response.data.token;

//         const decodedToken = jwtDecode(token);
//         console.log(decodedToken);
//     } catch (error) {
//         console.log("Ошибка при выполнении POST-запроса для входа:", error);
//     } finally {
//         console.log({ email: email, password: password });
//     }
// };

const fetchPostLogin = async (email, password, dispatch) => {
    console.log('log')
    try {
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);

        const response = await axios.post(`${API_MAIN_URL}auth/login`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.data) {
            console.log(response.data.accessToken);
            dispatch(saveBearer(response.data.accessToken));
        }
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса для создания аккаунта:", error);
    }
};

export default fetchPostLogin;

