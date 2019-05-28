import React from 'react'
import Slider from 'react-slick'
import styles from './Home.scss'

const HomeChallenger = props => {
      
  const settings = {
    dots: false,
    className: 'center-challenger',
    centerMode: true,
    infinite: true,
    centerPadding: 0,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  }

  return (
    <section className={styles.challenger}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className={styles.h2}>Isenções Conquistadas</h2>
          </div>
          <div className="col-md-12">
            <div className={styles.challengerList}>
              <Slider {...settings}>
                <div className={styles.item}>
                  <div className={styles.image}>
                    <img src="http://www.freeisencoes.com.br/images/4.jpg" alt=""/>
                  </div>
                  <div className={styles.text}>
                    <h4 className={styles.h4}>Juliana dos Santos</h4>
                    <p className={styles.p}>Essa semana foi a vez da Juliana comprar seu carro com isenção no valor final. Nosso cliente é deficiente visual e quem vai dirigir é seu marido, mais um caso de beneficiário não condutor.</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.image}>
                    <img src="http://www.freeisencoes.com.br/images/6.jpg" alt=""/>
                  </div>
                  <div className={styles.text}>
                    <h4 className={styles.h4}>Juliana dos Santos</h4>
                    <p className={styles.p}>Essa semana foi a vez da Juliana comprar seu carro com isenção no valor final. Nosso cliente é deficiente visual e quem vai dirigir é seu marido, mais um caso de beneficiário não condutor.</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.image}></div>
                  <div className={styles.text}>
                    <h4 className={styles.h4}>Juliana dos Santos</h4>
                    <p className={styles.p}>Essa semana foi a vez da Juliana comprar seu carro com isenção no valor final. Nosso cliente é deficiente visual e quem vai dirigir é seu marido, mais um caso de beneficiário não condutor.</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.image}></div>
                  <div className={styles.text}>
                    <h4 className={styles.h4}>Juliana dos Santos</h4>
                    <p className={styles.p}>Essa semana foi a vez da Juliana comprar seu carro com isenção no valor final. Nosso cliente é deficiente visual e quem vai dirigir é seu marido, mais um caso de beneficiário não condutor.</p>
                  </div>
                </div>
              </Slider>                
            </div>
          </div>
        </div>
        

      </div>
    </section>
  )
}

export default HomeChallenger 