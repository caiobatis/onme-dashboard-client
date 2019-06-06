import React, { useState } from 'react'
import numeral from 'numeral'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import styles from './Calculator.scss'

export default function CalculatorFair (props) {

    const _coins = [{"COD":"USDBRL","DATA":"30/05/19","HOR":"17:59","VAR":0.19,"OCP":3.9815,"OVD":3.9836},{"COD":"EURBRL","DATA":"30/05/19","HOR":"20:18","VAR":0.01,"OCP":4.425,"OVD":4.4284},{"COD":"GBPBRL","DATA":"30/05/19","HOR":"20:16","VAR":0.03,"OCP":5.0133,"OVD":5.0162},{"COD":"AUDBRL","DATA":"30/05/19","HOR":"20:18","VAR":0.02,"OCP":2.7479,"OVD":2.7497},{"COD":"CADBRL","DATA":"30/05/19","HOR":"20:18","VAR":0,"OCP":2.9466,"OVD":2.947},{"COD":"CHFBRL","DATA":"30/05/19","HOR":"20:18","VAR":-0.01,"OCP":3.9458,"OVD":3.9462},{"COD":"JPYBRL","DATA":"30/05/19","HOR":"20:16","VAR":-0.01,"OCP":0.036275,"OVD":0.03629},{"COD":"NZDBRL","DATA":"30/05/19","HOR":"20:18","VAR":-0.01,"OCP":2.5869,"OVD":2.5906},{"COD":"CLPBRL","DATA":"30/05/19","HOR":"20:17","VAR":-0.07,"OCP":0.0056,"OVD":0.0056},{"COD":"MXNBRL","DATA":"30/05/19","HOR":"20:05","VAR":-0.11,"OCP":0.20743,"OVD":0.2078},{"COD":"UYUBRL","DATA":"30/05/19","HOR":"16:40","VAR":0.35,"OCP":0.1135,"OVD":0.1129},{"COD":"ARSBRL","DATA":"30/05/19","HOR":"20:14","VAR":0.08,"OCP":0.08936,"OVD":0.08937},{"COD":"ZARBRL","DATA":"30/05/19","HOR":"20:05","VAR":0.04,"OCP":0.27009,"OVD":0.27058},{"COD":"CNYBRL","DATA":"30/05/19","HOR":"19:00","VAR":0.16,"OCP":0.576,"OVD":0.5761}]

    const [selected, setSelected] = useState([])
    const [coins, setCoins] = useState(_coins);

    function handleClick(event, name) {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    }

    const isSelected = name => selected.indexOf(name) !== -1;

    return (
      <div className={styles.listCoins}>
        <Grid item xs={12}>
          <Paper className={styles.paper}>
            <Table className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Moeda</TableCell>
                  <TableCell>Comercial</TableCell>
                  <TableCell>Custo ONME</TableCell>
                  <TableCell align="right">Min sem IOF </TableCell>
                  <TableCell align="right">Max sem IOF </TableCell>
                  <TableCell align="right">Min com IOF </TableCell>
                  <TableCell align="right">Max com IOF </TableCell>
                  <TableCell align="right">Observação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(coins || []).filter(e => { 
                    if(props.search) {
                      return e.COD.toLowerCase().includes(props.search) || e.COD.toUpperCase().includes(props.search) 
                    }
                    return true
                  }).map(row => {
                  const isItemSelected = isSelected(row.COD)

                  const comercial = row.OVD
                  const custo = row.OVD * (1.9 / 100) + row.OVD
                  const minSemIof = custo * (1 / 100) + custo
                  const maxSemIof = custo * (1.3 / 100 ) + custo
                  const minComIof = minSemIof * (1.1 / 100) + minSemIof
                  const maxComIof = maxSemIof * (1.1 / 100) + maxSemIof

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      onClick={event => handleClick(event, row.COD)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.COD}
                      className={styles.item}
                    >
                      <TableCell>
                        <div className={styles.name}>{row.COD.replace('BRL', '')}</div>
                      </TableCell>
                      <TableCell>{numeral(comercial).format('0.0000')}</TableCell>
                      <TableCell>{numeral(custo).format('0.0000')}</TableCell>
                      <TableCell align="right">{numeral(minSemIof).format('0.0000')}</TableCell>
                      <TableCell align="right">{numeral(maxSemIof).format('0.0000')}</TableCell>
                      <TableCell align="right">{numeral(minComIof).format('0.0000')}</TableCell>
                      <TableCell align="right">{numeral(maxComIof).format('0.0000')}</TableCell>
                      <TableCell align="right">Min 1%</TableCell>
                    </TableRow>
                  )}
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </div>
    )
} 