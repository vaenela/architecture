import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import styles from './CategoryPage.module.css'
import { addToCart } from '../../../stores/cartSlice';

export default function CategoryPage() {
    const { categoryId } = useParams()
    const dispatch = useDispatch()
    
    const [category, setCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const [priceFrom, setPriceFrom] = useState('')
    const [priceTo, setPriceTo] = useState('')
    const [discounted, setDiscounted] = useState(false)
    const [sortBy, setSortBy] = useState('default')

    useEffect(() => {
        async function getData() {
            const response = await fetch(`http://localhost:3333/categories/${categoryId}`);
            if (response.ok) {
                const data = await response.json();
                setCategory(data.category);
                setProducts(data.data || []);
            }
        }

        getData();
    }, [categoryId]);

    useEffect(() => {
        let filtered = products.filter(product => {
            if (discounted && !product.discont_price) return false
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
    }, [products, priceFrom, priceTo, discounted, sortBy])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{category?.title}</h1>
            
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
                    <label className={styles.checkboxLabel}>
                        Discounted items
                        <input
                            type="checkbox"
                            checked={discounted}
                            onChange={(e) => setDiscounted(e.target.checked)}
                        />
                    </label>
                </div>
                
                <div className={styles.filterGroup}>
                    <label>Sorted</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles.sortSelect}
                    >
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
                                <span className={styles.newPrice}>${product.discont_price || product.price}</span>
                                {product.discont_price && (
                                    <span className={styles.oldPrice}>${product.price}</span>
                                )}
                            </div>
                        </div>
                    </NavLink>
                        <button 
                                className={styles.addToCartBtn}
                                onClick={() => dispatch(addToCart(product))}
                            >
                                Add to cart
                            </button>
                    </div>
                ))}
            </div>
        </div>
    )
}