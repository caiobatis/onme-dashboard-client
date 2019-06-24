import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
import { Paper, Avatar, Button, FormControl, Input, InputLabel, Grid } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import FileUploader from "react-firebase-file-uploader"
import { withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import {styles} from '../Profile/Profile'
import withStyles from '@material-ui/core/styles/withStyles'
import { getUserProfile } from '../../actions/commonsActions';

function SalesForm (props) {
  const { 
    classes,
    profile
  } = props

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [access, setAccess] = useState('1')
  const [progress, setProgress] = useState(0)
  const [avatar, setAvatar] = useState('')
  const [avatarURL, setAvatarURL] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    // setName(profile.name)
    // setEmail(profile.email)
    // setAccess(profile.access)
    // setAvatarURL(profile.photoURL)
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

  return (
    <div>
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
        </Grid>
        <Grid container spacing={2}>
          {
            access >= 2 && (
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
            )
          }
          <Grid item xs={3}>
            <label>Avatar:</label>
            {isUploading && <p>Progress: {progress}</p>}
            <div className={classes.avatar}>
            {avatarURL && <img src={avatarURL} />}
            </div>
            {/* <FileUploader
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={storageRef}
              onUploadSuccess={handleUploadSuccess}
              onUploadStart={handleUploadStart}
              onUploadError={handleUploadError}
              onUploadSuccess={handleUploadSuccess}
              onProgress={handleProgress}
            /> */}
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
    </div>
  )

  async function updateProfile() {
  
    const data = { name, email, avatarURL, access }
  
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
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SalesForm)))