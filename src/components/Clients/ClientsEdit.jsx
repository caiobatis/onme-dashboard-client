import React, { Component } from 'react'
import firebase from '../../firebase'
import { Link } from 'react-router-dom'
import ClientsForm from './ClientsForm'

class ClientsEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      email: '',
      phone: ''
    }
  }

  componentDidMount() {
    const ref = firebase.db.collection('clients').doc(this.props.match.params.id)

    ref.get().then((doc) => {
      if (doc.exists) {
        const clients = doc.data()

        this.setState({
          key: doc.id,
          name: clients.name,
          email: clients.email,
          phone: clients.phone
        });
      } else {
        console.log("No such document!")
      }
    })
  }

  onChange = (e) => {
    const state = this.state

    state[e.target.name] = e.target.value
    
    this.setState({
      client: state
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    const updateRef = firebase
      .db
      .collection('clients')
      .doc(this.state.key)

    updateRef.set({
      name,
      email,
      phone
    })
    .then(docRef => {
      this.setState({
        key: '',
        name: '',
        email: '',
        phone: ''
      })
      this.props.history.push("/clientes/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error)
    })
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/clientes/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
            <ClientsForm onSubmit={this.onSubmit} item={this.state}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ClientsEdit