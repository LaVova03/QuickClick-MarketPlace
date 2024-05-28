import { SET_ALL_CHATS, SET_TOATS } from './actionTypes';

export const setAllChats = (data) => ({
    type: SET_ALL_CHATS,
    payload: data
});

export const setToats = () => ({
    type: SET_TOATS,
});

