import { SET_DATA, SHOW_SUCCESSFUL_WINDOW, SET_ID_CARD, SET_IMAGES, SET_EDIT_IMAGES, RESET_IMAGES, SAVE_BEARER } from './actionTypes';

const initialState = {
    isData: null,
    isIdCard: null,
    isSuccessfulWindow: false,
    isImages: [],
    isToken: '',
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
        case SAVE_BEARER:
            return {
                ...state,
                isToken: action.payload,
            };
        default:
            return state;
    }
};

export default myReducer2;


