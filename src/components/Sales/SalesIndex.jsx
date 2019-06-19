import React, { Component } from 'react'
import LoggedLayout from '../DefaultLayout/LoggedLayout';
import { Grid, Breadcrumbs, Link, Typography, Button } from '@material-ui/core';
import {
  Home as HomeIcon
} from '@material-ui/icons'
import styles from '../Calculator/Calculator.scss'

export default class SalesIndex extends Component {
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
          <div style={{padding: "20px 0"}}>
            <Grid container>
              <Grid item xs={12}>
                <div className={styles.alignRigth}>
                  <Button
                    className={styles.secundary}
                  >
                    Nova venda
                  </Button>
                </div>
              </Grid>
            </Grid>

          </div>
          
          
        </main>
      </LoggedLayout>
    )
  }
}
