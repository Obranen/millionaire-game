import React, {useCallback, useEffect} from 'react'
import {Button, Typography} from "@material-ui/core"
import TableContainer from "@material-ui/core/TableContainer"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import {useDispatch, useSelector} from "react-redux"
import {quizAddCurrentId, quizUpdateTableOff} from "../../../store/actions/quiz"
import {deleteQuizQuestion, getAllQuizzes} from "../../../store/actionsAsync/quiz"
import quizTableStyles from "./quizTableStyles"

const QuizTable = () => {
  const dispatch = useDispatch()
  const quiz = useSelector(state => state.quizReducer.quiz)
  const updateTableQuiz = useSelector(state => state.quizReducer.updateTableQuiz)

  const classes = quizTableStyles()

  const editHandler = event => {
    const currentId = event.target.parentNode.dataset.id
    dispatch(quizAddCurrentId(currentId))
  }

  const deleteHandler = event => {
    const currentId = event.target.parentNode.dataset.id
    dispatch(deleteQuizQuestion(currentId))
    event.target.parentNode.parentNode.parentNode.classList.add('hide-table-row')
  }

  const getAllQuizzesCallback = useCallback(() => {
    return dispatch(getAllQuizzes())
  }, [dispatch])
  const quizUpdateTableOffCallback = useCallback(() => {
    return dispatch(quizUpdateTableOff())
  }, [dispatch])

  useEffect(() => {
    if (updateTableQuiz) {
      getAllQuizzesCallback()
      quizUpdateTableOffCallback()
    }
  }, [getAllQuizzesCallback, quizUpdateTableOffCallback, updateTableQuiz])

  return (
    <>
      <Typography className={classes.header} align="center" variant="h4">
        Созданные вопросы
      </Typography>
      <TableContainer className={classes.root} component={Paper} id="table-quiz">
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow className={classes.head}>
              <TableCell className={classes.cell} align="center">Вопрос</TableCell>
              <TableCell className={classes.cell} align="center">Правильный ответ</TableCell>
              <TableCell className={classes.cell} align="center">Ответ "A"</TableCell>
              <TableCell className={classes.cell} align="center">Ответ "B"</TableCell>
              <TableCell className={classes.cell} align="center">Ответ "C"</TableCell>
              <TableCell className={classes.cell} align="center">Ответ "D"</TableCell>
              <TableCell className={classes.cell} align="center">Изменить</TableCell>
              <TableCell className={classes.cell} align="center">Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quiz.map((quiz) => {
              return (
                <TableRow key={quiz._id}>
                  <TableCell align="center" className={'quiz-question'}>{quiz.question}</TableCell>
                  <TableCell align="center" className={'quiz-rightAnswerId'}>{quiz.rightAnswerId}</TableCell>
                  {quiz.answers.map((answer) => (
                    <TableCell align="center" className={'quiz-answer'} key={answer._id}>
                      {answer.text}
                    </TableCell>
                    ))}
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      data-id={quiz._id}
                      onClick={editHandler}
                    >
                      Изменить
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      data-id={quiz._id}
                      onClick={deleteHandler}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default QuizTable