import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import styles from './Register.module.css'
import { setCredentials } from '../../../stores/authSlice';
import { authAPI } from '../../../api';

export default function Register() {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            setIsLoading(false)
            return
        }

        try {
            await authAPI.register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            
            const loginResponse = await authAPI.login({
                email: formData.email,
                password: formData.password
            })
            
            const { accessToken, user } = loginResponse.data
            dispatch(setCredentials({ user, accessToken }))
            navigate('/')
        } catch (error) {
            setError(error.response?.data?.error || 'Registration failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.authCard}>
                <h1 className={styles.title}>Register</h1>
                
                {error && <div className={styles.error}>{error}</div>}
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            className={styles.input}
                        />
                    </div>
                    
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
                    
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            required
                            className={styles.input}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                
                <p className={styles.switchText}>
                    Already have an account? <NavLink to="/login" className={styles.switchLink}>Login here</NavLink>
                </p>
            </div>
        </div>
    )
}