import {timer} from 'rxjs'
import {filter, debounceTime} from 'rxjs/operators'
import Core from './core'
import genList from './data'

const getLazyOb = (() => {
  let result = null
  return () => {
    if (!result) {
      result = Core
    }
    return result
  }
})()
let pid = 0
function sub({cur, target}, {passengerSubject, elevatorMulticasts}) {
  const dir = cur - target > 0 ? -1 : 1
  const id = ++pid
  passengerSubject.next({type: -1, cur, target, id})
  const enterSub = elevatorMulticasts
    .pipe(debounceTime(8)) // 保证先下后上
    .pipe(filter(({canEnter, cur, direction}) => canEnter && cur === cur && direction * dir > -1))
    .subscribe(state => {
      enterSub.unsubscribe()
      passengerSubject.next({type: 0, target, id, eid: state.id})
      const outSub = elevatorMulticasts.pipe(filter(state => state.cur === target))
        .subscribe(state => {
          outSub.unsubscribe()
          passengerSubject.next({type: 1, id, eid: state.id})
        })
    })
}

genList().forEach(item => {
  timer(item.delay)
    .subscribe(() => {
      sub(item, getLazyOb())
    })
})
