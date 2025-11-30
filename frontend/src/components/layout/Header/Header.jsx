import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import styles from './Header.module.css'
import { logout } from "../../../stores/authSlice";

export default function Header() {
    const cart = useSelector(state => state.cart.items)
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <NavLink to="/" className={styles.logo}>
                    <img src="src/assets/logo.png" alt="Shop Logo" className={styles.logoImage} />
                </NavLink>
                <nav className={styles.nav}>
                    <NavLink to="/" className={styles.link}>Main Page</NavLink>
                    <NavLink to="/categories" className={styles.link}>Categories</NavLink>
                    <NavLink to="/products" className={styles.link}>All products</NavLink>
                    <NavLink to="/sales" className={styles.link}>All sales</NavLink>
                </nav>
                
                <div className={styles.authSection}>
                    {isAuthenticated ? (
                        <div className={styles.userMenu}>
                            <span className={styles.userName}>Hello, {user?.name}</span>
                            {user?.role === 'admin' && (
                                <button 
                                    onClick={() => navigate('/admin')}
                                    className={styles.adminBtn}
                                >
                                    Admin Panel
                                </button>
                            )}
                            <button 
                                onClick={handleLogout}
                                className={styles.logoutBtn}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className={styles.authButtons}>
                            <button 
                                onClick={handleLogin}
                                className={styles.loginBtn}
                            >
                                Login
                            </button>
                            <button 
                                onClick={handleRegister}
                                className={styles.registerBtn}
                            >
                                Register
                            </button>
                        </div>
                    )}
                    
                    <NavLink to="/cart" className={styles.cartLink}>
                        <img src="src/assets/icon.svg" alt="Cart" /> 
                        {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                    </NavLink>
                </div>
            </div>
        </header>
    )
}