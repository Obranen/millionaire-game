import React from 'react'
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@material-ui/core"
import {useDispatch, useSelector} from "react-redux"
import {timerOn} from "../../store/actions/timer"
import {startButtonHide} from "../../store/actions/welcome"
import {quizAddRandomQuiz} from "../../store/actions/quiz"
import Avatar from '@material-ui/core/Avatar'
import axios from './welcomeImage/axios.png'
import chart from './welcomeImage/chartjs.png'
import express from './welcomeImage/express.png'
import material from './welcomeImage/material-ui.png'
import mongoDB from './welcomeImage/mongoDB.png'
import mongoose from './welcomeImage/mongoose.png'
import notiStack from './welcomeImage/notistack.png'
import react from './welcomeImage/react.png'
import redux from './welcomeImage/redux.png'
import welcomeStyles from './welcomeStyles'
import DescriptionIcon from '@material-ui/icons/Description'

const Welcome = () => {
  const dispatch = useDispatch()
  const startButtonState = useSelector(state => state.welcomeReducer.startButtonState)
  const quiz = useSelector(state => state.quizReducer.quiz)

  const classes = welcomeStyles()

  const randomArray = ({array}) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const createRandomQuiz = () => {
    const cloneQuiz = [...quiz]
    const maxCloneQuiz = cloneQuiz.slice(0, 15)
    dispatch(quizAddRandomQuiz(randomArray({array: maxCloneQuiz})))
  }

  const startGameHandler = () => {
    dispatch(startButtonHide())
    dispatch(timerOn())
    createRandomQuiz()
  }

  return (
    <>
      {
        startButtonState ?
          <Grid container>
            <Grid item xs={12}>
              <Box textAlign='center'>
                <Button
                  size="large"
                  color="primary"
                  variant="outlined"
                  className={classes.startGame}
                  onClick={() => startGameHandler()}>
                  ???????????? ????????
                </Button>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">
                Frontend:
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <img src={react} alt={"react"}/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="React" secondary="????????????????????"/>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <img src={redux} alt={"redux"}/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Redux" secondary="???????????????? ??????????????????"/>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <img src={axios} alt={"axios"}/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Axios" secondary="HTTP ????????????????????"/>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <img src={material} alt={"material"}/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Material-UI" secondary="????????????????????"/>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <img src={chart} alt={"chart"}/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Chart.js" secondary="???????????????????? ?????? ???????????????? ???????????????? ?? ????????????????"/>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <img src={notiStack} alt={"notiStack"}/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Notistack" secondary="???????????????????? ??????????????????????"/>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">
                Backend:
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <img src={express} alt={"express"}/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Express" secondary="??????????????????"/>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <img src={mongoose} alt={"mongoose"}/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Mongoose" secondary="????????????????????"/>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <img src={mongoDB} alt={"mongoDB"}/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="MongoDB" secondary="???????? ????????????"/>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">
                ???????????? ?? ?????????????????????? ????????????:
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="???????? ?? ???????????? ?????????????? ?? ???????????????????? ???? ?????????????? ?? ??????????????"/>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="?????????????????????? ?????? ???????????????????? ????????????????"/>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="???????????????? ????????????????, ???????????????????????????? ?? ???????????????? ???????????????? ?????? ????????" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="?????????? ?????????????? ??????????????????????" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="?????? ????????: ?????????????? ?? ????????????" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="???? ?? ???????? ???????? - ?????? ???????????? ??????????????????, ?????????????? ?? ????????????????, ????????????, ?????????????? ?????????????? ?? ???????????????????? ????????????????????" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          :
          null
      }
    </>
  )
}

export default Welcome