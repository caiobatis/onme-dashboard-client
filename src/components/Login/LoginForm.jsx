import React from 'react'
import { reduxForm } from 'redux-form'
import TextFieldRedux from '../Fields/TextFieldRedux';
import Button from '@material-ui/core/Button';


let LoginForm = props => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <TextFieldRedux
        type='email'
        id="email"
        label="Email Address"
        name="email"
      />
      <TextFieldRedux
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Entrar
      </Button>
    </form>
  )
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm)

export default LoginForm