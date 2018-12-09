// 浅尝 rxjs
import {Observable} from 'rxjs'
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

function demo2() {
  // error complete 只会发生一次，发生后就不再发送通知了
}

export default {
  demo1
}
