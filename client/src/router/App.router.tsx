import { Route, Routes } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { AllItems } from "../pages/all_items/AllItems";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";

export const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    // <UnauthorizedRoute>
                    <Navbar />
                    // </UnauthorizedRoute>
                }
            >
                <Route
                    index
                    element={
                        // <UnauthorizedRoute>
                        <AllItems />
                        // </UnauthorizedRoute>
                    }
                />
                <Route
                    path="login"
                    element={
                        // <UnauthorizedRoute>
                        <Login />
                        // </UnauthorizedRoute>
                    }
                />
                <Route
                    path="register"
                    element={
                        // <UnauthorizedRoute>
                        <Register />
                        // </UnauthorizedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};
