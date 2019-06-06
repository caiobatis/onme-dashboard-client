import React, { useEffect, useState } from 'react'
import {
	Home as HomeIcon,
	Whatshot as WhatshotIcon
} from '@material-ui/icons'
import { 
	Typography,
	Breadcrumbs,
	OutlinedInput,
	Grid,
	InputLabel,
	Select,
	FormControl,
	MenuItem,
	Link
} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../../firebase'
import { withRouter } from 'react-router-dom'
import LoggedLayout from '../DefaultLayout/LoggedLayout'
import CalculatorFair from './CalculatorFair'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
			width: "100%",
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		padding: `${theme.spacing(2)}px 0`,
	},
	formControl: {
		minWidth: 200,
	},
})

function Calculator(props) {
	const { classes } = props

	const [calculator, setCalculator] = useState({
    value: 'fair'
	})
	
  function handleChange(event) {
    setCalculator({
      value: event.target.value,
		})
	}
	
	let content = calculator.value === 'fair' ? <CalculatorFair/> : <div className="a"></div>

	return (
		<LoggedLayout 
			title='Calculadora'
			search={true}
		>
			<main className={classes.main}>
				<Grid item xs={6}>
					<Breadcrumbs aria-label="Breadcrumb">
						<Link color="inherit" href="/" className={classes.link}>
							<HomeIcon className={classes.icon} />
							Inicio
						</Link>
						<Link
							color="inherit"
							href="/"
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
				<div style={{padding: "20px 0"}}>
					<Grid item xs={12}>
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel htmlFor="outlined-age-simple">
								Calculadora
							</InputLabel>
							<Select
								value={calculator.value}
								onChange={handleChange}
								input={<OutlinedInput labelWidth={100} name="calculator" id="outlined-age-simple" />}
							>
								<MenuItem value={'fair'}>Modelo Fair</MenuItem>
								<MenuItem value={'frente'}>Modelo Frente</MenuItem>
							</Select>
						</FormControl>
					</Grid>

				</div>
				{ content }
			</main>
		</LoggedLayout>
	)
}

export default withRouter(withStyles(styles)(Calculator))