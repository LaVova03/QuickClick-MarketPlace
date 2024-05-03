import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setEditWindow } from '../../redux/Main/actions';
import { useNavigate } from 'react-router-dom';

const PageIsNotFound = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isEditWindow = useSelector(state => state.myReducer?.isEditWindow);
    const token = sessionStorage.getItem('login');

    useEffect(() => {
        if (location.pathname === '/edit_card' && !isEditWindow && token) {
            dispatch(setEditWindow());
            navigate('/edit_card');
        }
        if (location.pathname === '/add_card' && isEditWindow && token) {
            dispatch(setEditWindow());
            navigate('/add_card');
        }
    }, [location, isEditWindow, dispatch, navigate, token])

    return (
        <div >
            {/* 404 | Page is not found ! */}
            Loading...
        </div >
    )
}

export default PageIsNotFound;