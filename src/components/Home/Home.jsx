import React, { Component } from 'react'
import { StickyContainer } from 'react-sticky'
import Header from '../Header/Header'
import AsyncScriptLoader from '../../lib/AsyncScriptLoader'
import Logo from '../Logo/Logo'
import HomeServices from './HomeServices'
import Slider from 'react-slick'
import HomeWhy from './HomeWhy'
import HomeRight from './HomeRight'
import HomeChallenger from './HomeChallenger'
import Buttons from '../Buttons/Buttons'
import Footer from '../Footer/Footer'
import Contact from '../Contact/Contact'

import styles from './Home.scss'


class Routes extends Component {
  render() {

    const settings = {
      dots: false,
      infinite: false,
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
  
    AsyncScriptLoader('https://www.powr.io/powr.js?platform=html')

    const vehicles = [
      {
        id: 1,
        image: 'https://www.chevroletnova.com.br/Upload/CorReferente_16112017084454.png',
        brand: 'Chevrolet',
        model: 'Onix 1.0 Flex'
      },
      {
        id: 1,
        image: 'https://argo.fiat.com.br/threevideos/argo-back-desk.png',
        brand: 'FIAT',
        model: 'Argo 1.5 Flex 4P'
      },
      {
        id: 1,
        image: 'https://catalogo.webmotors.com.br/imagens/prod/347576/HYUNDAI_HB20_1.0_COPA_DO_MUNDO_FIFA_12V_FLEX_4P_MANUAL_34757609192170484.png',
        brand: 'Hyundai',
        model: 'HB20 1.0 Flex'
      },
      {
        id: 1,
        image: 'https://www.chevroletnova.com.br/Upload/CorReferente_16112017084454.png',
        brand: 'Chevrolet',
        model: 'Onix 1.0 Flex'
      }
    ]

    return (
      <div className={styles.home}>
        <StickyContainer>
          <Header/>
          <HomeWhy/>
          <HomeServices/>
          <HomeRight/>
          <HomeChallenger/>
          <section className={styles.aboutUs}>
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <div className={styles.logoCenter}>
                    <Logo
                      type={'secundary'}
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <h2 className={styles.h2}>Quem somos</h2>
                  <div className={styles.text}>
                    <i>A Free Isenções é uma empresa de Santos, especializada no processo de isenções que conta com uma equipe de atendimento qualificada e empenhada em garantir que os direitos de seus clientes sejam exercidos de acordo com a legislação brasileira.</i> <br/> <br/>
                    <p className={styles.p}>
                      <b>Nossa missão</b> é proporcionar um atendimento eficiente e eficaz a nossos clientes, garantindo sua satisfação acerca de nossos serviços. <br/> <br/>
                      <b>Nossa visão</b> é ser referência no mercado de assessoria ao público PCD acerca de isenção. <br/> <br/>
                      Buscamos proporcionar a <b>facilidade e agilidade</b> a nossos clientes acerca da burocracia que envolve esse tipo de processo. <br/> <br/>
                      O respeito e exercício de nossos direitos como cidadãos é a nossa preocupação! <br/><br/>
                      <strong>Você tem o direito e a Free, isenções.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.socials}>
            <div className="container">
              <div className="text-center">
                <h2 className={styles.h2}>Acompanhe as novidades da Free Isenções nas midias sociais</h2>
              </div>
            </div>
            <div className="container">
              <div className="powr-social-feed" id="230093b0_1555424118"></div>
            </div>
            <div className="container">
              <div className={styles.flex}>
                <h4 className={styles.h4}>curta no face</h4>
                <div className={styles.icon}>
                  <a href="https://www.facebook.com/freeisencoessantos/" target="_blank" rel="noopener noreferrer" >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
                <div className={styles.icon}>
                  <a href="https://www.instagram.com/freeisencoes/" target="_blank" rel="noopener noreferrer" >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
                <h4 className={styles.h4}>curta no insta</h4>
              </div>
            </div>
          </section>
          <section className={styles.vehicles}>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2 className={styles.h2}>Veículos</h2>
                </div>
                <div className="col-md-12">
                  <div className={styles.items}>
                    <Slider {...settings}>
                      {
                        vehicles.map((item, i)=> (
                          <div className={styles.item} key={i}>
                            <div className={styles.image}>
                              <img src={item.image} alt=""/>
                            </div>
                            <div className={styles.text}>
                              <div className={styles.brand}>{item.brand}</div>
                              <div className={styles.model}>{item.model}</div>
                            </div>
                            <div className={styles.actions}>
                              <Buttons
                                label='Eu quero'
                                type='primary'
                              />
                            </div>
                          </div>
                        ))
                      }
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Contact/>
          <Footer/>
        </StickyContainer>
      </div>
    )
  }
}

export default Routes