import {useDispatch, useSelector} from "react-redux"
import React, {useCallback, useEffect, useState} from "react"
import {showTextContent} from "../../../../store/actions/assist"
import {timerHideAction, timerStop} from "../../../../store/actions/timer"
import {losingOn} from "../../../../store/actions/quiz"
import WinnerGame from "./WinnerGame/WinnerGame"
import LostGame from "./LostGame/LostGame"
import {Bar} from "react-chartjs-2"
import WrapperMessage from "../../../../ui/WrapperMessage/WrapperMessage"

const InfoDisplay = () => {
  const dispatch = useDispatch()
  const winner = useSelector(state => state.quizReducer.winner)
  const rightAnswerLetter = useSelector(state => state.quizReducer.rightAnswerLetter)
  const losing = useSelector(state => state.quizReducer.losing)
  const fiftyState = useSelector(state => state.fiftyReducer.fiftyState)
  const hallHelp = useSelector(state => state.hallHelpReducer.hallHelp)
  const callFriend = useSelector(state => state.callFriendReducer.callFriend)
  const seconds = useSelector(state => state.timerReducer.seconds)
  const [barData, setBarData] = useState({})
  const [barOptions, setBarOptions] = useState({})
  const [callFriendAnswer, setCallFriendAnswer] = useState('')

  const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
  }

  const randomArrayValue = array => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const hallHelpContent = useCallback(() => {
    const total = 100
    const min = 12
    const max = 32

    const number1 = randomInteger(min, max)
    const number2 = randomInteger(min, max)
    const number3 = randomInteger(min, max)

    const rightNumberAnswer = total - (number1 + number2 + number3)

    let arrayNumber
    switch (rightAnswerLetter) {
      case 'A':
        arrayNumber = [rightNumberAnswer, number1, number2, number3]
        break
      case 'B':
        arrayNumber = [number1, rightNumberAnswer, number2, number3]
        break
      case 'C':
        arrayNumber = [number1, number2, rightNumberAnswer, number3]
        break
      case 'D':
        arrayNumber = [number1, number2, number3, rightNumberAnswer]
        break
      default:
        console.log("?????? ?????????? ????????????????")
    }

    setBarData({
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          data: arrayNumber,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ],
        }
      ]
    })

    setBarOptions({
      options: {
        title: {
          display: true,
          text: '???????????? ????????',
          fontSize: 25
        },
      }
    })

  }, [rightAnswerLetter])

  const callFriendContent = useCallback(() => {
    const min = 1
    const max = 10
    const number = randomInteger(min, max)

    let answer
    if (number > 4) {
      answer = rightAnswerLetter
    } else {
      const lettersAnswer = ['A', 'B', 'C', 'D']
      const wrongLettersAnswer = lettersAnswer.filter(letter => letter !== rightAnswerLetter)
      answer = randomArrayValue(wrongLettersAnswer)
    }
    setCallFriendAnswer(answer)
  }, [rightAnswerLetter])

  useEffect(() => {
    if (callFriend) {
      dispatch(showTextContent())
      callFriendContent()
    }
  }, [callFriend, dispatch, callFriendContent])

  useEffect(() => {
    if (hallHelp) {
      dispatch(showTextContent())
      hallHelpContent()
    }
  }, [hallHelp, dispatch, hallHelpContent])

  useEffect(() => {
    if (winner) {
      dispatch(timerStop())
      dispatch(timerHideAction())
    }
  }, [winner, dispatch])

  useEffect(() => {
    if (seconds === 0) {
      dispatch(losingOn())
      dispatch(timerHideAction())
    }
  }, [seconds, dispatch])

  return (
    <>
      {fiftyState ? <WrapperMessage>?????????????????? ?????????? ?????? ???????????????????????? ????????????</WrapperMessage> : null}
      {hallHelp ? <WrapperMessage><Bar data={barData} options={barOptions.options}/></WrapperMessage> : null}
      {callFriend ? <WrapperMessage>?? ?????????? ???????????????????? ?????????? - {callFriendAnswer}</WrapperMessage> : null}
      {winner ? <WinnerGame/> : null}
      {losing ? <LostGame/> : null}
    </>
  )
}

export default InfoDisplay