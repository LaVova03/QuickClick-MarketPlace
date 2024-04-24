import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import { setImages, resetImages } from '../../../redux/AddEdit/actions';

const GetAllImages = async (data, dispatch, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const imagesFilesArray = [];

        for (const item of data) {
            const id = item.id;

            const response = await axios.get(`${API_MAIN_URL}images/${id}`, config);

            if (response.data) {
                imagesFilesArray.push(response.data);
            }
        }

        dispatch(resetImages());
        dispatch(setImages(imagesFilesArray));
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса всех картинок объявления:", error);
    }
};

export default GetAllImages;
