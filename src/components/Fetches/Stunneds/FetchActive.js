import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';


const fetchActiveStunneds = async (setData, dispatch, id) => {

    try {
        const response = await axios.get(`${API_MAIN_URL}adverts/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        if (response.data) {
            dispatch(setData(response.data));
        }
    } catch (error) {
        console.log("Ошибка при выполнении POST-запроса активных объявлений:", error);
    }
};


export default fetchActiveStunneds;
