import React from 'react'
import { reduxForm } from 'redux-form'
import TextFieldRedux from '../Fields/TextFieldRedux'
import Button from '@material-ui/core/Button'

let ClientsForm = props => {
  const { handleSubmit, item } = props
  console.log(item)
  return (
    <form onSubmit={handleSubmit}>
      <TextFieldRedux
        type='text'
        id="name"
        label="Nome"
        name="nome"
      />
      <TextFieldRedux
        type='email'
        id="email"
        label="E-mail"
        name="email"
      />
      <TextFieldRedux
        type='text'
        id="phone"
        label="Telefone"
        name="phone"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Criar / Salvar
      </Button>
    </form>
  )
}

ClientsForm = reduxForm({
  form: 'clients'
})(ClientsForm)

export default ClientsForm