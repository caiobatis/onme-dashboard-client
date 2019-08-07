import React, { Component } from 'react'
import LoggedLayout from '../DefaultLayout/LoggedLayout';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Grid, Breadcrumbs, Typography, Button } from '@material-ui/core';
import {
  Home as HomeIcon
} from '@material-ui/icons'
import firebase from '../../firebase';
import { Link } from 'react-router-dom'
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

                <Link
                  to="/vendas/criar"
                  color="inherit"
                  className={styles.link}
                >
                  <Button
                    className={styles.secundary}
                  >
                    Nova venda
                  </Button>
                </Link>                  
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
                          <div className={styles.cod}>{row.nome.split('')[0]}</div>
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
                            <p className={styles.p}>{row.endereco}, {row.numero} - {row.cep} - {row.cidade}</p>
                            <span className={styles.span}>{row.dataEntrega} | { row.entregue ? <b className={styles.deliveryOk}>Entregue</b> : <b>Não entregue</b> }</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <Link
                            to={`/vendas/${row.id}`}
                          >
                            <Button
                              className={styles.editItem}
                            >
                              Editar
                            </Button>
                          </Link>
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
