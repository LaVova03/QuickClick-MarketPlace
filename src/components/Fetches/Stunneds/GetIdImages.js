import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';

const GetIdImages = async ({ setPhoto, allIdCardRandom }) => {
    const allPhoto = [];

    try {
        for (const el of allIdCardRandom) {
            const response = await axios.get(`${API_MAIN_URL}images/${el}`);
            if (response.status === 200) {
                const blob = response.data[0] ? dataURItoBlob(response.data[0]) : null;
                allPhoto.push([el, blob]);
            }
        }
        setPhoto(allPhoto);
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса для фото по ID объявления:", error);
    }
};

function dataURItoBlob(dataURI) {
    try {
        const byteCharacters = atob(dataURI);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        return blob;
    } catch (error) {
        console.log("Ошибка при декодировании данных:", error);
        return null;
    }
}

export default GetIdImages;
