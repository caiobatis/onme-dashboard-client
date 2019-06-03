import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import Login from '../Login/Login'
import Calculator from '../Calculator/Calculator'
import Register from '../Register/Register'
import HomePage from '../HomePage/HomePage'

class Routes extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/calculadora" component={Calculator} />
            <Route exact path="/*" component={Login} />
          </Switch>
        </ScrollToTop>
      </Router>
    )
  }
}

export default Routes