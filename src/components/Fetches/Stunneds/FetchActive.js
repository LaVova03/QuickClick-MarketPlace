import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import { setIdCard } from "../../../redux/AddEdit/actions";

const fetchActiveStunneds = async (dispatch, id) => {
    try {
        const response = await axios.get(`${API_MAIN_URL}adverts/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        if (response.data) {
            dispatch(setIdCard(null));
            dispatch(setIdCard(response.data));
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса активных объявлений:", error);
    }
};


export default fetchActiveStunneds;
