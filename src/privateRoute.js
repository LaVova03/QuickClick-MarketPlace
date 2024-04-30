import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setEditWindow } from './redux/Main/actions';

const PrivateRoute = ({ redirectPath = '/login' }) => {

    const login = sessionStorage.getItem('login');
    const isEditWindow = useSelector(state => state.myReducer?.isEditWindow);
    const dispatch = useDispatch();

    useEffect(() => {
        if (login && !isEditWindow) {
            dispatch(setEditWindow())
        }
    }, [login, isEditWindow, dispatch])

    return login ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

PrivateRoute.propTypes = {
    redirectPath: PropTypes.string,
};

export default PrivateRoute;
