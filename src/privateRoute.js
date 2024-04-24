import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

const PrivateRoute = ({ redirectPath = '/login' }) => {

    const tokenBearer = useSelector(state => state.myReducer2?.isToken);

    useEffect(() => {
    }, [tokenBearer])

    if (!tokenBearer) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

PrivateRoute.propTypes = {
    redirectPath: PropTypes.string,
};

export default PrivateRoute;