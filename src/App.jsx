import React, { useState, useEffect } from 'react'
// import './styles.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import Routes from './components/Routes/Routes'
import firebase from './firebase'

const theme = createMuiTheme()

const style = {
	position: 'fixed',
	display: 'flex',
	alignItems: 'center',
	zIndex: 1300,
	background: 'rgba(255, 255, 255, 0.5)',
	width: '100%',
	height: '100%',
	justifyContent: 'center'
}

export default function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})

	return firebaseInitialized !== false ? (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Routes />
		</MuiThemeProvider>
	) : <div style={style}> <CircularProgress size={30}/></div>
}