import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const DeleteComments = async (id) => {

    const token = sessionStorage.getItem('login');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.delete(`${API_MAIN_URL}comments/${8}`, config);
        if (response.status === 200) {
            console.log(response.data)
        }
    } catch (error) {
        console.log("Ошибка при выполнении DELETE-запроса для комментария:", error);
    }
};

export default DeleteComments;