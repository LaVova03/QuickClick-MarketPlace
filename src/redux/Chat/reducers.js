import { SET_ALL_CHATS, SET_TOATS, SET_USER_NAME } from './actionTypes';

const initialState = {
    isAllChats: null,
    isToast: false,
    isUserName: '',
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
        case SET_USER_NAME:
            return {
                ...state,
                isUserName: action.payload,
            };
        default:
            return state;
    }
};

export default myReducer3;


