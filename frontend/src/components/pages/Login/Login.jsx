import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import styles from './Login.module.css'
import { setCredentials } from '../../../stores/authSlice';
import { authAPI } from '../../../api';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await authAPI.login(formData)
            const { accessToken, user } = response.data
            
            dispatch(setCredentials({ user, accessToken }))
            navigate('/')
        } catch (error) {
            setError(error.response?.data?.error || 'Login failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.authCard}>
                <h1 className={styles.title}>Login</h1>
                
                {error && <div className={styles.error}>{error}</div>}
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            className={styles.input}
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                            className={styles.input}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                
                <p className={styles.switchText}>
                    Don't have an account? <NavLink to="/register" className={styles.switchLink}>Register here</NavLink>
                </p>
            </div>
        </div>
    )
}