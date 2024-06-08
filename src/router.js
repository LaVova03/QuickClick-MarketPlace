import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './containers/Main/Main';
import Login from './containers/Login/Login';
import PrivateRoute from "./privateRoute";
import PersonalArea from './containers/PersonalArea/PersonalArea';
import AddCard from './containers/AddCard/AddCard';
import ForgotPasswordModal from "./components/ForgotPasswordModal/ForgotPasswordModal";
import PageIsNotFound from './containers/PageIsNotFound/PageIsNotFound';
import ViewProduct from "./containers/ViewProduct/ViewProduct";
import StaticContainer from "./containers/StaticContainer/StaticContainer";
import ChatWrap from "./containers/ChatWrap/ChatWrap";
import CategoryPage from "./containers/CategoryPage/CategoryPage";
import { useSelector } from 'react-redux';

const AppRouter = () => {

    const isEditWindow = useSelector(state => state.myReducer?.isEditWindow);
    const path = isEditWindow ? "/edit_card" : "/add_card";

    return (
        <Router>
            <React.Fragment>
                <StaticContainer >
                    <Routes>
                        <Route path="/" element={<Main />} />

                        <Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgot_password" element={<ForgotPasswordModal />} />
                            <Route path="/view_product" element={<ViewProduct />} />
                            <Route path="/show_category" element={<CategoryPage />} />
                        </Route>

                        <Route element={<PrivateRoute />}>
                            <Route path="/personal_area" element={<PersonalArea />}>
                                <Route path="chat" element={<ChatWrap />} />
                            </Route>
                            <Route path={path} element={<AddCard />} />
                        </Route>

                        <Route path="*" element={<PageIsNotFound />} />
                    </Routes>
                </StaticContainer >
            </React.Fragment>
        </Router>
    );
}

export default AppRouter;
