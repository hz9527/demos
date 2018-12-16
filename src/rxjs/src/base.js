// 浅尝 rxjs
import {Observable, Subject} from 'rxjs'
import {filter, multicast, map, debounceTime} from 'rxjs/operators'
import {DemoModule} from './data'
// 1. Obsevable 可观察，比如一个函数能生产数据，当这些数据不被消费，就会搁置，直到被消费
// 2. Observer
// 3. Subscription
// 4. Operators
// 5. Subject
// 6. Schedulers
const baseDemo = new DemoModule('rx base')
const register = baseDemo.createRegister()

register('发布与订阅', () => {
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
})

register('不再发布', () => {
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
})

register('单播与多播', () => {
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
}, `单播并不意味着只能有一个订阅者，而是指消息接收的时机，比如我们同步发送 1 2 3 异步发送 4，
  第一个订阅者只接受 大于 2的值；第二个订阅者只接受 大于 1 的值；第三个订阅者 全接受；
  那么在一个 chunk 内，处理完第一个订阅者才处理第二个，依此类推`)

register('单播与多播2', () => {
  const source = Observable.create(observer => {
    observer.next(1)
    observer.next(2)
    observer.next(3)
    setTimeout(() => observer.next(4))
  })
  const subject = new Subject()
  const multicasts = source.pipe(multicast(subject))
  multicasts.pipe(filter(v => v > 2))
    .subscribe(v => console.log('subscribe 1', v))
  multicasts.subscribe(v => console.log('subscribe 2', v))
  multicasts.connect() // 多播不可能一直等待订阅，来决定一次性发出，而是需要通过某种方式触发
  multicasts.subscribe(v => console.log('subscribe 3', v)) // 有效的订阅，只是前方已经被消费了
  subject.next(5)
})

register('单播数据的独立性', () => {
  let data
  const observable = Observable.create(observer => {
    observer.next(1)
    const v = {a: 1}
    data = v
    observer.next(v)
    console.log('exec')
  })
  observable.pipe(map(v => {
    if (typeof v === 'object') {
      v.a = {b: 2}
    } else {
      v = {value: v}
    }
    return v
  })).subscribe(v => console.log('subscribe 1', v, v === data))
  observable.subscribe(v => console.log('subscribe 2', v, v === data))
}, '单播的多订阅可以理解为每次订阅就会拉取数据，所以内部数据是独立的，假设传递的外层作用域的对象 map 的篡改就可以生效')

register('多播数据的共享性', () => {
  const source = Observable.create(observer => {
    observer.next({})
    observer.next(2)
  })
  const subject = new Subject()
  const multicasts = source.pipe(multicast(subject))
  multicasts.pipe(map(v => {
    if (typeof v === 'object') {
      v.a = {b: 2}
    } else {
      v = {value: v}
    }
    return v
  })).subscribe(v => console.log('subscribe 1', v))
  multicasts.subscribe(v => console.log('subscribe 2', v))
  multicasts.connect()
}, '此时，相信已经对单播和多播有一个认识了，单播类似于 pull 整个函数，多播类似于在 connect 就会 pull 一次，内部 forEach')

register('filter', () => {
  // filter 第二个参数使用，单播
  const observable = Observable.create(observer => {
    observer.next(1)
    observer.next(2)
  })
  observable.pipe(filter((v, i) => {
    console.log(i)
    return true
  })).subscribe(v => console.log('subscribe 1', v))
  observable.pipe(filter((v, i) => {
    console.log(i)
    return true
  })).subscribe(v => console.log('subscribe 2', v))
})

register('filter2', () => {
  // filter 第二个参数使用，多播
  const source = Observable.create(observer => {
    observer.next(1)
    observer.next(2)
  })
  const subject = new Subject()
  const multicasts = source.pipe(multicast(subject))
  multicasts.pipe(filter((v, i) => {
    console.log(i)
    return true
  })).subscribe(v => console.log('subscribe 1', v))
  multicasts.pipe(filter((v, i, d) => {
    console.log(i, d)
    return true
  })).subscribe(v => console.log('subscribe 2', v))
  multicasts.connect()
  subject.next(3)
})

register('debounceTime', () => {
  const getTem = (() => {
    let time
    let value = 0
    return () => {
      if (!time) {
        time = Date.now()
      }
      return {time, value: value++}
    }
  })()
  const observable = Observable.create(observer => {
    observer.next(getTem())
    setTimeout(() => observer.next(getTem()), 10)
    setTimeout(() => observer.next(getTem()), 800)
    setTimeout(() => observer.next(getTem()), 1700)
    setTimeout(() => observer.next(getTem()), 2500)
  })
  observable.pipe(filter(v => {console.log('accept'); return true}))
    .pipe(debounceTime(1000))
    .subscribe(data => {
      console.log(data, Date.now() - data.time)
    })
}, 'debounceTime 第一次触发后会延迟相应时间，并拒绝期间的触发，直到期间最后一次触发，以该时间为起点继续一个周期，如果没有触发就返回')

export default baseDemo
