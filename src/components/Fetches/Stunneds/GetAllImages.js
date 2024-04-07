import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import { setImages, resetImages } from '../../../redux/AddEdit/actions';

const GetAllImages = async (data, dispatch) => {
    try {
        const imagesFilesArray = []; // Массив для всех файлов изображений

        for (const item of data) {
            const id = item.id; // Получаем ID текущего элемента

            // Делаем запрос на сервер для получения изображений по текущему ID
            const response = await axios.get(`${API_MAIN_URL}images/${id}`);

            if (response.data) {
                imagesFilesArray.push(response.data);
            }
        }

        // Отправляем массив файлов изображений в действие setImages
        dispatch(resetImages());
        dispatch(setImages(imagesFilesArray));
        // console.log(imagesFilesArray)
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса всех картинок объявления:", error);
    }
};

export default GetAllImages;
