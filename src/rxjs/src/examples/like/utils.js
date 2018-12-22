import {timer} from 'rxjs'
import {$, checkEnums} from '../utils'
export const DebounceTime = 800
export const HideTime = 300
export const EnterTime = 20
export const Data = [
  {state: 0, counts: -1, extraClass: {breath: false, beforeHide: false, beforeEnter: false, hide: true}},
  {state: 0, counts: -1, extraClass: {breath: false, beforeHide: false, beforeEnter: false, hide: true}}
]
const checkVaild = {
  state: checkEnums([0, 1]),
  extraClass: (v) => typeof v === 'boolean',
  counts: (v) => typeof v === 'number'
}
const setState = ((likeData) => {
  const data = JSON.parse(JSON.stringify(likeData))
  const btns = $('.demo-like .btn')
  const panels = $('.demo-like .counts')
  return (newState) => {
    if (newState !== likeData) throw new Error('please use Data')
    newState.forEach(({state, counts, extraClass}, i) => {
      if (state !== data[i].state) {
        if (checkVaild.state(state)) {
          btns[i].classList.toggle('btn-unlike')
          btns[i].innerText = btns[i].innerText.replace(/^./, sub => `${sub === '已' ? '未' : '已'}`)
          data[i].state = state
        } else {
          newSate[i].state = data[i].state
        }
      }
      if (data[i].counts !== counts) {
        if (checkVaild.counts(counts)) {
          const child = panels[i].lastChild
          if (child.nodeType === 1) {
            panels[i].appendChild(new Text(counts))
          } else {
            child.nodeValue = counts
          }
          data[i].counts = counts
        } else {
          newSate[i].counts = data[i].counts
        }
      }
      const dataClass = data[i].extraClass
      Object.keys(dataClass).forEach(key => {
        if (dataClass[key] !== extraClass[key]) {
          if (checkVaild.extraClass(extraClass[key])) {
            panels[i].classList.toggle(key)
            dataClass[key] = extraClass[key]
          } else {
            extraClass[key] = dataClass[key]
          }
        }
      })
    })
  }
})(Data)

const Executor = {
  toggle(ind) {
    Data[ind].state = Data[ind].state === 0 ? 1 : 0
    Data[ind].counts = Data[ind].state === 0 ? -1 : 0
    setState(Data)
  },
  show(ind) {
    Data[ind].state = 1
    Data[ind].counts = 1
    Data[ind].extraClass.beforeEnter = true
    Data[ind].extraClass.hide = false
    setState(Data)
    timer(EnterTime).subscribe(() => {
      Data[ind].extraClass.beforeEnter = false
      Data[ind].extraClass.breath = true
      setState(Data)
    })
  },
  change(ind) {
    Data[ind].counts++
    setState(Data)
  },
  beforeHide(ind) {
    Data[ind].extraClass.beforeHide = true
    Data[ind].extraClass.breath = false
    setState(Data)
  },
  cancelHide(ind) {
    Data[ind].extraClass.beforeHide = false
    Data[ind].extraClass.breath = true
    setState(Data)
  },
  hide(ind) {
    Data[ind].extraClass.hide = true
    Data[ind].extraClass.beforeHide = false
    setState(Data)
  }
}

export default Executor
