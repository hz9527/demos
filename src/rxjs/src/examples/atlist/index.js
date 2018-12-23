import {fromEvent} from 'rxjs'
import {$} from '../utils'
const Data = {
  content: '',
  atList: [] // {id: Str, offset: Number, length: Number}
}
const Source = fromEvent($('.input-box input'), 'input')

Source.subscribe(e => {
  console.log(e.target.selectionEnd)
})
// 1. 输入@ 继续输入，请求列表
