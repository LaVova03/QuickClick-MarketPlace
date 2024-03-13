import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Main from './containers/Main/Main';
import Login from './containers/Login/Login';
import PrivateRoute from "./privateRoute";
import PersonalArea from './containers/PersonalArea/PersonalArea';
import AddCard from './containers/AddCard/AddCard';
import ForgotPasswordModal from "./components/ForgotPasswordModal/ForgotPasswordModal";
import { useSelector } from 'react-redux';

const AppRouter = () => {
    const isEditWindow = useSelector(state => state.myReducer?.isEditWindow);
    const path = isEditWindow ? "/edit_card" : "/add_card";

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />

                <Route >
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot_password" element={<ForgotPasswordModal />} />
                </Route>

                <Route element={<PrivateRoute />}>
                    <Route path="/personal_area" element={<PersonalArea />} />
                    <Route path={path} element={<AddCard />} />
                </Route>

                <Route path="*" element={<div>404 | Page is not found !</div>} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
