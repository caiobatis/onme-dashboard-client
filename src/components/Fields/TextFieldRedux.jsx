import React, { Component } from 'react';
import { Field } from 'redux-form'
import TextField from '@material-ui/core/TextField'

class TextInput extends Component {
  render () {
    const {
      input: { value, onChange, name},
      id,
      label,
      type
    } = this.props

    return (
      <TextField
        value={value}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id={id}
        label={label}
        name={name}
        autoComplete={type}
        autoFocus
        onChange={onChange}
        {...this.props}
      />    
    )
  }
}

const TextFieldRedux = props => {
  return (
    <Field
      name={props.name}
      component={TextInput}
      type={props.type}
      {...props}
    />
  )
}
export default TextFieldRedux