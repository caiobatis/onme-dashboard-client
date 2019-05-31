import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import {
  login
} from '../../actions/loginActions'
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../Logo/Logo';
import LoginForm from './LoginForm';
import styles from './Login.scss'



class Login extends Component {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  submit = values => {
    const {
      login
    } = this.props

    login(values)
  }

  render() {
    
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Dashboard
          </Typography>
          <LoginForm
            onSubmit={this.submit}
          />
          <br/>
          <Grid container>
            <Grid item xs>
              <Logo/>
            </Grid>
          </Grid>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Login);