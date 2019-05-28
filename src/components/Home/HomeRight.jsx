import React from 'react'
import styles from './Home.scss'

const HomeRight = props => {
  
  return (
    <div>
      <section className={styles.whoTitle}>
        <div className="container">
          <h2 className={styles.h2}>Quem tem Direito?</h2>
        </div>
      </section>
      <section className={styles.whoItems}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className={styles.list}>
                <li>
                  <p className={styles.p}>Deficiência Fisica</p>      
                  <div className={styles.icon}></div>
                </li>
                <li>
                  <p className={styles.p}>Deficiência visual</p>      
                  <div className={styles.icon}></div>
                </li>
                <li>
                  <p className={styles.p}>Deficiência intelectual</p>      
                  <div className={styles.icon}></div>
                </li>
                <li>
                  <p className={styles.p}>autismo</p>      
                  <div className={styles.icon}></div>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeRight 