import { createBrowserRouter } from "react-router";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import HomePage from "./components/pages/HomePage/HomePage";
import ProductsPage from "./components/pages/ProductsPage/ProductsPage";
import CartPage from "./components/pages/CartPage/CartPage";
import CategoriesPage from "./components/pages/CategoriesPage/CategoriesPage";
import CategoryPage from "./components/pages/CategoryPage/CategoryPage";
import ProductPage from "./components/pages/ProductCard/ProductCard";
import SalesPage from "./components/pages/SalesPage/SalesPage";
import Admin from "./components/pages/Admin/Admin";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import NotFoundPage from "./components/pages/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
    {
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: 'products',
                Component: ProductsPage
            },
            {
                path: 'categories',
                Component: CategoriesPage
            },
            {
                path: 'sales',
                Component: SalesPage
            },
            {
                path: 'cart',
                Component: CartPage
            },
            {
                path: 'categories/:categoryId',
                Component: CategoryPage
            },
            {
                path: 'products/:productId',
                Component: ProductPage
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'admin',
                Component: Admin
            },
            {
                path: '*',
                Component: NotFoundPage
            }
        ]
    },
]);
