import React, {useEffect, useState} from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import {Box, Button, Typography} from "@material-ui/core"
import {useDispatch, useSelector} from "react-redux"
import {deleteWinnings} from "../../../store/actionsAsync/winner"
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

const MyWinsTable = () => {
  const dispatch = useDispatch()
  const personalWin = useSelector(state => state.winnerReducer.personalWin)
  const downloadedData = useSelector(state => state.winnerReducer.downloadedData)
  const [load, setLoad] = useState(true)

  const classes = allWinnersTableStyles()

  function numberWithSpaces({number}) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontSize: '16px',
    },
    body: {
      color: theme.palette.secondary.contrastText
    }
  }))(TableCell)

  const StyledTableRow = withStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.secondary.main,
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
  }))(TableRow)

  const generateDate = date => {
    let newDate = new Date(date)
    return newDate.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const deleteRowWinHandler = event => {
    const id = event.target.parentNode.dataset.id
    dispatch(deleteWinnings(id))
    event.target.parentNode.parentNode.parentNode.classList.add('hide-table-row')
  }

  useEffect(() => {
    if (!(downloadedData)) {
      setLoad(false)
    }
  }, [downloadedData, setLoad])

  return (
    <>
      <Typography className={classes.header} variant="h4" align={"center"}>???????? ???????????? ????????????????????</Typography>
      {
        load ?
          <Box className={classes.preloading}>
            <CircularProgress/>
          </Box> :
          personalWin.length === 0 ?
            <Typography className={classes.emptyTable} variant="inherit">
              ???? ???????????? ???????????? ?? ?????? ?????? ???????????? ???????????????????? ??????????
            </Typography>
            :
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">????????</StyledTableCell>
                  <StyledTableCell align="center">?????????????? &#8372;</StyledTableCell>
                  <StyledTableCell align="center">?????????????? ????????????????????</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {personalWin.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {generateDate(row.date)}
                    </StyledTableCell>
                    <StyledTableCell align="center">{numberWithSpaces({number: row.money})}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        data-id={row._id}
                        onClick={deleteRowWinHandler}
                        variant="outlined"
                        color="primary"
                      >
                        ??????????????
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      }
    </>
  )
}

export default MyWinsTable