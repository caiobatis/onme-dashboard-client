import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import ScrollToTop from './ScrollToTop'
import Login from '../Login/Login'
import Calculator from '../Calculator/Calculator';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/calculadora" component={Calculator} />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

export default Routes