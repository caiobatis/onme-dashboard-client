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

const cost = {
    usd: 1.9,
    eur: 2.1,
    gbp: 4.0,
    aud: 4.0,
    cad: 4.0,
    chf: 4.0,
    jpy: 5.5,
    nzd: 4.0,
    clp: 7.5,
    mxn: 8.0,
    uyu: 8.0,
    zar: 8.5,
    ars: 45,//there is not
    cny: 8.0
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

export default function CalculatorSagitur(props) {
    const [selected, setSelected] = useState([])
    const [coinsSagitur, setCoins] = useState(props.coinsSagitur);

    useEffect(() => {
        const {
            coinsSagitur
        } = props

        setCoins(coinsSagitur)
    }, [props.coinsSagitur])
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
                            {(coinsSagitur || []).filter(e => {
                                if (props.search) {
                                    return e.COD.toLowerCase().includes(props.search) || e.COD.toUpperCase().includes(props.search)
                                }
                                if (e.COD == 'ARSBRL') {
                                    return false
                                }
                                return true
                            }).map(row => {
                                const isItemSelected = isSelected(row.COD)
                                const cod = row.COD.replace('BRL', '')

                                const comercial = row.OVD
                                const custo = row.OVD * (cost[cod.toLowerCase()] / 100) + row.OVD
                                const minSemIof = custo * (1 / 100) + custo
                                const maxSemIof = custo * (margin[cod.toLowerCase()] / 100) + custo
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
                                        <TableCell>{numeral(custo).format('0.00000')}</TableCell>
                                        <TableCell align="right">{numeral(minSemIof).format('0.00000')}</TableCell>
                                        <TableCell align="right">{numeral(maxSemIof).format('0.00000')}</TableCell>
                                        <TableCell align="right">{numeral(minComIof).format('0.00000')}</TableCell>
                                        <TableCell align="right">{numeral(maxComIof).format('0.00000')}</TableCell>
                                        <TableCell align="right">Min 1%</TableCell>
                                    </TableRow>
                                )
                            }
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </div>
    )
} 