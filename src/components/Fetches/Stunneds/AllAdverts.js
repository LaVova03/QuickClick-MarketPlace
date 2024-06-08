import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import { setAllAdverts } from '../../../redux/Main/actions';
import GetAllImages from '../../Fetches/Images/GetAllImages';

const AllAdverts = async ({ dispatch }) => {

    try {
        const response = await axios.get(`${API_MAIN_URL}adverts`);
        if (response.status === 200) {
            dispatch(setAllAdverts(response.data));
            GetAllImages(response.data, dispatch);
        } else {
            console.log(`Ошибка: получен неожиданный статус-код ${response.status}`);
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса всех объявлений:", error);
    }
};

export default AllAdverts;