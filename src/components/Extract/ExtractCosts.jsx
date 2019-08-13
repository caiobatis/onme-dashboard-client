import React, { Component } from 'react'
import LoggedLayout from '../DefaultLayout/LoggedLayout';
import firebase from '../../firebase';
import styles from './extract.scss'
import moment from 'moment'

export default class ExtractCosts extends Component {

  constructor(props) {
    super()
    this.state = {
      sales: []
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

    return (
      <LoggedLayout title="Extrato de custos">
        <main className={styles.main}>
          {
            this.state.sales.map(e=> (
              <p>{moment.unix(e.data_sale).format("YYYY-MM-DD")}</p>
            ))
          }
        </main>
      </LoggedLayout>
    )
  }
}
