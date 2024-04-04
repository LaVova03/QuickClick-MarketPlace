import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const DeleteAdverts = async (id, showSuccessfulModal, dispatch) => {

    try {
        const response = await axios.delete(`${API_MAIN_URL}adverts/${id}`);
        if (response) {
            localStorage.setItem('delete', id);
            dispatch(showSuccessfulModal());
        }
    } catch (error) {
        console.log("fetch data DELETE cards error:", error);
    }
};

export default DeleteAdverts;