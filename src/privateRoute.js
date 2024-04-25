import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

const PrivateRoute = ({ redirectPath = '/login' }) => {

    const isTokenBearer = useSelector(state => state.myReducer?.isTokenBearer);

    if (!isTokenBearer) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

PrivateRoute.propTypes = {
    redirectPath: PropTypes.string,
};

export default PrivateRoute;