import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const DeletePhoto = async (indexPhoto, showSuccessfulModal, dispatch, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const idAdvert = localStorage.getItem('setIdCard');

    try {
        console.log(idAdvert, indexPhoto)
        const response = await axios.delete(`${API_MAIN_URL}images/${idAdvert}/${indexPhoto + 1}`, config);
        if (response.data) {
            const responseImages = await axios.get(`${API_MAIN_URL}images/${idAdvert}`);
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