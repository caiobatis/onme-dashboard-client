import React, { useState, useEffect } from 'react'
import numeral from 'numeral'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import styles from './Calculator.scss'

const cost = {
  usd: 5.0,
  eur: 2.0,
  gbp: 4.0,
  aud: 4.0,
  cad: 4.0,
  chf: 4.0,
  jpy: 7.0,
  nzd: 4.0,
  clp: 13.0,
  mxn: 13.0,
  uyu: 13.0,
  zar: 13.0,
  ars: 45.0,
  cny: 13.0
}

const margin = {
  usd: 1.3,
  eur: 1.3,
  gbp: 2,
  aud: 1.6,
  cad: 2,
  chf: 2.5,
  jpy: 1.5,
  nzd: 2,
  clp: 3,
  mxn: 5.5,
  uyu: 6.5,
  zar: 2.7,
  ars: 10,
  cny: 4.5
}

export default function CalculatorFair (props) {
    const [selected, setSelected] = useState([])
    const [coins, setCoins] = useState(props.coins);
    const [currentMargin, setMargin] = useState(margin);
    const [currentCost, setCost] = useState(cost);

    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const newCost = (val, item) => {
      const _cost = currentCost
      
      _cost[item] = Number(val)
      console.log(_cost)
      setCost(_cost)

      props.update()

    };
  

    useEffect(() => {
      const {
        coins
      } = props

      setCoins(coins)
    }, [props.coins])
    
    // useEffect(() => {
    //   const {
    //     coins
    //   } = props

    //   setCoins(coins)

    // }, [currentCost])

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
    // console.log(currentCost);
    return (
      <div className={styles.listCoins}>
        <button type="button" onClick={handleOpen}>
          Alterar valores de custo/margem
        </button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div className={styles.paperModal}>
            <Table className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Custo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                ([]).map(e => {
                  return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    className={styles.item}
                  >
                    <TableCell>

                    </TableCell>
                  </TableRow>

                  )

                })
              }
              </TableBody>
            </Table>
          </div>
        </Modal>

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
                  <TableCell align="right">Custo Moeda</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(coins || [])
                .filter(e => { 
                  if(props.search) {
                    return e.COD.toLowerCase().includes(props.search) || e.COD.toUpperCase().includes(props.search) 
                  }
                  return true
                })
                .map(row => {
                  const isItemSelected = isSelected(row.COD)
                  const cod = row.COD.replace('BRL', '')
                  // console.log(currentCost[cod.toLowerCase()] );
                  const comercial = row.OVD
                  const custo = row.OVD * (currentCost[cod.toLowerCase()] / 100) + row.OVD
                  
                  if(cod.toLowerCase() === 'usd') {
                    console.log(custo, cod.toLowerCase());

                  }
                  const minSemIof = custo * (1 / 100) + custo
                  const maxSemIof = custo * (currentMargin[cod.toLowerCase()] / 100 ) + custo
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
                        <div className={styles.name}>{cod}</div>
                      </TableCell>
                      <TableCell>{numeral(comercial).format('0.00000')}</TableCell>
                      <TableCell>{numeral(custo).format('0.00000')} {custo}</TableCell>
                      <TableCell align="right">{numeral(minSemIof).format('0.00000')}</TableCell>
                      <TableCell align="right">{numeral(maxSemIof).format('0.00000')}</TableCell>
                      <TableCell align="right">{numeral(minComIof).format('0.00000')}</TableCell>
                      <TableCell align="right">{numeral(maxComIof).format('0.00000')}</TableCell>
                      <TableCell align="right">Min 1%</TableCell>
                      <TableCell align="right">
                        <input
                          type="text"
                          onChange={e=>newCost(e.target.value, cod.toLowerCase())}
                        />
                      </TableCell>
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