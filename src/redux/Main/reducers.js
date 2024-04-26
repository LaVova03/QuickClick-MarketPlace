import { SET_BURGER_MENU, SET_LANGUAGE, SET_MODAL_ADD_CARD, ADD_CATEGORY_CARD, SET_EDIT_WINDOW, SET_TOKEN_BEARER } from './actionTypes';

const initialState = {
    isFlagSet: false,
    isLanguage: true,
    isAddModal: false,
    isCategoryRedux: '',
    isEditWindow: false,
    isTokenBearer: false,
};

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BURGER_MENU:
            return {
                ...state,
                isFlagSet: !state.isFlagSet,
            };
        case SET_LANGUAGE:
            return {
                ...state,
                isLanguage: !state.isLanguage,
            };
        case SET_MODAL_ADD_CARD:
            return {
                ...state,
                isAddModal: !state.isAddModal,
            };
        case ADD_CATEGORY_CARD:
            return {
                ...state,
                isCategoryRedux: action.payload,
            };
        case SET_EDIT_WINDOW:
            return {
                ...state,
                isEditWindow: !state.isEditWindow,
            };
        case SET_TOKEN_BEARER:
            console.log(state.isTokenBearer)
            return {
                ...state,
                isTokenBearer: !state.isTokenBearer,
            };
        default:
            return state;
    }
};

export default myReducer;


