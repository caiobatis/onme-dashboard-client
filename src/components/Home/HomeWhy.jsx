import React from 'react'
import CardWithIcon from '../Cards/CardWithIcon'
import styles from './Home.scss'

const HomeWhy = props => {
  
  return (        
  <section className={styles.why}>
    <div className="container">
      <div className="text-center">
        <h2 className={styles.h2}>Porque escolher a Free Isenções?</h2>
      </div>
    </div>
    <div className={styles.icons}>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-2">
            <CardWithIcon >
              <div className={styles.icon}>
                <i className="far fa-thumbs-up"></i>
              </div>
              <div className={styles.title}>
                <h4 className={styles.h4}>Alto indice de aprovação</h4>
              </div>
              <div className={styles.description}>
                <span className={styles.span}>Grande experiência e agilidade no processo de isenções.</span>
              </div>
            </CardWithIcon>
          </div>
          <div className="col-md-2">
            <CardWithIcon >
              <div className={styles.icon}>
                <i className="far fa-thumbs-up"></i>
              </div>
              <div className={styles.title}>
                <h4 className={styles.h4}>Alto indice de aprovação</h4>
              </div>
              <div className={styles.description}>
                <span className={styles.span}>Grande experiência e agilidade no processo de isenções.</span>
              </div>
            </CardWithIcon>
          </div>
          <div className="col-md-2">
            <CardWithIcon >
              <div className={styles.icon}>
                <i className="far fa-thumbs-up"></i>
              </div>
              <div className={styles.title}>
                <h4 className={styles.h4}>Alto indice de aprovação</h4>
              </div>
              <div className={styles.description}>
                <span className={styles.span}>Grande experiência e agilidade no processo de isenções.</span>
              </div>
            </CardWithIcon>
          </div>
          <div className="col-md-2">
            <CardWithIcon >
              <div className={styles.icon}>
                <i className="far fa-thumbs-up"></i>
              </div>
              <div className={styles.title}>
                <h4 className={styles.h4}>Alto indice de aprovação</h4>
              </div>
              <div className={styles.description}>
                <span className={styles.span}>Grande experiência e agilidade no processo de isenções.</span>
              </div>
            </CardWithIcon>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default HomeWhy 