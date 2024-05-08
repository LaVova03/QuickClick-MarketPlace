import axios from "axios";
import { API_MAIN_URL } from '../../../constants/Constants';
import GetAllImages from './GetAllImages';
import { setDataForDelete, setArchiveData } from '../../../redux/AddEdit/actions'
import { setAllChats } from '../../../redux/Chat/actions';

const AllPersonAdverts = async (setData, dispatch, token, part) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get(`${API_MAIN_URL}adverts/user`, config);
        const published = [];
        const archived = [];
        const comments = [];
        if (response.status === 200) {
            response.data.forEach(el => {
                if (el.status === "PUBLISHED") {
                    published.push(el);
                } else if (el.status === "ARCHIVED") {
                    archived.push(el)
                }
                if (el.comments.length > 0) {
                    comments.push(el)
                }
            })
            dispatch(setDataForDelete(response.data));
            if (part === "active") {
                dispatch(setData());
                dispatch(setData(published));
                GetAllImages(published, dispatch, token);
            } else {
                GetAllImages(archived, dispatch, token);
                dispatch(setArchiveData());
                dispatch(setArchiveData(archived));
            }
            dispatch(setAllChats());
            dispatch(setAllChats(comments));
        }
    } catch (error) {
        console.log("Ошибка при выполнении GET-запроса всех объявлений:", error);
    }
};


export default AllPersonAdverts;