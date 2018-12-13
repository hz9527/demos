import {timer} from 'rxjs'
import core from './oneElevator'
import genList from './data'

genList().forEach(item => {
  timer(item.delay).subscribe(() => core.press(item))
})
