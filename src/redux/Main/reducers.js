import { SET_BURGER_MENU, SET_LANGUAGE, SET_MODAL_ADD_CARD, SHOW_BUTTON_EXIT, ADD_CATEGORY_CARD } from './actionTypes';

const initialState = {
    isFlagSet: false,
    isLanguage: true,
    isAddModal: false,
    isShowExit: false,
    isCategoryRedux: '',
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
        case SHOW_BUTTON_EXIT:
            return {
                ...state,
                isShowExit: !state.isShowExit,
            };
        case ADD_CATEGORY_CARD:
            return {
                ...state,
                isCategoryRedux: action.payload,
            };
        default:
            return state;
    }
};

export default myReducer;


