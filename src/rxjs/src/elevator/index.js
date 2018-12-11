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

function sub({cur, target}, {pull, multicasts, enter, out}) {
  const dir = cur - target > 0 ? -1 : 1
  pull(cur, target, dir)
  const enterSub = multicasts.pipe(filter(state => state.canEnter && state.cur === cur && state.direction === dir))
    .subscribe(() => {
      enterSub.unsubscribe()
      enter()
      const outSub = multicasts.pipe(filter(state => state.cur === target))
        .subscribe(() => {
          outSub.unsubscribe()
          out()
        })
    })
}

genList().forEach(item => {
  timer(item.delay)
    .subscribe(() => {
      sub(item, getLazyOb())
    })
})
