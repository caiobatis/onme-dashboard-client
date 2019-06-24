import React, { Component } from 'react'
import LoggedLayout from '../DefaultLayout/LoggedLayout';
import { Grid, Breadcrumbs, Link } from '@material-ui/core';
import {
  Home as HomeIcon
} from '@material-ui/icons'
import SalesForm from './SalesForm'
import styles from '../Calculator/Calculator.scss'

export default class SalesCreate extends Component {
  render() {
    return (
      <LoggedLayout title="Vendas">
        <main className={styles.main}>
          <Grid item xs={6}>
            <Breadcrumbs aria-label="Breadcrumb">
              <Link color="inherit" href="/" className={styles.link}>
                <HomeIcon className={styles.icon} />
                Inicio
              </Link>
              <Link
                color="inherit"
                href="/"
                className={styles.link}
              >
                Vendas
              </Link>
            </Breadcrumbs>
          </Grid>
          <SalesForm/>
        </main>
      </LoggedLayout>
    )
  }
}
