import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Main from './containers/Main/Main';
import Login from './containers/Login/Login';
import PrivateRoute from "./privateRoute";
import PersonalArea from './containers/PersonalArea/PersonalArea';
import AddCard from './components/AddCard/AddCard';

const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Main />} />

            <Route >
                <Route path="/login" element={<Login />} />
                <Route path="/add_card" element={<AddCard />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="/personal_area" element={<PersonalArea />} />
            </Route>

            <Route path="*" element={<div>404 | Page is not found !</div>} />
        </Routes>
    </Router>
);

export default AppRouter;