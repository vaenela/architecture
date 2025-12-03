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
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2709.6467965765533!2d39.7094828!3d47.2374435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDE0JzE0LjgiTiAzOcKwNDInNDMuNCJF!5e0!3m2!1sru!2sru!4v1700000000000!5m2!1sru!2sru"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen
                loading="lazy"
                title="Google Map"
              />
          </div>
        </div>
      </footer>
    )
}
