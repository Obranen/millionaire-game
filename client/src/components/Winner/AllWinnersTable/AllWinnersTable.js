import React, {useEffect, useState} from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import {Box, Typography} from "@material-ui/core"
import {useSelector} from "react-redux"
import CircularProgress from "@material-ui/core/CircularProgress"

const allWinnersTableStyles = makeStyles((theme) => ({
  header: {
    marginTop: '40px',
    marginBottom: '10px',
  },
  preloading: {
    display: "flex",
    justifyContent: "center",
    margin: '20px 0',
  },
  emptyTable: {
    fontSize: 16,
  }
}))

const AllWinnersTable = () => {
  const topWin = useSelector(state => state.winnerReducer.topWin)
  const downloadedData = useSelector(state => state.winnerReducer.downloadedData)
  const [load, setLoad] = useState(true)

  const classes = allWinnersTableStyles()

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontSize: '16px',
    },
    body: {
      color: theme.palette.secondary.contrastText,
    }
  }))(TableCell)

  const StyledTableRow = withStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.secondary.main,
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.secondary.light,
      },
    }
  }))(TableRow)

  useEffect(() => {
    if (!(downloadedData)) {
      setLoad(false)
    }
  }, [downloadedData, setLoad])

  return (
    <>
      <Typography className={classes.header} variant="h4" align={"center"}>Топ побед всех игроков</Typography>
      {
        load ?
          <Box className={classes.preloading}>
            <CircularProgress />
          </Box> :
          topWin.length === 0 ?
            <Typography className={classes.emptyTable} variant="inherit">
              На данный момент нет победителей
            </Typography>
            :
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Nickname</StyledTableCell>
                  <StyledTableCell align="center">Количество побед</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topWin.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.nickname}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.winner}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      }
    </>
  )
}

export default AllWinnersTable