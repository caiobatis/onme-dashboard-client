import React from 'react'
import CardWithIcon from '../Cards/CardWithIcon'
import styles from './Home.scss'

const HomeServices = props => {
  
  return (
    <section className={styles.services}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="text-center">
              <h2 className={styles.h2}>Nossos Serviços</h2>
            </div>
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <CardWithIcon>
              <div className={styles.icon}></div>
              <div className={styles.title}>
                <h4 className={styles.h4}>Tributos e Isenções</h4>
              </div>
              <div className={styles.description}>
                <span className={styles.span}>O requerente fica isento de pagar esse imposto anualmente. Este beneficio é válido para veículos 0KM ou semi-novo até R$ 70.000,00.</span>
              </div>
            </CardWithIcon>
          </div>
          <div className="col-md-4">
            <CardWithIcon>
              <div className={styles.icon}></div>
              <div className={styles.title}>
                <h4 className={styles.h4}>Tributos e Isenções</h4>
              </div>
              <div className={styles.description}>
                <span className={styles.span}>O requerente fica isento de pagar esse imposto anualmente. Este beneficio é válido para veículos 0KM ou semi-novo até R$ 70.000,00.</span>
              </div>
            </CardWithIcon>
          </div>
          <div className="col-md-2"></div>
          <div className={styles.line}></div>
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <CardWithIcon>
              <div className={styles.icon}></div>
              <div className={styles.title}>
                <h4 className={styles.h4}>Tributos e Isenções</h4>
              </div>
              <div className={styles.description}>
                <span className={styles.span}>O requerente fica isento de pagar esse imposto anualmente. Este beneficio é válido para veículos 0KM ou semi-novo até R$ 70.000,00.</span>
              </div>
            </CardWithIcon>
          </div>
          <div className="col-md-4">
            <CardWithIcon>
              <div className={styles.icon}></div>
              <div className={styles.title}>
                <h4 className={styles.h4}>Tributos e Isenções</h4>
              </div>
              <div className={styles.description}>
                <span className={styles.span}>O requerente fica isento de pagar esse imposto anualmente. Este beneficio é válido para veículos 0KM ou semi-novo até R$ 70.000,00.</span>
              </div>
            </CardWithIcon>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </section>
  )
}

export default HomeServices 