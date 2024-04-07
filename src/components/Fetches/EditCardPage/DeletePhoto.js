import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const DeletePhoto = async (id, showSuccessfulModal, dispatch) => {

    try {
        console.log(id)
        const response = await axios.delete(`${API_MAIN_URL}images/${id}`);
        if (response) {
            const responseImages = await axios.get(`${API_MAIN_URL}images/${id}`);
            if (responseImages) {
                dispatch(showSuccessfulModal());
            }
        }
    } catch (error) {
        console.log("fetch data DELETE photo error:", error);
    }
};

export default DeletePhoto;