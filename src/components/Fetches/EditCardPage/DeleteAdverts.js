import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import { showSuccessfulModal } from '../../../redux/AddEdit/actions';

const DeleteAdverts = async (id, dispatch, token, navigate) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.delete(`${API_MAIN_URL}adverts/${id}`, config);
        if (response.status === 200) {
            localStorage.setItem('delete', id);
            localStorage.removeItem('setIdCard');
            dispatch(showSuccessfulModal());
            navigate('/personal_area');
        }
    } catch (error) {
        console.log("fetch data DELETE cards error:", error);
    }
};

export default DeleteAdverts;