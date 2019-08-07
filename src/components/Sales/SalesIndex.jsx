import React, { Component } from 'react'
import LoggedLayout from '../DefaultLayout/LoggedLayout';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Grid, Breadcrumbs, Link, Typography, Button } from '@material-ui/core';
import {
  Home as HomeIcon
} from '@material-ui/icons'
import firebase from '../../firebase';
import styles from '../Calculator/Calculator.scss'

export default class SalesIndex extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.db.collection('sales');
    this.unsubscribe = null;
    this.state = {
      sales: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const sales = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      sales.push({...data, id: doc.id});
    });
    this.setState({
      sales
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    function createData(name, paymentOk, fat, carbs, protein, deliveryOk) {
      return { name, paymentOk, fat, carbs, protein, deliveryOk };
    }
    
    const rows = [
      createData('Frente', true, 6.0, 24, 4.0),
      createData('Frente', false, 9.0, 37, 4.3),
      createData('Fair', true, 16.0, 24, 6.0, true),
      createData('Frente', true, 3.7, 67, 4.3, true),
      createData('Fair', false, 16.0, 49, 3.9),
    ]
    console.log(this.state.sales)

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
          <div className={styles.listing}>
            <Grid item xs={12}>
              <Paper className={styles.paper}>
                <Table className={styles.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Corretora</TableCell>
                      <TableCell>Cliente</TableCell>
                      <TableCell>Moeda</TableCell>
                      <TableCell>Entrega</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.sales.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          <div className={styles.cod}>{row.name}</div>
                        </TableCell>
                        <TableCell>
                          <div className={styles.client}>
                            <p className={styles.p}>{row.nome}</p>
                            <span className={styles.span}>{row.cpf}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={styles.coin}>
                            <p className={styles.p}><b>{row.moeda} {row.quantidade}</b></p>
                            <span className={styles.span}>Taxa {row.taxa} | { row.pago ? <b className={styles.paymentOk}>Pago</b> : <b>Não pago</b> }</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={styles.send}>
                            <p className={styles.p}>Rua Bento Rodrigues, 177 - 04939120 - São Paulo</p>
                            <span className={styles.span}>{row.dataEntrega} | { row.entregue ? <b className={styles.deliveryOk}>Entregue</b> : <b>Não entregue</b> }</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            className={styles.editItem}
                          >
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </div>
          
        </main>
      </LoggedLayout>
    )
  }
}
