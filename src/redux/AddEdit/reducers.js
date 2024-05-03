import {
    SET_DATA, SHOW_SUCCESSFUL_WINDOW, SET_ID_CARD, SET_IMAGES, SET_EDIT_IMAGES,
    RESET_IMAGES, SET_ALL_ID_IMAGES, SET_DATA_FOR_DELETE, SET_DOWNLOAD_PICTURES,
    SET_ARCHIVE_DATA
} from './actionTypes';

const initialState = {
    isData: null,
    isIdCard: null,
    isSuccessfulWindow: false,
    isImages: [],
    isAllIdimages: [],
    isDataforDelete: [],
    isArchiveData: null,
};

const myReducer2 = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                isData: action.payload,
            };
        case SET_ID_CARD:
            return {
                ...state,
                isIdCard: action.payload,
            };
        case SHOW_SUCCESSFUL_WINDOW:
            return {
                ...state,
                isSuccessfulWindow: !state.isSuccessfulWindow,
            };
        case SET_IMAGES:
            return {
                ...state,
                isImages: [...state.isImages, ...action.payload],
            };
        case SET_EDIT_IMAGES:
            const { index, data } = action.payload;
            const newImages = [...state.isImages];
            if (Array.isArray(newImages[index])) {
                newImages[index].push(data);
            } else {
                newImages[index] = [data];
            }
            return {
                ...state,
                isImages: newImages,
            };
        case RESET_IMAGES:
            return {
                ...state,
                isImages: [],
            };
        case SET_ALL_ID_IMAGES:
            return {
                ...state,
                isAllIdimages: action.payload
            };
        case SET_DATA_FOR_DELETE:
            return {
                ...state,
                isDataforDelete: action.payload
            };
        case SET_DOWNLOAD_PICTURES:
            return {
                ...state,
                isDownloadPictures: !state.isDownloadPictures,
            };
        case SET_ARCHIVE_DATA:
            return {
                ...state,
                isArchiveData: action.payload,
            };
        default:
            return state;
    }
};

export default myReducer2;


