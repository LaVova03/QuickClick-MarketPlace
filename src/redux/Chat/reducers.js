import { SET_ALL_CHATS, SET_TOATS } from './actionTypes';

const initialState = {
    isAllChats: null,
    isToast: false,
};

const myReducer3 = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_CHATS:
            return {
                ...state,
                isAllChats: action.payload,
            };
        case SET_TOATS:
            return {
                ...state,
                isToast: !state.isToast,
            };
        default:
            return state;
    }
};

export default myReducer3;


