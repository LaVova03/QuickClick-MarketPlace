import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const ArchiveAdverts = async (id, token, dispatch, showSuccessfulModal) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.put(`${API_MAIN_URL}adverts/archive/${id}`, null, config);
        if (response.status === 200) {
            sessionStorage.setItem('archive', true)
            dispatch(showSuccessfulModal());
        }
    } catch (error) {
        console.log('Request ArchiveAdverts error:', error);
    }
}

export default ArchiveAdverts;