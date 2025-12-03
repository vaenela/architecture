import React from 'react'
import { NavLink } from 'react-router'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
        <img src="src/assets/404.png" alt=""/>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.message}>We’re sorry, the page you requested could not be found. <br />
        Please go back to the homepage.</p>
        <NavLink to="/" className={styles.homeLink}>
        Go Home</NavLink>
    </div>
  )
}
