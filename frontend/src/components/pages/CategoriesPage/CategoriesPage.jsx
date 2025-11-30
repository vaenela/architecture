import React, { useEffect, useState } from 'react'
import styles from './CategoriesPage.module.css'
import { NavLink } from 'react-router'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function getData() {
    const categoriesResp = await fetch('http://localhost:3333/categories/all');
      if (categoriesResp.ok) {
        const categoriesData = await categoriesResp.json();
        setCategories(categoriesData);
      }
    }
    getData();
  }, [])
  
  return (
    <section className={styles.categoriesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Categories</h2>
        </div>
        <div className={styles.categoriesGrid}>
          {categories.slice().map(category => (
            <NavLink 
              key={category.id} 
              to={`/categories/${category.id}`}
              className={styles.categoryCard}>
              <img src={category.image} alt={category.title} className={styles.categoryImage} />
              <h3 className={styles.categoryTitle}>{category.title}</h3>
            </NavLink>
           ))}
        </div>
      </div>
    </section>
  )
}
