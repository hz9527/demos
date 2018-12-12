import {Observable, Subject} from 'rxjs'
import {filter, scan, delay, multicast, debounceTime} from 'rxjs/operators'
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

function choose(tar, dir) { // dir 一定不为 0
  // 排除满员、非顺路，选择 target 差距最小的
  return ElevatorData.filter(({cur, direction, counts, target}) => {
    if (counts === MAX_MAN) return false;
    if (target === -1) return true
    const value = tar - target
    // direction -1 1 0 dir -1 1 & accross
    if (direction * dir > -1 && value * dir >= 0) return true
    return false
  }).sort(({cur}, {cur: cur2}) => Math.abs(cur - tar) - Math.abs(cur2 - tar))[0]
}
function getChange(item, target, dir) {
  // item.target 可能为 -1 direction 可能为 0
  let result = {}
  if (item.direction === 0) {
    result.direction = item.target === -1 ? item.cur - target > 0 ? -1 : 1 : dir
  }
  const farthest = item.target === -1 ? target : Math[dir === -1 ? 'min' : 'max'](target, item.target)
  if (farthest !== item.target) {
    result.target = farthest
  }
  if (Object.keys(result).length !== 0) {
    result.id = item.id
  } else {
    result = null
  }
  return result
}
function allocation(target, dir) {
  const result = choose(target, dir)
  let change = null
  if (result) {
    change = getChange(result, target, dir)
  }
  return change
}
function chooseTask(item) { // direction 可能为0
  // 如果有方向选择顺路最远的，如果没有方向选择最近的
  const task = Object.keys(Task).map(id => Object.assign({id}, Task[id]))
  if (task.length === 0) return null
  if (item.direction === 0) {
    return task.sort(({cur}, {cur: cur2}) => Math.abs(cur - item.cur) - Math.abs(cur2 - item.cur))[0]
  } else {
    return task.filter(({direction}) => direction === item.direction)
      .sort((({cur}, {cur: cur2}) => Math.abs(cur2 - item.cur) - Math.abs(cur - item.cur)))[0]
  }
}

passengerObservable.pipe(filter(data => data.type === -1))
  .subscribe(({id, cur, target}) => {
    // 尝试分配电梯 & task
    const direction = target - cur > 0 ? 1 : -1
    Task[id] = {cur, target, direction}
    const change = allocation(cur, direction)
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
    // 尝试更新单个任务 & waitTask
    const item = ElevatorData.find(({id}) => id === eid)
    item.counts++
    console.log(`name: ${id}, cur ${item.cur} enter & go ${target} ${++enter}`)
    const change = getChange(item, target, Task[id].direction)
    delete Task[id]
    if (change) {
      const direction = item.direction
      Object.assign(item, change)
      direction === 0 && scheduler.observer.next(item)
    }
  })
passengerObservable.pipe(filter(data => data.type === 1))
  .subscribe(({id, eid}) => {
    // 减员
    const item = ElevatorData.find(({id}) => id === eid)
    item.counts--
    console.log(`name: ${id}, cur ${item.cur} out ${++out}`)
    // 由于增员可能会修改方向，如果还有task，一定是在满员的时候得不到响应（满员或者方向不对），所以减员后就尝试在此分配
    const task = chooseTask(item)
    if (task) {
      const change = allocation(Task[task.id].cur, Task[task.id].direction)
      if (change) {
        const direction = item.direction
        Object.assign(item, change)
        direction === 0 && scheduler.observer.next(item)
      }
    }
  })
scheduler.abservable.pipe(delay(STEP))
  .pipe(debounceTime(5))
  .subscribe(data => { // id,cur,direction,target,counts
    // update data & publish
    data.cur += data.direction
    if (data.cur === data.target) {
      data.target = -1
      data.direction = 0
    }
    const {id, cur, direction, counts} = data
    elevatorSubject.next({id, cur, direction, canEnter: counts < MAX_MAN})
    if (direction !== 0) scheduler.observer.next(data)
    // console.log(`cur floor`, cur)
  })
elevatorMulticasts.pipe(debounceTime(10))
  .subscribe(data => {
    console.log(ElevatorData[0])
  })
export default {
  passengerSubject,
  elevatorMulticasts
}

// bug 由于电梯传递的是不可变状态，所以当下人后计算了新方向和target而不能传递到进入人那里，导致方向和target不一致
