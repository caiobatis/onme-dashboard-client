import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import Login from '../Login/Login'
import Calculator from '../Calculator/Calculator'
import Register from '../Register/Register'
import HomePage from '../HomePage/HomePage'
import ClientsList from '../Clients/ClientsList';
import ClientsCreate from '../Clients/ClientsCreate';
import ClientsListItem from '../Clients/ClientsListItem';
import ClientsEdit from '../Clients/ClientsEdit';
import Profile from '../Profile/Profile';
import SalesIndex from '../Sales/SalesIndex'
import SalesCreate from '../Sales/SalesCreate'
import SalesEdit from '../Sales/SalesEdit'
import ExtractSales from '../Extract/ExtractSales';
import ExtractCosts from '../Extract/ExtractCosts';

class Routes extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/perfil" component={Profile} />
            
            <Route exact path="/calculadora" component={Calculator} />
            
            <Route path='/clientes/edit/:id' component={ClientsEdit} />
            <Route path='/clientes/novo' component={ClientsCreate} />
            <Route path='/clientes/:id' component={ClientsListItem} />
            <Route path='/clientes' component={ClientsList} />

            <Route path='/vendas/criar' component={SalesCreate} />
            <Route path='/vendas/:id' component={SalesEdit} />
            <Route path='/vendas' component={SalesIndex} />

            <Route path='/extrato/vendas' component={ExtractSales} />
            <Route path='/extrato/custos' component={ExtractCosts} />

            <Route exact path="/*" component={Login} />
          </Switch>
        </ScrollToTop>
      </Router>
    )
  }
}

export default Routes