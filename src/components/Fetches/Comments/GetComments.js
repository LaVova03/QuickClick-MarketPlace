import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import { setAllChats } from '../../../redux/Chat/actions';

const GetComments = async (id, dispatch) => {

    const token = sessionStorage.getItem('login');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.get(`${API_MAIN_URL}comments/${id}`, config);
        if (response.status === 200) {
            dispatch(setAllChats(response.data))
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса для комментария:", error);
    }
};

export default GetComments;