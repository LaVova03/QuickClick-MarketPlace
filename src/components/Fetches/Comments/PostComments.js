import axios from 'axios';
import { API_MAIN_URL } from '../../../constants/Constants';
import GetComments from './GetComments';
import { setUserName } from '../../../redux/Chat/actions';

const PostComments = async ({ message, dispatch }) => {
    const token = sessionStorage.getItem('login');
    const id = localStorage.getItem('setIdCard');

    if (!message) {
        console.error('Message cannot be empty.');
        return;
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(`${API_MAIN_URL}comments/${id}`, { message }, config);
        if (response.status === 201) {
            GetComments(id, dispatch);
            dispatch(setUserName(response.data.username));
        } else {
            console.log('Unexpected response status:', response.status);
        }
    } catch (error) {
        console.error("Ошибка при выполнении POST-запроса коменнтария", error);
    }
};

export default PostComments;
