// import React from 'react';
// import LoggedLayout from '../DefaultLayout/LoggedLayout';
// import CalculatorFair from './CalculatorFair';

// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Breadcrumbs from '@material-ui/core/Breadcrumbs';
// import Link from '@material-ui/core/Link';
// import HomeIcon from '@material-ui/icons/Home';
// import WhatshotIcon from '@material-ui/icons/Whatshot';
// import Grid from '@material-ui/core/Grid';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import firebase from '../../firebase'

// import styles from './Calculator.scss'


// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(1, 2),
//   },
//   link: {
//     display: 'flex',
//   },
//   icon: {
//     marginRight: theme.spacing(0.5),
//     width: 20,
//     height: 20,
//   },
//   formControl: {
//     minWidth: 200,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// function handleClick(event) {
//   event.preventDefault();
//   alert('You clicked a breadcrumb.');
// }

// export default function Calculator () {
//   const classes = useStyles();

//   const [values, setValues] = React.useState({
//     age: '',
//     name: 'hai',
//   });

//   const inputLabel = React.useRef(null);
//   const [labelWidth, setLabelWidth] = React.useState(0);
//   React.useEffect(() => {
//     setLabelWidth(inputLabel.current.offsetWidth);
//   }, []);

//   function handleChange(event) {
//     setValues(oldValues => ({
//       ...oldValues,
//       [event.target.name]: event.target.value,
//     }));
//   }

//   return (
//     <LoggedLayout
//       title="Calculadora"
//     >
//       <Grid item xs={6}>
//         <Breadcrumbs aria-label="Breadcrumb">
//           <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
//             <HomeIcon className={classes.icon} />
//             Inicio
//           </Link>
//           <Link
//             color="inherit"
//             href="/getting-started/installation/"
//             onClick={handleClick}
//             className={classes.link}
//           >
//             <WhatshotIcon className={classes.icon} />
//             Calculadora
//           </Link>
//           <Typography color="textPrimary" className={classes.link}>
//             Fair
//           </Typography>
//         </Breadcrumbs>
//       </Grid>

//       <Grid item xs={12}>
//         <FormControl variant="outlined" className={classes.formControl}>
//           <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
//             Calculadora
//           </InputLabel>
//           <Select
//             value={values.age}
//             onChange={handleChange}
//             input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
//           >
//             <MenuItem value={10}>Modelo Fair</MenuItem>
//             <MenuItem value={20}>Modelo Frente</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>

//       <Grid item xs={12}>
//         <CalculatorFair/>


//         { this.firebase.getCurrentUserName() }
//       </Grid>
      
//     </LoggedLayout>
//   )
// }




import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../../firebase'
import { withRouter } from 'react-router-dom'
import LoggedLayout from '../DefaultLayout/LoggedLayout';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
	},
	avatar: {
		margin: theme.spacing(),
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing(3),
	},
})

function Calculator(props) {
	const { classes } = props

	if(!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.history.replace('/login')
		return null
	}

	const [quote, setQuote] = useState('')

	useEffect(() => {
		firebase.getCurrentUserQuote().then(setQuote)
	})

	return (
		<LoggedLayout 
			title='Calculadora'
			search={true}
		>
			<main className={classes.main}>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<VerifiedUserOutlined />
					</Avatar>
					<Typography component="h1" variant="h5">
						Hello { firebase.getCurrentUsername() }
					</Typography>
					<Typography component="h1" variant="h5">
						Your quote: {quote ? `"${quote}"` : <CircularProgress size={20} />}
					</Typography>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						onClick={logout}
						className={classes.submit}>
						Logout
					</Button>
				</Paper>
			</main>
		</LoggedLayout>
	)

	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}
}

export default withRouter(withStyles(styles)(Calculator))