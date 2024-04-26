import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTokenBearer } from "./redux/Main/actions";

const PrivateRoute = ({ redirectPath = '/login' }) => {
    const dispatch = useDispatch();

    const isTokenBearer = useSelector(state => state.myReducer?.isTokenBearer);
    const login = sessionStorage.getItem('login');

    useEffect(() => {
        if (login) {
            dispatch(setTokenBearer())
        }
    }, [login, dispatch])

    useEffect(() => {
        console.log(isTokenBearer)
    }, [isTokenBearer])


    if (!isTokenBearer) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

PrivateRoute.propTypes = {
    redirectPath: PropTypes.string,
};

export default PrivateRoute;