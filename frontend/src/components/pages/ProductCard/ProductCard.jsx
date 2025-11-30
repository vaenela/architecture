import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../stores/cartSlice';
import styles from './ProductCard.module.css'

export default function ProductPage() {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`http://localhost:3333/products/${productId}`)
                if (response.ok) {
                    const data = await response.json()
                    setProduct(data[0])
                }
            } catch (error) {
                console.error('Error loading product:', error)
            }
            setLoading(false)
        }
        getData()
    }, [productId])

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                dispatch(addToCart(product))
            }
        }
    }

    const increment = () => {
        setQuantity(item => item + 1)
    }

    const decrement = () => {
        setQuantity(item => item > 1 ? item - 1 : 1)
    }

    if (loading) return <div className={styles.loading}>loading...</div>
    if (!product) return <div className={styles.error}>not found</div>

    return (
        <div className={styles.container}>
            <div className={styles.productCard}>
                <div className={styles.imageSection}>
                    <img src={product.image} alt={product.title} className={styles.productImage} />
                </div>

                <div className={styles.infoSection}>
                    <h1 className={styles.productTitle}>{product.title}</h1>
                    
                    <div className={styles.prices}>
                        <span className={styles.newPrice}>${product.discont_price || product.price}</span>
                        {product.discont_price && (
                        <span className={styles.oldPrice}>${product.price}</span>
                    )}
                    </div>

                    <div className={styles.quantitySection}>
                        <div className={styles.quantityControls}>
                            <button onClick={decrement}>-</button>
                            <span>{quantity}</span>
                            <button onClick={increment}>+</button>
                        </div>
                        <button 
                            className={styles.addToCartButton}
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </button>
                    </div>

                    <div className={styles.descriptionSection}>
                        <h3>Description</h3>
                        <p className={styles.description}>
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}