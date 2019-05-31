import React, { Component } from 'react';
import LoggedLayout from '../DefaultLayout/LoggedLayout';
import CalculatorFair from './CalculatorFair';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import styles from './Calculator.scss'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  formControl: {
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function handleClick(event) {
  event.preventDefault();
  alert('You clicked a breadcrumb.');
}

export default function Calculator () {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    age: '',
    name: 'hai',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <LoggedLayout
      title="Calculadora"
    >
      <Grid item xs={6}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
            <HomeIcon className={classes.icon} />
            Inicio
          </Link>
          <Link
            color="inherit"
            href="/getting-started/installation/"
            onClick={handleClick}
            className={classes.link}
          >
            <WhatshotIcon className={classes.icon} />
            Calculadora
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            Fair
          </Typography>
        </Breadcrumbs>
      </Grid>

      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Calculadora
          </InputLabel>
          <Select
            value={values.age}
            onChange={handleChange}
            input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
          >
            <MenuItem value={10}>Modelo Fair</MenuItem>
            <MenuItem value={20}>Modelo Frente</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <CalculatorFair/>
      </Grid>
      
    </LoggedLayout>
  )
}
