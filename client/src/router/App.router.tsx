import { Route, Routes } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { AllItems } from "../pages/all_items/AllItems";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { AllUsers } from "../pages/all_users/AllUsers";
import { AddItem } from "../pages/add_item/AddItem";
import { MyItemsForSale } from "../pages/my_items_for_sale/MyItemsForSale";
import { MyPurchasedItems } from "../pages/my_purchased_items/MyPurchasedItems";
import { Logout } from "../hooks/Logout";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
                <Route index element={<AllItems />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="users" element={<AllUsers />} />
                <Route path="add_item" element={<AddItem />} />
                <Route path="my_items_for_sale" element={<MyItemsForSale />} />
                <Route path="my_purchased_items" element={<MyPurchasedItems />} />
                <Route path="logout" element={<Logout />} />
            </Route>
        </Routes>
    );
};
