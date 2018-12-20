import {fromEvent} from 'rxjs'
import {filter, map, scan} from 'rxjs/operators'
import {$, checkEnums} from './utils'

const Data = [
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

const Source = fromEvent($('.demo-like'), 'click')
  .pipe(filter(({target}) => target.classList.contains('btn')))
  .pipe(map(({target: {dataset: {index}}}) => Number(index)))
  .pipe(scan((data, id) => {
    data.pre = data.cur
    data.cur = id
    return data
  }, {pre: null, cur: null}))
  .subscribe(() => {
    Data[0].state = 1
    Data[0].counts = 2
    Data[0].extraClass.hide = false
    Data[0].extraClass.beforeEnter = true
    setState(Data)

    setTimeout(() => {
      Data[0].extraClass.beforeEnter = false
      setState(Data)
    }, 300)

    setTimeout(() => {
      Data[0].extraClass.beforeHide = true
      setState(Data)
    }, 3000)

    setTimeout(() => {
      Data[0].extraClass.beforeHide = false
      Data[0].extraClass.hide = true
      setState(Data)
    }, 3300)
  })
