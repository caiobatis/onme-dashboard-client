import React, { useState } from 'react'
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styles from './Calculator.scss'

export default function CalculatorFair () {

    const _coins = [{"COD":"USDBRL","DATA":"30/05/19","HOR":"17:59","VAR":0.19,"OCP":3.9815,"OVD":3.9836},{"COD":"EURBRL","DATA":"30/05/19","HOR":"20:18","VAR":0.01,"OCP":4.425,"OVD":4.4284},{"COD":"GBPBRL","DATA":"30/05/19","HOR":"20:16","VAR":0.03,"OCP":5.0133,"OVD":5.0162},{"COD":"AUDBRL","DATA":"30/05/19","HOR":"20:18","VAR":0.02,"OCP":2.7479,"OVD":2.7497},{"COD":"CADBRL","DATA":"30/05/19","HOR":"20:18","VAR":0,"OCP":2.9466,"OVD":2.947},{"COD":"CHFBRL","DATA":"30/05/19","HOR":"20:18","VAR":-0.01,"OCP":3.9458,"OVD":3.9462},{"COD":"JPYBRL","DATA":"30/05/19","HOR":"20:16","VAR":-0.01,"OCP":0.036275,"OVD":0.03629},{"COD":"NZDBRL","DATA":"30/05/19","HOR":"20:18","VAR":-0.01,"OCP":2.5869,"OVD":2.5906},{"COD":"CLPBRL","DATA":"30/05/19","HOR":"20:17","VAR":-0.07,"OCP":0.0056,"OVD":0.0056},{"COD":"MXNBRL","DATA":"30/05/19","HOR":"20:05","VAR":-0.11,"OCP":0.20743,"OVD":0.2078},{"COD":"UYUBRL","DATA":"30/05/19","HOR":"16:40","VAR":0.35,"OCP":0.1135,"OVD":0.1129},{"COD":"ARSBRL","DATA":"30/05/19","HOR":"20:14","VAR":0.08,"OCP":0.08936,"OVD":0.08937},{"COD":"ZARBRL","DATA":"30/05/19","HOR":"20:05","VAR":0.04,"OCP":0.27009,"OVD":0.27058},{"COD":"CNYBRL","DATA":"30/05/19","HOR":"19:00","VAR":0.16,"OCP":0.576,"OVD":0.5761}]

    const [coins, setCoins] = useState(_coins);


    return (
      <div className={styles.listCoins}>
        <Grid item xs={12}>
          <Paper className={styles.paper}>
            <Grid container>
              asdasdsa
            </Grid>
          </Paper>
        </Grid>
      </div>
    )
}