import { useEffect, useState } from 'react';
import styles from './HomePage.module.css'
import { NavLink } from 'react-router';
import { useForm } from 'react-hook-form';

export default function HomePage() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { register, handleSubmit, reset } = useForm()

      useEffect(() => {
        async function getData() {
          const categoriesResp = await fetch('http://localhost:3333/categories/all');
          const productsResp = await fetch('http://localhost:3333/products/all');
                
          if (categoriesResp.ok) {
            const categoriesData = await categoriesResp.json();
              setCategories(categoriesData);
            }
                
          if (productsResp.ok) {
            const productsData = await productsResp.json();
              setProducts(productsData);
            }
          }
        getData();
    }, [])

    async function onSubmit(data) {
        console.log('Form data:', data);
        setIsSubmitted(true);
        reset();
        
        setTimeout(() => {
            setIsSubmitted(false);
        }, 3000);
    }

    const discountedProducts = products.filter(product => product.discont_price);

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Amazing Discounts <br /> on Garden Products!</h1>
                        <NavLink to="/sales" className={styles.heroButton}>
                        Check Out</NavLink>
                    </div>
                </div>
            </section>

            <section className={styles.categoriesSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Categories</h2>
                        <NavLink to="/categories" className={styles.viewAllButton}>
                            All categories
                        </NavLink>
                    </div>
                    <div className={styles.categoriesGrid}>
                        {categories.slice(0, 4).map(category => (
                        <NavLink 
                            key={category.id} 
                            to={`/categories/${category.id}`}
                            className={styles.categoryCard}
                        >
                            <img src={category.image} alt={category.title} className={styles.categoryImage} />
                            <h3 className={styles.categoryTitle}>{category.title}</h3>
                        </NavLink>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.registrationSection}>
                <div className={styles.container}>
                    <div className={styles.registrationText}>
                        <h2 className={styles.registrationTitle}>5% off on the first order</h2>
                    </div>
                    <div className={styles.registrationContent}>
                        <div className={styles.registrationImage}>
                            <img src="src/assets/image.png" alt="" />
                        </div>
                        <form 
                            onSubmit={handleSubmit(onSubmit)} 
                            className={styles.registrationForm}
                        >
                            <input
                                {...register('name', { required: true })}
                                type="text"  
                                placeholder="Name" 
                                className={styles.formInput}
                                disabled={isSubmitted}
                            />
                            
                            <input 
                                {...register('phone', { required: true })}
                                type="text" 
                                placeholder="Phone number" 
                                className={styles.formInput}
                                disabled={isSubmitted}
                            />

                            <input 
                                {...register('email', { required: true })}
                                type="email" 
                                placeholder="Email" 
                                className={styles.formInput}
                                disabled={isSubmitted}
                            />
                            
                            <button 
                                type="submit" 
                                className={styles.submitButton}
                                disabled={isSubmitted}
                            >
                                {isSubmitted ? "Request Submitted" : "Get a discount"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <section className={styles.saleSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Sale</h2>
                        <NavLink to="/sales" className={styles.viewAllButton}>
                            All sales
                        </NavLink>
                    </div>
                    <div className={styles.productsGrid}>
                        {discountedProducts.slice(0, 4).map(product => (
                            <div key={product.id} className={styles.productCard}>
                                <img src={product.image} alt={product.title} className={styles.productImage} />
                                <div className={styles.productInfo}>
                                    <h3 className={styles.productTitle}>{product.title}</h3>
                                    <div className={styles.prices}>
                                        <span className={styles.newPrice}>${product.discont_price}</span>
                                        <span className={styles.oldPrice}>${product.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}