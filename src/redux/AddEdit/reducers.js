import { SET_DATA, SHOW_SUCCESSFUL_WINDOW, SET_ID_CARD, SET_IMAGES, SET_EDIT_IMAGES, RESET_IMAGES } from './actionTypes';

const initialState = {
    isData: null,
    isIdCard: null,
    isSuccessfulWindow: false,
    isImages: [],
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
            newImages[index] = [...newImages[index], data];
            return {
                ...state,
                isImages: newImages,
            };
        case RESET_IMAGES:
            return {
                ...state,
                isImages: [],
            };
        default:
            return state;
    }
};

export default myReducer2;


