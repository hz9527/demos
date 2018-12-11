import {Observable, Subject} from 'rxjs'
import {filter, scan, delay, multicast} from 'rxjs/operators'
import {MAX_MAN, STEP} from './config'
const state = { // 引用不更改
  cur: 0, // 只能通过step更新
  direction: 0, // -1 down; 0 static; 1 up，只能通过step更新
  _run: false, // 只能通过 call 初始化
  canEnter: true // 只能通过 enter out 修改
}
const source = Observable.create(() => {})
const subject = new Subject()
const multicasts = source.pipe(multicast(subject))

let setState
Observable.create(observer => {
  setState = observer.next
}).subscribe()

// 只关注电梯里还有，修改 task cur direction
multicasts.pipe(scan((states, {cur, direction}) => ({old: states.now, now: {cur, direction}}), {old: start, now: start}))
  .pipe(filter(states => {
    return states.old.direction !== states.now.direction || states.old.cur !== states.now.cur
  }))
  .pipe(delay(STEP))
  .subscribe(() => {
    if (state.cur === target && nextTarget === -1) {
      state.direction = 0
      target = -1
    } else {
      state.cur += state.direction
      if (state.cur === target && nextTarget !== -1) {
        target = nextTarget
        nextTarget = -1
        state.direction *= -1
      }
      subject.next(state)
    }
    console.log(`当前楼层 ${state.cur}`)
  })
multicasts.connect()

const data = {go: -1, arrive: -1, counts: 0}
const enter = (state, target) => {
  const result = {}
  if (state.canEnter !== ++data.counts < MAX_MAN) {
    result.canEnter = false
  }
  Object.keys(result) > 0 && setState(result)
}
const out = (state) => {
  data.counts--
  if (!state.canEnter) {
    setState({canEnter: true})
  }
}
const call = ((state) => (cur) => {
  // 当前电梯里的人一定是要下去的，所以只需要比如 go 自己 & arriver 即可
})(state)
const miss = (state, cur) => {

}



export default {
  call,
  multicasts,
  enter,
  out,
  miss
}
