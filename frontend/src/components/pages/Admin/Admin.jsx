import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import styles from './Admin.module.css'
import { productsAPI } from '../../../api';

export default function Admin() {
    const { user } = useSelector(state => state.auth)
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        discont_price: '',
        description: '',
        image: '',
        categoryId: '1'
    })
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    if (user?.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')

        try {
            if (!formData.title || !formData.price) {
                setMessage('Title and price are required')
                return
            }

            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                discont_price: formData.discont_price ? parseFloat(formData.discont_price) : null,
                categoryId: parseInt(formData.categoryId)
            }

            const response = await productsAPI.create(productData)
            setMessage('Product created successfully!')
            
            setFormData({
                title: '',
                price: '',
                discont_price: '',
                description: '',
                image: '',
                categoryId: '1'
            })

            console.log('Product created:', response.data)

        } catch (error) {
            console.error('Create product error:', error)
            setMessage(error.response?.data?.error || 'Failed to create product')
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.adminPanel}>
                <h1 className={styles.title}>Admin Panel</h1>
                <p className={styles.subtitle}>Create New Product</p>

                {message && (
                    <div className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Product Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className={styles.input}
                            placeholder="Enter product title"
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Price ($) *</label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className={styles.input}
                                placeholder="0.00"
                                min="0"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Discount Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="discont_price"
                                value={formData.discont_price}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="0.00"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={styles.textarea}
                            placeholder="Product description"
                            rows="4"
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Image URL</label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Category</label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className={styles.select}
                            >
                                <option value="1">Annuals</option>
                                <option value="2">Nursery</option>
                                <option value="3">Garden Art</option>
                                <option value="4">Plant Care</option>
                                <option value="5">Seasonal</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Creating Product...' : 'Create Product'}
                    </button>
                </form>
            </div>
        </div>
    )
}