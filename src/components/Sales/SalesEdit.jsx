import React, { Component } from 'react'
import LoggedLayout from '../DefaultLayout/LoggedLayout';
import { Grid, Breadcrumbs } from '@material-ui/core';
import firebase from '../../firebase'
import { Link } from 'react-router-dom'
import {
  Home as HomeIcon
} from '@material-ui/icons'
import SalesForm from './SalesForm'
import styles from '../Calculator/Calculator.scss'

export default class SalesEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {}
    }
  }
  
  componentDidMount() {
    const ref = firebase.db.collection('sales').doc(this.props.match.params.id)

    ref.get().then((doc) => {
      if (doc.exists) {
        const clients = doc.data()

        this.setState({
          item: {
            id: doc.id, 
            ...clients
          }
        });
      } else {
        console.log("No such document!")
      }
    })
  }
  render() {
    console.log(this.state.item)
    return (
      <LoggedLayout title="Vendas">
        <main className={styles.main}>
          <Grid item xs={6}>
            <Breadcrumbs aria-label="Breadcrumb">
              <Link color="inherit" to="/" className={styles.link}>
                <HomeIcon className={styles.icon} />
                Inicio
              </Link>
              <Link
                to="/vendas"
                color="inherit"
                className={styles.link}
              >
                Vendas
              </Link>
            </Breadcrumbs>
          </Grid>
          <SalesForm
            item={this.state.item}
            edit={true}
          />
        </main>
      </LoggedLayout>
    )
  }
}
