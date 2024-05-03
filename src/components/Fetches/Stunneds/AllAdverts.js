import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import GetAllImages from '../Stunneds/GetAllImages';
import { setDataForDelete, setArchiveData } from '../../../redux/AddEdit/actions'

const AllAdverts = async (setData, dispatch, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get(`${API_MAIN_URL}adverts/user`, config);
        const published = [];
        const archived = [];
        if (response.status === 200) {
            response.data.forEach(el => {
                if (el.status === "PUBLISHED") {
                    published.push(el);
                } else if (el.status === "ARCHIVED") {
                    archived.push(el)
                }
            })
            dispatch(setDataForDelete(response.data));
            GetAllImages(response.data, dispatch, token);
            dispatch(setData());
            dispatch(setData(published));
            dispatch(setArchiveData());
            dispatch(setArchiveData(archived));
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса всех объявлений:", error);
    }
};


export default AllAdverts;