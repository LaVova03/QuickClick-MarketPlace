import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({ redirectPath = '/login' }) => {
    if (!sessionStorage.getItem('isShowExit')) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

PrivateRoute.propTypes = {
    redirectPath: PropTypes.string,
};

export default PrivateRoute;