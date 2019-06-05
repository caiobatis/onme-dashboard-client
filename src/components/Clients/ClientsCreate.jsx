import React, { Component } from 'react'
import firebase from '../../firebase'
import { Link } from 'react-router-dom'
import ClientsForm from './ClientsForm'

class ClientsCreate extends Component {

  constructor() {
    super();
    this.ref = firebase.db.collection('boards');
    this.state = {
      title: '',
      description: '',
      author: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author } = this.state;

    this.ref.add({
      title,
      description,
      author
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: ''
      });
      this.props.history.push("/clientes")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, description, author } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/clientes" className="btn btn-primary">Book List</Link></h4>
            <ClientsForm onSubmit={this.onSubmit}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ClientsCreate;