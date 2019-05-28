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
            <div className="col-md-5">
              <div className="form">
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