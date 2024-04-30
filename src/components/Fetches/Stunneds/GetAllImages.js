import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import { setImages, resetImages } from '../../../redux/AddEdit/actions';

const GetAllImages = async (data, dispatch, token) => {

    const localId = localStorage.getItem('setIdCard');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const imagesFilesArray = [];
    try {
        for (const item of data) {
            const id = item.id;

            const response = await axios.get(`${API_MAIN_URL}images/${id}`, config);

            if (response.data) {
                imagesFilesArray.push(response.data);
            }
        }
        if (localId) {
            const responstId = await axios.get(`${API_MAIN_URL}images/ids/${localId}`, config)
            if (responstId.status === 200) {
                console.log(responstId.data)
            }
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса всех картинок объявления:", error);
    } finally {
        dispatch(resetImages());
        dispatch(setImages(imagesFilesArray));
    }
};

export default GetAllImages;
