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
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import classes from '../Calculator/Calculator.scss'
import { getAddress } from '../../actions/salesActions';

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

function validateForm(form) {
  if(!form.nome) {
    alert('Por favor preencha o nome')
    return false
  }
  if(!form.corretora) {
    alert('Por favor insira a corretora')
    return false
  }
  if(!form.cpf) {
    alert('Por favor preencha o CPF')
    return false
  }
  if(!form.quantidade) {
    alert('Por favor preencha a quantidade')
    return false
  }
  if(!form.taxa) {
    alert('Por favor preencha a taxa')
    return false
  }
  if(!form.moeda) {
    alert('Por favor preencha a moeda')
    return false
  }
  if(!form.dataEntrega) {
    alert('Por favor preencha a data de entrega')
    return false
  }
  if(!form.transporte) {
    alert('Por favor preencha o transporte')
    return false
  }
  if(!form.cep) {
    alert('Por favor preencha o CEP')
    return false
  }
  if(!form.endereco) {
    alert('Por favor preencha o endereço')
    return false
  }
  if(!form.numero) {
    alert('Por favor preencha o numero')
    return false
  }
  return true
}

function FormatDate(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/]}
      placeholderChar={'\u2000'}
      showMask
    />
  )
}

function TaxaFormat(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
      placeholderChar={'\u2000'}
      showMask
    />
  )
}

function CepFormat(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-9]/, /[0-9]/, /[0-9]/,/[0-9]/,/[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/]}
      placeholderChar={'\u2000'}
      showMask
    />
  )
}

function FormatCPF(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
      showMask
    />
  )
}

function MoneyFormatCustom(props) {
  const { inputRef, onChange, prefix, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix={'R$'}
    />
  );
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, prefix, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix={prefix}
    />
  );
}

function SalesForm (props) {
  const { 
    item,
    edit
  } = props

  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('-')
  const [corretora, setCorretora] = useState('fair')
  const [praca, setPraca] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [taxa, setTaxa] = useState('')
  const [moeda, setMoeda] = useState('')
  const [total, setTotal] = useState('')
  const [comprovante, setComprovante] = useState('')
  const [pago, setPago] = useState(false)
  const [entregue, setEntregue] = useState(false)
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState('')
  const [numero, setNumero] = useState('')
  const [cidade, setCidade] = useState('')
  const [transporte, setTransporte] = useState('')
  const [dataEntrega, setdataEntrega] = useState('01012019')
  const [recebedor, setRecebedor] = useState('')
  const [custo, setCusto] = useState('')
  const [obs, setObs] = useState('')

  const [activeStep, setActiveStep] = useState(0)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setTotal(quantidade * taxa)
  }, [taxa, quantidade])
  
  useEffect(() => {

    if(item) {
      setNome(item.nome)
      setCpf(item.cpf)
      setCorretora(item.corretora)
      setPraca(item.praca)
      setQuantidade(item.quantidade)
      setTaxa(item.taxa)
      setMoeda(item.moeda)
      setTotal(item.total)
      setComprovante(item.comprovante)
      setPago(item.pago)
      setEntregue(item.entregue)
      setCep(item.cep)
      setEndereco(item.endereco)
      setNumero(item.numero)
      setCidade(item.cidade)
      setTransporte(item.transporte)
      setdataEntrega(item.dataEntrega)
      setRecebedor(item.recebedor)
      setCusto(item.custo)
      setObs(item.obs)
    }
  }, [item])


  useEffect(() => {
    if(cep) {
      const _cep = cep.replace(' ', '').replace('-', '').replace(' ', '')
      if(_cep.length === 8) {
        let infos = getAddress(_cep)
        infos.then(adr =>{
          setEndereco(adr.logradouro ? adr.logradouro : '')
          setCidade(adr.localidade ? adr.localidade : '')
        })
      }
    }

  }, [cep])

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleSubmit() {
    submitForm()
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
                <Input id="nome"
                  name="nome"
                  autoComplete="off"
                  autoFocus
                  value={nome}
                  onChange={e => setNome(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="cpf">CPF</InputLabel>
                <Input id="cpf"
                  name="cpf"
                  autoComplete="off"
                  autoFocus
                  inputComponent={FormatCPF}
                  value={cpf}
                  onChange={e => setCpf(e.target.value)} />
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
                <InputLabel htmlFor="moeda">Moeda</InputLabel>
                <Input 
                  id="moeda"
                  name="moeda"
                  autoComplete="off" autoFocus
                  value={moeda}
                  onChange={e => setMoeda(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="quantidade">Quantidade</InputLabel>
                <Input 
                  id="quantidade"
                  name="quantidade"
                  autoComplete="off" autoFocus
                  value={quantidade}
                  inputComponent={NumberFormatCustom}
                  onChange={e => setQuantidade(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="taxa">Taxa</InputLabel>
                <Input id="taxa"
                autoComplete="off"
                autoFocus value={taxa} 
                inputComponent={TaxaFormat}
                onChange={e => setTaxa(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" disabled required fullWidth>
                <InputLabel htmlFor="total">Total</InputLabel>
                <Input id="total" name="total" autoComplete="off" autoFocus value={total}
                  inputComponent={NumberFormatCustom}/>
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
            <Grid item xs={2} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="cep">CEP</InputLabel>
                <Input id="cep" name="cep" autoComplete="off" autoFocus 
                inputComponent={CepFormat}
                value={cep} onChange={e => setCep(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={4} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="endereco">Endereço</InputLabel>
                <Input id="endereco" name="endereco" autoComplete="off" autoFocus 
                value={endereco} onChange={e => setEndereco(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={2} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="numero">Numero</InputLabel>
                <Input id="numero" name="numero" autoComplete="off" autoFocus 
                value={numero} onChange={e => setNumero(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="cidade">Cidade</InputLabel>
                <Input id="cidade" name="cidade" autoComplete="off" autoFocus 
                value={cidade} onChange={e => setCidade(e.target.value)} />
              </FormControl>
            </Grid>
          </Grid>
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
                <InputLabel htmlFor="dataEntrega">Data de Enterga</InputLabel>
                <Input id="dataEntrega" autoComplete="off" autoFocus value={dataEntrega}
                  inputComponent={FormatDate}
                onChange={e => setdataEntrega(e.target.value)} />
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
              <FormControl margin="normal" required fullWidth>
                <TextField
                  select
                  label="Entregue?"
                  className={classes.textField}
                  value={entregue}
                  onChange={e => setEntregue(e.target.value)}
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
            <Grid item xs={3} >
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="custo">Custo</InputLabel>
                <Input id="custo" name="custo"
                  autoComplete="off" 
                  value={custo} 
                  inputComponent={MoneyFormatCustom}
                  autoFocus 
                  onChange={e => setCusto(e.target.value)} />

              </FormControl>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="obs">Observação</InputLabel>
                <Input id="obs" name="obs" autoComplete="off" autoFocus value={obs} 
                onChange={e => setObs(e.target.value)} />
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
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? (edit ? 'Atualizar venda' :'Finalizar venda') : 'Continuar'}
              </Button>
            </div>
          </div>
        </Paper>
      </form>
    </div>
  )

  async function submitForm() {
    const data = { 
      nome,
      cpf,
      corretora,
      praca,
      quantidade,
      taxa,
      total,
      comprovante,
      pago,
      transporte,
      dataEntrega,
      recebedor,
      custo,
      entregue,
      obs,
      moeda,
      cep,
      endereco,
      numero,
      entregue,
      cidade
     }

     if(validateForm(data)) {

      if(edit) {
        const updateRef = firebase.db.collection('sales').doc(props.match.params.id)
    
        updateRef.set(data)
        .then(docRef => {
          alert('Venda atualizada com sucesso')
          props.history.push("/vendas")
        })
        .catch((error) => {
          console.error("Error adding document: ", error)
        })


      } else {

        try {
          await firebase.createSales(data)
          .then((e) => {
           alert('Venda criada com sucesso')
            setTimeout(()=>{
              props.history.push("/vendas")
            }, 2000)
          })
        } catch(error) {
          alert(error.message)
        }
      }
    }



  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SalesForm)))