import {fromEvent, timer, of, combineLatest, zip} from 'rxjs'
import {filter, map, scan, switchMap, delay, concatAll, switchAll} from 'rxjs/operators'
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
  .pipe(map(({target: {dataset: {index}}}) => index))

// 点击 -》判断该点上次点击是否过期，过期 toggle 否则 显示点赞动画，如果是第一次点击 从 0 开始计数，否则++

// 对各自 id swithchMap，所以每次会针对该 id 发布一个流，并允许各自 switchMap
const DebounceTime = 800
const AddSource = Source.pipe(scan((act, id) => {
  act.push(id)
  return act
}, []))

const DelaySource = AddSource.pipe(delay(DebounceTime))
  .subscribe(act => {
    const id = act.shift()
    if (act.indexOf(id) === -1) {
      console.log('stop', id)
    }
  })