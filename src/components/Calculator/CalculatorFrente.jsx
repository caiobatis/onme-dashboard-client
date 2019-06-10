import React, { useState, useEffect } from 'react'
import numeral from 'numeral'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import styles from './Calculator.scss'

export default function CalculatorFrente (props) {
    const [selected, setSelected] = useState([])
    const [coins, setCoins] = useState(props.coins);

    useEffect(() => {
      const {
        coins
      } = props

      setCoins(coins)
    }, [props.coins])

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
                  <TableCell>Sem IOF</TableCell>
                  <TableCell>Com IOF</TableCell>
                  <TableCell align="right">Observação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(coins || []).filter(e => {
                    const cod = e.productCode
                    if(props.search) {
                      return cod.toLowerCase().includes(props.search) || cod.toUpperCase().includes(props.search) 
                    }
                    return true
                  }).map(row => {

                  const cod = row.productCode
                  const isItemSelected = isSelected(cod)

                  const comercial = row.OVD
                  const semIof = row.sellPrice
                  const comIof = row.sellPrice * (1.1 / 100) + row.sellPrice

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      onClick={event => handleClick(event, cod)}
                      role="checkbox"
                      tabIndex={-1}
                      key={cod}
                      className={styles.item}
                    >
                      <TableCell>
                        <div className={styles.name}>{cod.replace('BRL', '')}</div>
                      </TableCell>
                      <TableCell>{numeral(comercial).format('0.0000')}</TableCell>
                      <TableCell>{numeral(semIof).format('0.0000')}</TableCell>
                      <TableCell>{numeral(comIof).format('0.0000')}</TableCell>
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