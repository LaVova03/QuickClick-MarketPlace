import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const DeletePhoto = async (indexPhoto, indexAdvert, showSuccessfulModal, dispatch) => {

    try {
        const response = await axios.delete(`${API_MAIN_URL}images/${indexAdvert}/${indexPhoto}`);
        if (response) {
            const responseImages = await axios.get(`${API_MAIN_URL}images/${indexAdvert}`);
            if (responseImages.data) {
                console.log(responseImages.data)
                dispatch(showSuccessfulModal());
            }
        }
    } catch (error) {
        console.log("fetch data DELETE photo error:", error);
    }
};

export default DeletePhoto;