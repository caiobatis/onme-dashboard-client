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
	Link,
	Button
} from '@material-ui/core'
import { getCalculatorFair } from '../../actions/calculatorActions'
import LoggedLayout from '../DefaultLayout/LoggedLayout'
import CalculatorFair from './CalculatorFair'
import styles from './Calculator.scss'

function Calculator(props) {

	const {
		fair,
		search
	} = props
	
	const [calculator, setCalculator] = useState({
    value: 'fair'
	})
	
  function handleChange(event) {
    setCalculator({
      value: event.target.value,
		})
	}

	function updateCoins() {
		const {
			getCalculatorFair
		} = props
	
		calculator.value === 'fair' && getCalculatorFair()
	}

	useEffect(() => {
		const {
			getCalculatorFair
		} = props

		getCalculatorFair()
  }, [])
	
	let content = 
		calculator.value === 'fair' ?
		<CalculatorFair
			search={search}
			coins={fair.content}
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
					<Grid container>
					<Grid item xs={8}>
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
					<Grid item xs={4}>
						<div className={styles.alignRigth}>
							<Button 
								onClick={updateCoins}
								className={styles.secundary}
							>
								Atualizar
							</Button>
						</div>
					</Grid>
					</Grid>

				</div>
				{ content }
			</main>
		</LoggedLayout>
	)
}

const mapStateToProps = state => ({
	...state,
	search: state.commonsReducer.search,
	fair: state.calculatorReducer.fair
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getCalculatorFair
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)