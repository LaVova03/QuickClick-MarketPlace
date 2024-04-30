import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import GetAllImages from '../Stunneds/GetAllImages';

const AllAdverts = async (setData, dispatch, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get(`${API_MAIN_URL}adverts`, config);
        if (response) {
            GetAllImages(response.data, dispatch, token)
            dispatch(setData());
            dispatch(setData(response.data));
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса всех объявлений:", error);
    }
};


export default AllAdverts;