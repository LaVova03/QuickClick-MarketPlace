import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import GetAllImages from "../Images/GetAllImages";

const DeletePhoto = async (idPhoto, showSuccessfulModal, dispatch, token, isDataforDelete) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const idAdvert = localStorage.getItem('setIdCard');

    try {
        const response = await axios.delete(`${API_MAIN_URL}images/${idAdvert}/${idPhoto}`, config);
        if (response.data) {
            GetAllImages(isDataforDelete, dispatch, token)
            setTimeout(() => {
                dispatch(showSuccessfulModal());
            }, 500)
        }
    } catch (error) {
        console.log("fetch data DELETE photo error:", error);
    }
};

export default DeletePhoto;