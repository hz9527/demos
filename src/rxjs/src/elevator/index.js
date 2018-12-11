import {timer} from 'rxjs'
import {filter} from 'rxjs/operators'
import Core from './core'
import genList from './data'

const getLazyOb = (() => {
  let result = null
  return () => {
    if (!result) {
      console.log(Core)
      result = Core
    }
    return result
  }
})()

function sub({cur, target}, {call, multicasts, enter, out, miss}) {
  const dir = cur - target > 0 ? -1 : 1
  pull(cur)
  const enterSub = multicasts.pipe(filter(state => state.cur === cur && state.direction === dir))
    .subscribe(state => {
      if (!state.canEnter) {
        miss(state, cur)
      } else {
        enterSub.unsubscribe()
        enter(state, target)
        const outSub = multicasts.pipe(filter(state => state.cur === target))
          .subscribe(state => {
            outSub.unsubscribe()
            out(state)
          })
      }
    })
}

genList().forEach(item => {
  timer(item.delay)
    .subscribe(() => {
      sub(item, getLazyOb())
    })
})
