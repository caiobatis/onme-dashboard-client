import React from 'react'
import { Container, Typography, Avatar } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import UnloggedLayout from '../DefaultLayout/UnloggedLayout';
import Grid from '@material-ui/core/Grid';
import Logo from '../Logo/Logo';
import LoginForm from './LoginForm';
import styles from './Login.scss'

function SignIn(props) {
	return (
		<UnloggedLayout>
      <Container component="main" maxWidth="xs">
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Dashboard
          </Typography>
          <LoginForm
            onSubmit={login}
          />
          <br/>
          <Grid container>
            <Grid item xs>
              <Logo/>
            </Grid>
          </Grid>
        </div>
      </Container>
		</UnloggedLayout>		
	)

	async function login(user) {
		try {
			await firebase.login(user.email, user.password)
			props.history.replace('/')
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(SignIn)