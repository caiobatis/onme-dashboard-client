import React, { Component } from 'react'
import LoggedLayout from '../DefaultLayout/LoggedLayout';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import moment from 'moment'
import firebase from '../../firebase';
import styles from './extract.scss'


export default class ExtractSales extends Component {

  constructor(props) {
    super()
    this.state = {
      sales: [],
      initialDate: moment().format("YYYY-MM-DD"),
      finishDate: moment().format("YYYY-MM-DD")
    }

    this.ref = firebase.db.collection('sales').where("firstDay", ">=", 1561950000)
  }
  
  onCollectionUpdate = (querySnapshot) => {
    const sales = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      if(data.lastDay <= 1564542000)
        sales.push({...data, id: doc.id});
    })
    this.setState({
      sales
    })
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }


  render() {
    const {
      sales,
      initialDate,
      finishDate
    } = this.state


    let total = 0
    sales.map(item => {
      total = item.total + total
    })

    return (
      <LoggedLayout title="Extrato de vendas">
        <main className={styles.main}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                id="initialDate"
                label="Data inicial"
                type="date"
                defaultValue={initialDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="finishDate"
                label="Data final"
                type="date"
                defaultValue={finishDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <br/>
          <br/>
          <br/>
          <Grid container spacing={2}>
            <Grid item xs={3}>
  
            {
              sales.map(e=> (
                <p>{moment.unix(e.data_sale).format("YYYY-MM-DD")}</p>
              ))
            }
            </Grid>
            <Grid item xs={3}>
              <h4>Valor total</h4>
              <h2>R$ {total}</h2>
            </Grid>
          </Grid>
        </main>
      </LoggedLayout>
    )
  }
}