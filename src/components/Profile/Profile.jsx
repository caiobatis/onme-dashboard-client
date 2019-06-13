import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel, Grid } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import FileUploader from "react-firebase-file-uploader"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import LoggedLayout from '../DefaultLayout/LoggedLayout'
import withStyles from '@material-ui/core/styles/withStyles'
import { getUserProfile } from '../../actions/commonsActions';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
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
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 100,
    height: 100,
    width: 100,
    marginBottom: 20
  }
})

function Profile(props) {
  const { 
    classes,
    profile
  } = props

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [access, setAccess] = useState('1')
  const [password, setPassword] = useState('')
  const [progress, setProgress] = useState(0)
  const [avatar, setAvatar] = useState('')
  const [avatarURL, setAvatarURL] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    setName(profile.name)
    setEmail(profile.email)
    setAccess(profile.access)
    setAvatarURL(profile.photoURL)
  }, [profile])

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
    firebase
    .storage
    .ref('profile')
    .child(filename)
    .getDownloadURL()
    .then(url => setAvatarURL(url))
  }
  
  var storageRef = firebase.storage.ref('profile')

	return (
    <LoggedLayout>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <form className={classes.form} onSubmit={e => e.preventDefault() && false }>
				    <Grid container spacing={2}>
              <Grid item xs={3} >
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Nome</InputLabel>
                  <Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">E-mail</InputLabel>
                  <Input name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Senha</InputLabel>
                  <Input name="password" disabled type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
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
              </Grid>
              <Grid item xs={3}>
                <label>Avatar:</label>
                {isUploading && <p>Progress: {progress}</p>}
                <div className={classes.avatar}>
                {avatarURL && <img src={avatarURL} />}
                </div>
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
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Button
                  disabled={isUploading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={updateProfile}
                  className={classes.submit}
                >
                  Atualizar perfil
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    </LoggedLayout>
	)

	async function updateProfile() {

    const data = { name, email, password, avatarURL, access }
    if(!password)
      delete data.password

		try {
      await firebase.updateProfile(data)
      .then((e) => {
        setTimeout(()=>{
          props.history.replace('/')
        }, 2000)
      })
		} catch(error) {
			alert(error.message)
		}
	}
}

const mapStateToProps = state => ({
	profile: state.commonsReducer.profile
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserProfile
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Profile)))