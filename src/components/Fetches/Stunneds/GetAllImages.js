import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import { setImages, resetImages } from '../../../redux/AddEdit/actions';

const GetAllImages = async (data, dispatch, token) => {

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
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса всех картинок объявления:", error);
    } finally {
        console.log(imagesFilesArray)
        dispatch(resetImages());
        dispatch(setImages(imagesFilesArray));
    }
};

export default GetAllImages;
