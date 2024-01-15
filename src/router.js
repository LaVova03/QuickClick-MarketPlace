import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './containers/Main/Main';
import Login from './containers/Login/Login';
import PrivateRoute from "./privateRoute";
import PersonalArea from './containers/PersonalArea/PersonalArea';

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main />} />

            <Route >
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="/personal_area" element={<PersonalArea />} />
            </Route>

            <Route path="*" element={<div>404 | Page is not found !</div>} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;