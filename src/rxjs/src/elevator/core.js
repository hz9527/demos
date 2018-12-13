import {Observable, Subject} from 'rxjs'
import {filter, scan, delay, multicast, debounceTime, partition, map} from 'rxjs/operators'
import {MAX_MAN, STEP, MAX_FLOOR, COUNTS} from './config'
const noop = () => {console.log('has not subscribe')}

function factory() {
  const result = {
    observer: {next: noop, error: noop, complete: noop}
  }
  const abservable = Observable.create(ob => {
    console.log('pull')
    result.observer = ob
  })
  result.abservable = abservable
  return result
}

function multiFactory() {
  const subject = new Subject()
  const multicasts = Observable.create(() => {}).pipe(multicast(subject))
  multicasts.connect()
  return {subject, multicasts}
}

const scheduler = factory()
const {subject: passengerSubject, multicasts: passengerObservable} = multiFactory()
const {subject: elevatorSubject, multicasts: elevatorMulticasts} = multiFactory()

const ElevatorData = Array.apply(null, {length: COUNTS}).map((n, i) => ({id: i + 1, cur: 0, direction: 0, counts: 0, target: -1}))
const Task = {}

function getChange(item, target, dir) {
  // item.target 可能为 -1 direction 可能为 0 一定是因为电梯静止了
  let result = {}
  const farthest = item.direction === 0 ? target : Math[dir === -1 ? 'min' : 'max'](target, item.target)
  if (farthest !== item.target) {
    result.target = farthest
  }
  if (item.direction === 0) {
    result.direction = item.cur - target > 0 ? -1 : 1
  }
  if (Object.keys(result).length !== 0) {
    result.id = item.id
  } else {
    result = null
  }
  console.log(target, item)
  return result
}
function allocationEle(tar, dir) {
  let change = null
  // 排除满员、非顺路，选择 target 差距最小的
  const result = ElevatorData.filter(({cur, direction, counts, target}) => {
    if (counts === MAX_MAN) return false;
    if (target === -1) return true
    const value = tar - target
    // direction -1 1 0 dir -1 1 & accross
    if (direction * dir > -1 && value * dir >= 0) return true
    return false
  }).sort(({cur}, {cur: cur2}) => Math.abs(cur - tar) - Math.abs(cur2 - tar))[0]
  if (result) {
    change = getChange(result, tar, dir)
  }
  return change
}
function allocationTask(item) { // 方向只可能是 1 -1
  // 找出当前方向最远的task，如果没有，则更新方向，分配新方向最远task
  const {direction} = item
  const result = Object.keys(Task).map(id => (Object.assign({id}, Task[id])))
    .reduce((res, task) => {
      const value = task.cur - item.cur
      const abs = value * direction
      if (abs > 0) {
        if (!res[0] || (res[0] && res[0].value * direction < abs)) {
          res[0] = {value, task}
        }
      } else {
        if (!res[1] || res[1].value * direction > abs) {
          res[1] = {value, task}
        }
      }
      return res
    }, [null, null]).filter(item => !!item)[0]
  return result ? result.task : null
}
passengerObservable.pipe(filter(data => data.type === -1))
  .subscribe(({id, cur, target}) => {
    // 尝试分配电梯 & task
    const direction = target - cur > 0 ? 1 : -1
    Task[id] = {cur, target, direction}
    const change = allocationEle(cur, direction)
    if (change) {
      const item = ElevatorData.find(({id}) => id === change.id)
      const direction = item.direction
      Object.assign(item, change)
      direction === 0 && scheduler.observer.next(item)
    }
  })
let enter = 0
let out = 0
passengerObservable.pipe(filter(data => data.type === 0))
  .subscribe(({id, eid, target}) => {
    // 尝试更新任务target & waitTask
    const item = ElevatorData.find(({id}) => id === eid)
    item.counts++
    console.log(`name: ${id}, cur ${item.cur} enter & go ${target} ${++enter}`)
    const change = getChange(item, target, Task[id].direction)
    delete Task[id]
    if (change) Object.assign(item, change)
  })
passengerObservable.pipe(filter(data => data.type === 1))
  .subscribe(({id, eid}) => {
    // 减员
    const item = ElevatorData.find(({id}) => id === eid)
    item.counts--
    console.log(`name: ${id}, cur ${item.cur} out ${++out}`)
    // 此时更远方向的人一定在此人上电梯前就订阅或者在target === -1 时更新到了
  })
elevatorMulticasts.pipe(map(data => ElevatorData.find(({id}) => id === data.id)))
  .subscribe(item => {
    // 由于第一个订阅，此时乘客还未进出电梯，总之一个原则，当前方向最远的人一定能上电梯。
    const task = allocationTask(item)
    if (task) {
      item.direction = task.cur === item.cur ? item.direction : task.cur - item.cur > 0 ? 1 : -1
      console.log(task)
      const change = getChange(item, task.cur, task.direction)
      Object.assign(item, change)
    } else {
      item.direction = 0
    }
    console.log(item)
    scheduler.observer.next(item)
  })

scheduler.abservable.pipe(filter(data => data.direction !== 0))
  .pipe(debounceTime(5))
  .pipe(delay(STEP))
  .subscribe(data => { // {id,cur,direction,target,counts} update data & publish
    data.cur += data.direction
    if (data.cur === data.target) data.target = -1
    const {id, cur, direction, counts} = data
    elevatorSubject.next({id, cur, direction, canEnter: counts < MAX_MAN})
    if (data.target !== -1) scheduler.observer.next(data) // 由调度器更新 target & direction
  })

// scheduler.abservable.pipe(filter(data => data.direction === 0)).subscribe(({id, cur, direction}) => {
//   console.log('电梯静止了')
//   elevatorSubject.next({id, cur, direction, canEnter: true})
// })

elevatorMulticasts.pipe(debounceTime(10))
  .subscribe(data => {
    console.log(ElevatorData[0])
  })

const press = ((pid) => ({cur, target}) => {
  const dir = cur - target > 0 ? -1 : 1
  const id = ++pid
  passengerSubject.next({type: -1, cur, target, id})
  let enterSub = elevatorMulticasts.pipe(debounceTime(5)) // 保证先下后上
    .pipe(filter(({canEnter, cur, direction}) => canEnter && cur === cur && direction === dir))
    .subscribe(state => {
      enterSub.unsubscribe()
      enterSub = null
      passengerSubject.next({type: 0, target, id, eid: state.id})
      let outSub = elevatorMulticasts.pipe(filter(state => state.cur === target)).subscribe(state => {
        outSub.unsubscribe()
        outSub = null
        passengerSubject.next({type: 1, id, eid: state.id})
      })
    })
}
)(0)

export default {
  press
}

// bug 由于电梯传递的是不可变状态，所以当下人后计算了新方向和target而不能传递到进入人那里，导致方向和target不一致
