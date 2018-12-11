import {Observable, Subject} from 'rxjs'
import {filter, scan, delay, multicast} from 'rxjs/operators'
import {MAX_FLOOR, MAX_MAN, STEP} from './config'
const state = {
  cur: 0,
  direction: 0, // -1 down; 0 static; 1 up
  canEnter: true
}
const source = Observable.create(() => {})
const subject = new Subject()
const multicasts = source.pipe(multicast(subject))
let counts = 0
const enter = () => {
  state.canEnter = ++counts < MAX_MAN
  subject.next(state)
}
const out = () => {
  counts > 0 && counts--
  state.canEnter = true
  subject.next(state)
}
let target = -1
let nextTarget = -1
// 人满了还得来接
const pull = (itemCur, itemTarget, dir) => {
  if (state.direction === 0) {
    const v = itemCur - state.cur
    state.direction = v === 0 ? dir : v > 0 ? 1 : -1
  }
  const max = Math.max(itemCur, itemTarget)
  const min = Math.min(itemCur, itemTarget)
  target = state.direction > 0 ? Math.max(target, max) : Math.min(target === -1 ? min : target, min)
  nextTarget = state.direction < 0 ? Math.max(nextTarget, max) : Math.min(nextTarget === -1 ? min : nextTarget, min)
  subject.next(state)
}
// 只订阅楼层变化和方向变化，修改 target cur nextTarget
const start = {cur: state.cur, direction: state.direction}
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

export default {
  pull,
  multicasts,
  enter,
  out
}
