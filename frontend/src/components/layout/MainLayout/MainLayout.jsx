import { Outlet, Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function MainLayout() {
    const { isAuthenticated } = useSelector(state => state.auth);
    const location = useLocation();

    const publicRoutes = ['/login', '/register'];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!isAuthenticated && !isPublicRoute) {
        return <Navigate to="/login" replace />;
    }

    if (isAuthenticated && isPublicRoute) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}