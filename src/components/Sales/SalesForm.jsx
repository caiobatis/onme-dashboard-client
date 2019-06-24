import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
import { Paper, Avatar, Button, FormControl, Input, InputLabel, Grid, TextField, MenuItem, Stepper, Step, StepLabel, StepContent } from '@material-ui/core'
import FileUploader from "react-firebase-file-uploader"
import { withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import {styles} from '../Profile/Profile'
import withStyles from '@material-ui/core/styles/withStyles'
import { getUserProfile } from '../../actions/commonsActions';
import classes from '../Calculator/Calculator.scss'

const currencies = [
  {
    value: 'frente',
    label: 'Frente',
  },
  {
    value: 'fair',
    label: 'Fair',
  }
]
const _pago = [
  {
    value: true,
    label: 'Sim',
  },
  {
    value: false,
    label: 'Não',
  }
]

function SalesForm (props) {
  const { 
    profile
  } = props

  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [corretora, setCorretora] = useState('fair')
  const [praca, setPraca] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [taxa, setTaxa] = useState('')
  const [total, setTotal] = useState('')
  const [comprovante, setComprovante] = useState('')
  const [pago, setPago] = useState(false)
  const [transporte, setTransporte] = useState('')
  const [dataEnterga, setDataEnterga] = useState('')
  const [recebedor, setRecebedor] = useState('')
  const [custo, setCusto] = useState('')
  const [pagamento, setPagamento] = useState('')
  const [obs, setObs] = useState('')

  const [activeStep, setActiveStep] = useState(0)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    // setName(profile.name)
    // setEmail(profile.email)
    // setAccess(profile.access)
    // setAvatarURL(profile.photoURL)
  }, [profile])

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const steps = [
    {
      title: 'Dados pessoais',
      content: (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <TextField
                  select
                  label="Select"
                  className={classes.textField}
                  value={corretora}
                  onChange={e => setCorretora(e.target.value)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                >
                  {currencies.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="nome">Nome</InputLabel>
                <Input id="nome" name="nome" autoComplete="off" autoFocus value={nome} onChange={e => setNome(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="cpf">CPF</InputLabel>
                <Input id="cpf" name="cpf" autoComplete="off" autoFocus value={cpf} onChange={e => setCpf(e.target.value)} />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    },
    {
      title: 'Dados da Venda',
      content: (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="quantidade">Quantidade</InputLabel>
                <Input id="quantidade" name="quantidade" autoComplete="off" autoFocus 
                value={quantidade} onChange={e => setQuantidade(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="taxa">Taxa</InputLabel>
                <Input id="taxa" autoComplete="off" autoFocus value={taxa} 
                onChange={e => setTaxa(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" disabled required fullWidth>
                <InputLabel htmlFor="total">Total</InputLabel>
                <Input id="total" name="total" autoComplete="off" autoFocus value={total} 
                onChange={e => setTotal(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="comprovante">Comprovante</InputLabel>
                <Input id="comprovante" name="comprovante" autoComplete="off" autoFocus value={comprovante} 
                onChange={e => setComprovante(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <TextField
                  select
                  label="Pago?"
                  className={classes.textField}
                  value={pago}
                  onChange={e => setPago(e.target.value)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                >
                  {_pago.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    },
    {
      title: 'Dados da entrega',
      content: (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="transporte">Transporte</InputLabel>
                <Input id="transporte" name="transporte" autoComplete="off" autoFocus 
                value={transporte} onChange={e => setTransporte(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="dataEnterga">Data de Enterga</InputLabel>
                <Input id="dataEnterga" autoComplete="off" autoFocus value={dataEnterga} 
                onChange={e => setDataEnterga(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="recebedor">Recebedor</InputLabel>
                <Input id="recebedor" name="recebedor" autoComplete="off" autoFocus value={recebedor} 
                onChange={e => setRecebedor(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="comprovante">Comprovante</InputLabel>
                <Input id="comprovante" name="comprovante" autoComplete="off" autoFocus value={comprovante} 
                onChange={e => setComprovante(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="custo">custo</InputLabel>
                <Input id="custo" name="custo" autoComplete="off" autoFocus value={custo} 
                onChange={e => setCusto(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="comprovante">Comprovante</InputLabel>
                <Input id="comprovante" name="comprovante" autoComplete="off" autoFocus value={comprovante} 
                onChange={e => setComprovante(e.target.value)} />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    }
  ]

  return (
    <div>
      <form className={classes.form} onSubmit={e => e.preventDefault() && false }>
        <Paper className={classes.block}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={'label'}>
                <StepLabel>{label.title}</StepLabel>
                <StepContent>
                  {label.content}
                </StepContent>
              </Step>
            ))}
          </Stepper>
          <div className={classes.actionsContainer}>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Voltar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finalizar venda' : 'Continuar'}
              </Button>
            </div>
          </div>

          {/* <Grid container spacing={2}>
            <Grid item xs={3}>
              <Button
                disabled={sending}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={updateProfile}
                className={classes.submit}
              >
                Atualizar perfil
              </Button>
            </Grid>
          </Grid> */}
        </Paper>
      </form>
    </div>
  )

  async function updateProfile() {
  
    // const data = { name, email, avatarURL, access }
    const data = { nome } 
  
    try {
      await firebase.updateProfile(data)
      .then((e) => {
        setTimeout(()=>{
          props.history.replace('/')
        }, 2000)
      })
    } catch(error) {
      alert(error.message)
    }
  }
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SalesForm)))