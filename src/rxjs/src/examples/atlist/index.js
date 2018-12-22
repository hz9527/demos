import {fromEvent} from 'rxjs'
import {$, checkEnums} from '../utils'
const Data = {
  content: '',
  atList: [] // {id: Str, offset: Number, length: Number}
}
const Source = fromEvent($('.input-box input'), 'input')

Source.subscribe(e => {
  console.log(e.target.selectionEnd)
})
