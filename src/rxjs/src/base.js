// 浅尝 rxjs
import {Observable, Subject} from 'rxjs'
import {filter, multicast} from 'rxjs/operators'
import {insertDesc} from './desc'
// 1. Obsevable 可观察，比如一个函数能生产数据，当这些数据不被消费，就会搁置，直到被消费
// 2. Observer
// 3. Subscription
// 4. Operators
// 5. Subject
// 6. Schedulers

function demo1() {
  // 订阅与发布
  const observable = Observable.create(observer => {
    observer.next(1)
    observer.next(2)
    setTimeout(() => {
      observer.next(3)
      observer.complete()
      observer.next(4)
    }, 1000)
  })
  observable.subscribe(
    v => console.log('pull value, it is', v),
    err => console.log('errHander', err),
    () => console.log('finish & will not accept event')
  )
}
demo1.title = '发布与订阅'

function demo2() {
  // error complete 只会发生一次，发生后就不再发送通知了
  Observable.create(observer => {
    observer.next(1)
    observer.error('err')
    observer.next(2)
    observer.complete()
  }).subscribe({
    next(v) {
      console.log('get value', v)
    },
    error(err) {
      console.log('get error', err)
    },
    complete() {
      console.log('finish')
    }
  })
}
demo2.title = '不再发布'

const Demo3Desc = `单播并不意味着只能有一个订阅者，而是指消息接收的时机，比如我们同步发送 1 2 3 异步发送 4，
  第一个订阅者只接受 大于 2的值；第二个订阅者只接受 大于 1 的值；第三个订阅者 全接受；
  那么在一个 chunk 内，处理完第一个订阅者才处理第二个，依此类推`
insertDesc('demo3', Demo3Desc)
function demo3() {
  // 单播与多播
  const observable = Observable.create(observer => {
    observer.next(1)
    observer.next(2)
    observer.next(3)
    setTimeout(() => observer.next(4), 500)
  })
  observable.pipe(filter(v => v > 2))
    .subscribe(v => console.log('subscribe 1, value: ', v))
  observable.pipe(filter(v => v > 1))
    .subscribe(v => console.log('subscribe 2, value: ', v))
  observable.subscribe(v => console.log('subscribe 3, value: ', v))
}
demo3.title = '单播与多播'

function demo4() {
  const source = Observable.create(observer => {
    observer.next(1)
    observer.next(2)
    observer.next(3)
  })
  const subject = new Subject()
  const multicasts = source.pipe(multicast(subject))
  multicasts.pipe(filter(v => v > 2))
    .subscribe(v => console.log('subscribe 1', v))
  multicasts.subscribe(v => console.log('subscribe 2', v))
  multicasts.connect()
  multicasts.subscribe(v => console.log('subscribe 3', v)) // 无效的订阅
}
demo4.title = '单播与多播2'

export default {
  demo1,
  demo2,
  demo3,
  demo4
}
