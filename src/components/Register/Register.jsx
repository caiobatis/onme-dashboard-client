import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


import FileUploader from "react-firebase-file-uploader";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'

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
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(),
	},
	submit: {
		marginTop: theme.spacing(3),
	},
})

function Register(props) {
	const { classes } = props
	

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [access, setAccess] = useState('1')
	const [password, setPassword] = useState('')
	const [progress, setProgress] = useState(0)
	const [avatar, setAvatar] = useState('')
	const [avatarURL, setAvatarURL] = useState('')
	const [isUploading, setIsUploading] = useState(false)


	function handleUploadStart() {
		setIsUploading(true)
		setProgress(0)
	}

  function handleProgress(progress) {
		setProgress(progress)
	}
	
  function handleUploadError(error) {
		setIsUploading(false)
	}
	
	function handleUploadSuccess(filename) {
		setAvatar(filename)
		setProgress(100)
		setIsUploading(false)

		console.log(filename)
		firebase
		.storage
		.ref('profile')
		.child(filename)
		.getDownloadURL()
		.then(url => setAvatarURL(url))
	}
	
	var storageRef = firebase.storage.ref('profile')

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register Account
				</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false }>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="name">Nome</InputLabel>
						<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">E-mail</InputLabel>
						<Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Senha</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
					</FormControl>
					<FormControl component="fieldset" className={classes.formControl}>
					<FormLabel component="legend">Nivel de acesso</FormLabel>
						<RadioGroup
							aria-label="gender"
							name="gender2"
							value={access}
							onChange={(e)=> setAccess(e.target.value)}
						>
							<FormControlLabel
								value='1'
								control={<Radio color="primary" />}
								label="Nivel 1"
								labelPlacement="start"
							/>
							<FormControlLabel
								value='2'
								control={<Radio color="primary" />}
								label="Nivel 2"
								labelPlacement="start"
							/>
							<FormControlLabel
								value='3'
								control={<Radio color="primary" />}
								label="Nivel 3"
								labelPlacement="start"
							/>
						</RadioGroup>
					</FormControl>

					<label>Avatar:</label>
          {isUploading && <p>Progress: {progress}</p>}
          {avatarURL && <img src={avatarURL} />}
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={storageRef}
            onUploadSuccess={handleUploadSuccess}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={onRegister}
						className={classes.submit}>
						Register
					</Button>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/login"
						className={classes.submit}>
						Go back to Login
					</Button>
				</form>
			</Paper>
		</main>
	)

	async function onRegister() {
		try {
			await firebase.register({ name, email, password, avatarURL, access })
			// await firebase.addComplementsUser({ avatarURL, access })
			props.history.replace('/')
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(withStyles(styles)(Register))