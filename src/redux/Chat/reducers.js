import { SET_ALL_CHATS } from './actionTypes';

const initialState = {
    isAllChats: [],
};

const myReducer3 = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_CHATS:
            return {
                ...state,
                isAllChats: action.payload,
            };
        default:
            return state;
    }
};

export default myReducer3;


