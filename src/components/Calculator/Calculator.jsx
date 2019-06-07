import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
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
import { getCalculatorFair } from '../../actions/calculatorActions'
import LoggedLayout from '../DefaultLayout/LoggedLayout'
import CalculatorFair from './CalculatorFair'
import styles from './Calculator.scss'

function Calculator(props) {
	
	const [calculator, setCalculator] = useState({
    value: 'fair'
	})
	
  function handleChange(event) {
    setCalculator({
      value: event.target.value,
		})
	}
	useEffect(() => {
		props.getCalculatorFair()
  })
	
	let content = 
		calculator.value === 'fair' ?
		<CalculatorFair
			search={props.search}
		/> : 
		<div className="a">
			calculadora frente
		</div>

	return (
		<LoggedLayout 
			title='Calculadora'
			search={true}
		>
			<main className={styles.main}>
				<Grid item xs={6}>
					<Breadcrumbs aria-label="Breadcrumb">
						<Link color="inherit" href="/" className={styles.link}>
							<HomeIcon className={styles.icon} />
							Inicio
						</Link>
						<Link
							color="inherit"
							href="/"
							className={styles.link}
						>
							<WhatshotIcon className={styles.icon} />
							Calculadora
						</Link>
						<Typography color="textPrimary" className={styles.link}>
							{calculator.value.toUpperCase()}
						</Typography>
					</Breadcrumbs>
				</Grid>
				<div style={{padding: "20px 0"}}>
					<Grid item xs={12}>
						<FormControl variant="outlined" className={styles.formControl}>
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

const mapStateToProps = state => ({
	...state,
	search: state.commonsReducer.search
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getCalculatorFair
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)