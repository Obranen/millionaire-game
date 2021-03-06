import {Grid} from "@material-ui/core"
import Timer from "./Timer/Timer"
import InfoDisplay from "./InfoDisplay/InfoDisplay"
import viewWindowLightStyles from './viewWindowLightStyles'
import viewWindowDarkStyles from './viewWindowDarkStyles'
import {useSelector} from "react-redux";

const ViewWindow = () => {
  const themeState = useSelector(state => state.switchReducer.themeState)
  const timerHide = useSelector(state => state.timerReducer.timerHide)

  const classesLightTheme = viewWindowLightStyles()
  const classesDarkTheme = viewWindowDarkStyles()

  return (
    <Grid item xs={9} className={themeState ? classesDarkTheme.background : classesLightTheme.background}>
      {timerHide ?
        null :
        <Timer/>}
      <InfoDisplay/>
    </Grid>
  )
}

export default ViewWindow