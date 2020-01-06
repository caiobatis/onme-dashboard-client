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
import { getCalculatorFair, getCalculatorFrente, getCalculatorSagitur, getCalculatorVision } from '../../actions/calculatorActions'
import LoggedLayout from '../DefaultLayout/LoggedLayout'
import CalculatorFair from './CalculatorFair';
import CalculatorFrente from './CalculatorFrente';
import CalculatorSagitur from "./CalculatorSagitur";
import CalculatorVision from "./CalculatorVision";
import styles from './Calculator.scss';


function Calculator(props) {
	const {
		fair,
		frente,
		sagitur,
		vision,
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
			getCalculatorFrente,
			getCalculatorSagitur,
			getCalculatorVision
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
			case 'sagitur':
				getCalculatorFair()
				getCalculatorSagitur()
			case 'vision':
				getCalculatorFair()
				getCalculatorVision()
		}
	}
	function selectedCalculator() {
		switch (calculator.value) {
			case 'fair':
				return <CalculatorFair
						search={search}
						coins={fair ? fair.content : []}
					/>

			case 'frente':
				return <CalculatorFrente
					search={search}
					coins={frente ? frente.content : []}
					coinsFair={fair ? fair.content : []}
				/>
	
			case 'sagitur':
				return <CalculatorSagitur
					search={search}
					coinsSagitur={sagitur ? sagitur.content : []}
				/>
			case 'vision':
				return <CalculatorVision
					search={search}
					coinsVision={vision ? vision.content : []}
				/>
			default:
				break;
		}
	}

	useEffect(() => {
		const {
			getCalculatorFair
		} = props

		getCalculatorFair()
	}, [])
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
			<div style={{ padding: "20px 0" }}>
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
								<MenuItem value={'sagitur'}>Modelo Sagitur</MenuItem>
								<MenuItem value={'vision'}>Modelo Vision</MenuItem>
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
											(cities || []).map((e, i) => (
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
			{selectedCalculator()}
		</main>
	</LoggedLayout>
)
}

const mapStateToProps = state => ({
	search: state.commonsReducer.search,
	fair: state.calculatorReducer.fair,
	frente: state.calculatorReducer.frente,
	sagitur: state.calculatorReducer.sagitur,
	vision: state.calculatorReducer.vision
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getCalculatorFair,
	getCalculatorFrente,
	getCalculatorSagitur,
	getCalculatorVision
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)