import { SET_ALL_CHATS, SET_TOATS, SET_USER_NAME } from './actionTypes';

export const setAllChats = (data) => ({
    type: SET_ALL_CHATS,
    payload: data
});

export const setToats = () => ({
    type: SET_TOATS,
});

export const setUserName = (data) => ({
    type: SET_USER_NAME,
    payload: data
});

