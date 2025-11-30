import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router';
import styles from './SalesPage.module.css'
import { addToCart } from '../../../stores/cartSlice';

export default function SalesPage() {
    const dispatch = useDispatch()

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const [priceFrom, setPriceFrom] = useState('')
    const [priceTo, setPriceTo] = useState('')
    const [sortBy, setSortBy] = useState('default')

    useEffect(() => {
        async function getData() {
            const response = await fetch('http://localhost:3333/products/all')
            if (response.ok) {
                const data = await response.json()
                const discountedProducts = data.filter(product => product.discont_price)
                setProducts(discountedProducts)
            }
        }

        getData()
    }, [])

    useEffect(() => {
        let filtered = products.filter(product => {
            if (priceFrom && product.price < Number(priceFrom)) return false
            if (priceTo && product.price > Number(priceTo)) return false
            return true
        })

        if (sortBy === 'price-high-low') {
            filtered.sort((a, b) => b.price - a.price)
        } else if (sortBy === 'price-low-high') {
            filtered.sort((a, b) => a.price - b.price)
        } else if (sortBy === 'newest') {
            filtered.sort((a, b) => b.id - a.id)
        }

        setFilteredProducts(filtered)
    }, [products, priceFrom, priceTo, sortBy])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Discounted items</h1>
            
            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <label>Price</label>
                    <input
                        type="text"
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(e.target.value)}
                        placeholder="from"
                        className={styles.priceInput}
                    />
                    <input
                        type="text"
                        value={priceTo}
                        onChange={(e) => setPriceTo(e.target.value)}
                        placeholder="to"
                        className={styles.priceInput}
                    />
                </div>
                
                <div className={styles.filterGroup}>
                    <label>Sorted</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles.sortSelect}>
                        <option value="default">by default</option>
                        <option value="newest">newest</option>
                        <option value="price-high-low">price: high-low</option>
                        <option value="price-low-high">price: low-high</option>
                    </select>
                </div>
            </div>

            <div className={styles.productsGrid}>
                {filteredProducts.map(product => (
                    <div key={product.id} className={styles.productCard}>
                        <NavLink to={`/products/${product.id}`} className={styles.productLink}>
                            <div className={styles.productImageContainer}>
                                <img src={product.image} alt={product.title} className={styles.productImage} />
                            </div>
                            <div className={styles.productInfo}>
                                <h3 className={styles.productTitle}>{product.title}</h3>
                                <div className={styles.prices}>
                                    <span className={styles.newPrice}>${product.discont_price}</span>
                                    <span className={styles.oldPrice}>${product.price}</span>
                                </div>
                            </div>
                        </NavLink>
                        <div className={styles.buttonContainer}>
                            <button 
                                className={styles.addToCartBtn}
                                onClick={() => dispatch(addToCart(product))}>
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}