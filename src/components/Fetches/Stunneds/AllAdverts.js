import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import GetAllImages from '../Stunneds/GetAllImages';


const AllAdverts = async (setData, dispatch) => {

    try {

        const response = await axios.get(`${API_MAIN_URL}adverts`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        if (response) {
            GetAllImages(response.data, dispatch)
            dispatch(setData(null));
            dispatch(setData(response.data));
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса всех объявлений:", error);
    }
};


export default AllAdverts;