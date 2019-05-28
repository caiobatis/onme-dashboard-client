import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import {
  sendContact
} from '../../actions/contactActions'
import ContactForm from '../Contact/ContactForm'
import styles from './Contact.scss'

class Contact extends Component {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  submit = values => {
    this.props.sendContact(values)
  }

  render() {
    return (
      <section className={styles.contact}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className={styles.h2}>Contato</h2>
              <p className={styles.title}>Aguardamos o seu contato por qualquer que seja o canal</p>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <br/>
              <div className={styles.uppercase}>
                <p className={styles.p}>
                  Av. Senador Feijó, 686 - cj. 615 <br/>
                  The Blue Office Mall <br/><br/>
                  Santos, São Paulo <br/><br/>
                  CEP:11015-504
                </p>
                <p className={styles.p}>
                  (13) 3222.3722 <br/><br/>
                  (13) 95538.0601 <br/><br/>
                  (13) 98852.5405 <br/><br/>
                  (13) 99654.5993
                </p>
                <p className={styles.p}><b>atendimento@freeisencoes.com.br</b></p>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form">
                <br/>
                <div className="text-center">
                  <p className={styles.p}><b>Escreva para nós que <br/> responderemos logo em seguida</b></p>
                </div>
                <ContactForm onSubmit={this.submit} />
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </section>
    )
  }
}


const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => bindActionCreators({
  sendContact
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Contact);