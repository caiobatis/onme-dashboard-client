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
import { getCalculatorFair, getCalculatorFrente } from '../../actions/calculatorActions'
import LoggedLayout from '../DefaultLayout/LoggedLayout'
import CalculatorFair from './CalculatorFair'
import styles from './Calculator.scss'
import CalculatorFrente from './CalculatorFrente';

function Calculator(props) {

	const {
		fair,
		frente,
		search
	} = props
	
	const [calculator, setCalculator] = useState({
    value: 'fair'
	})

	const [city, setCity] = useState({
    value: 'WL-ONME-SP'
	})

	const cities = [
		{ value: 'WL-ONME-SP', label: 'São Paulo' },
		{ value: 'WL-ONME-BH', label: 'Belo Horizonte' },
		{ value: 'WL-ONME-BLU', label: 'Blumenau' },
		{ value: 'WL-ONME-CPS', label: 'Campinas' },
		{ value: 'WL-ONME-CTB', label: 'Curitiba' },
		{ value: 'WL-ONME-FORTA', label: 'Fortaleza' },
		{ value: 'WL-ONME-POA', label: 'Porto Alegre' },
		{ value: 'WL-ONME-RJ', label: 'Rio de Janeiro' }
	]
	
  function handleChange(event) {
    setCalculator({
      value: event.target.value,
		})
		updateCoins(event.target.value)
	}

  function handleChangeCity(event) {
    setCity({
      value: event.target.value,
		})
		updateCoins(false, event.target.value)
	}

	function updateCoins(_company, _city) {
		const {
			getCalculatorFair,
			getCalculatorFrente
		} = props
		
		const company = (typeof _company === "string" && _company) ? _company : calculator.value

		switch (company) {
			case 'fair':
				getCalculatorFair()
				break;
			case 'frente':
				getCalculatorFair()
				getCalculatorFrente(_city)
				break;
		}
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
			coins={fair ? fair.content : []}
		/> :
		<CalculatorFrente
			search={search}
			coins={frente ? frente.content : []}
			coinsFair={fair ? fair.content : []}
		/>

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
							{
								calculator.value === 'frente' && (
									<FormControl variant="outlined" className={styles.formControl}>
										<InputLabel htmlFor="outlined-city">
											Cidade
										</InputLabel>
										<Select
											value={city.value}
											onChange={handleChangeCity}
											input={<OutlinedInput labelWidth={60} name="city" id="outlined-city" />}
										>
											{
												(cities || []).map((e, i)=> (
													<MenuItem key={i} value={e.value}>{e.label}</MenuItem>
												))
											}
										</Select>
									</FormControl>
								)
							}
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
	search: state.commonsReducer.search,
	fair: state.calculatorReducer.fair,
	frente: state.calculatorReducer.frente
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getCalculatorFair,
	getCalculatorFrente
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)