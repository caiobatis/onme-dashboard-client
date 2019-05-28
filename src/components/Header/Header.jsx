import React, { Component } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Buttons from '../Buttons/Buttons'
import classNames from 'classnames'
import { Sticky } from 'react-sticky'
import Logo from '../Logo/Logo'
import Link from '../Link/Link'
import styles from './Header.scss'



class Header extends Component {

  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  }
  render () {

    const menu = (
      <nav className={styles.menu}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Sobre</Link></li>
          <li><Link to="/">Serviços</Link></li>
          <li><Link to="/">Dúvidas</Link></li>
          <li><Link to="/">Contato</Link></li>
        </ul>
      </nav>
    )
    return (
      <header className={styles.header}>
        <Sticky topOffset={100}>
        {
          ({style, isSticky}) => {
          const navclass = classNames(styles.nav, {
            [styles.fixed]: isSticky
          })
          return (
            <div className={navclass} style={style}>
              <div className="container">
                <div className="row">
                <div className="col-md-12">
                  <div className={styles.buttonBurguer} onClick={this.toggleDrawer('left', true)}>
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                </div>
                  <div className="col-md-6">
                    <div className={styles.brand}>
                      <Logo
                        type={'white'}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    {menu}
                  </div>
                </div>
              </div>
            </div>
          )}
        }
        </Sticky>

        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div className={styles.drawer}>
            <div className={styles.brand}>
              <Logo
                type={'secundary'}
              />
            </div>

            {menu}
          </div>
        </SwipeableDrawer>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={styles.headerContent}>
                <div className="text-center">
                  <h2 className={styles.h2}>Veículo <b>0KM</b> com até <b>30%</b> de desconto</h2>
                  <Buttons
                    type="secundary"
                    border={true}
                    label="solicite seu orçamento"
                    uppercase={true}
                    link={'/'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header