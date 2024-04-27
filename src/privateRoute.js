import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect } from "react";

const PrivateRoute = ({ redirectPath = '/login' }) => {

    const login = sessionStorage.getItem('login');

    useEffect(() => {
    }, [login])

    return login ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

PrivateRoute.propTypes = {
    redirectPath: PropTypes.string,
};

export default PrivateRoute;
