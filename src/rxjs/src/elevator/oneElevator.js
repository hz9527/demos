import {Observable, Subject} from 'rxjs'
import {filter, scan, delay, multicast, debounceTime, partition, map} from 'rxjs/operators'
import {MAX_MAN, STEP, MAX_FLOOR} from './config'
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
const {subject: schedulerSubject, multicasts: schedulerObservable} = multiFactory()
const {subject: passengerSubject, multicasts: passengerObservable} = multiFactory()
const {subject: elevatorSubject, multicasts: elevatorMulticasts} = multiFactory()

const ElevatorData = {id: 1, cur: 0, direction: 0, counts: 0, target: -1}
const Task = {}
function getMsg(data) {
  const {id, cur, direction, counts} = data
  return {id, direction, cur, canEnter: counts < MAX_MAN}
}
function getTask() {
  const {direction, cur} = ElevatorData
  let task = Object.keys(Task).reduce((res, key) => {
    const value = Task[key].cur - cur // maybe 0
    const sameDir = value === 0 ? Task[key].direction === direction : value * direction > 0
    const abs = Math.abs(value)
    // 0 sameDir 为 true 满足条件 1 sameir 为 false 满足条件
    return res.map((item, i) => {
      if (!i === sameDir && (!item || (item && item.abs < abs))) {
        return {abs, info: {id: key, sameDir, target: value === 0 ? Task[key].target : Task[key].cur}}
      }
      return item
    })
  }, [null, null]).filter(item => item !== null)[0]
  return task ? task.info : null
}
passengerObservable.pipe(filter(data => data.type === -1))
  .subscribe(({id, cur, target}) => {
    // 新增 task
    const direction = target - cur > 0 ? 1 : -1
    Task[id] = {cur, target, direction}
    if (ElevatorData.direction === 0) {
      const value = cur - ElevatorData.cur
      ElevatorData.direction = value === 0 ? direction : value / Math.abs(value)
      ElevatorData.target = value === 0 ? target : cur
      schedulerSubject.next(ElevatorData)
      elevatorSubject.next(getMsg(ElevatorData))
    }
  })
passengerObservable.pipe(filter(data => data.type === 0))
  .subscribe(({id, eid, target}) => {
    // 计算是否需要更新 target
    const key = ElevatorData.direction > 0 ? 'max' : 'min'
    ElevatorData.target = Math[key](target, ElevatorData.target)
    ElevatorData.counts++
    delete Task[id]
    elevatorSubject.next(getMsg(ElevatorData))
  })
passengerObservable.pipe(filter(data => data.type === 1))
  .subscribe(({id, eid}) => {
    // 减员
    ElevatorData.counts--
    elevatorSubject.next(getMsg(ElevatorData))
  })

schedulerObservable.pipe(filter(data => data.target === -1 && data.direction !== 0))
  .subscribe(data => {
    // 同方向有更远或当前位置的等候者，反方向有更远或当前位置的等候者
    const task = getTask()
    if (task) {
      data.target = task.target
      if (!task.sameDir) {
        data.direction = data.direction * -1
        elevatorSubject.next(getMsg(data))
      }
    } else {
      data.direction = 0
    }
    schedulerSubject.next(data)
  })

schedulerObservable.pipe(filter(data => data.target !== -1))
  .pipe(delay(STEP))
  .subscribe(data => { // {id,cur,direction,target,counts} update data & publish
    data.cur += data.direction
    if (data.cur === data.target) data.target = -1
    elevatorSubject.next(getMsg(data))
    schedulerSubject.next(data) // 由调度器更新 target & direction
  })

elevatorMulticasts
  .subscribe(data => {
    console.log(ElevatorData)
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
