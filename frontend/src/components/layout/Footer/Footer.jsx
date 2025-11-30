import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>Contact</h3>
              <div className={styles.contactRow}>
                <div className={styles.contactItem}>
                <span>Phone</span>
                  <p>+7 (499) 350-66-04</p>
              </div>
              <div className={styles.contactItemSpan}>
                <span>Socials</span>
                <div className={styles.socials}>
                  <a href="#" className={styles.socialLink}>
                    <img src="src/assets/ic-instagram.png" alt="instagram" />
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <img src="src/assets/ic-whatsapp.png" alt="whatsapp" />
                  </a>
                </div>
              </div>
              </div>
              <div className={styles.contactRow}>
                <div className={styles.contactItem}>
                <span>Address</span>
                <p>Dublininskaya Ulitsa, 96, Moscow, Russia, 115093</p>
              </div>
              <div className={styles.contactItemSpan}>
                <span>Working Hours</span>
                <p>24 hours a day</p>
              </div>
              </div>
            </div>
          </div>
                
          <div className={styles.mapSection}>
            <img src="src/assets/map.png" alt="" />
          </div>
        </div>
      </footer>
    )
}