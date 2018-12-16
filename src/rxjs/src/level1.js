import {Observable, merge, interval} from 'rxjs'
import {take, map, mergeAll, mergeMap} from 'rxjs/operators'

import {DemoModule} from './data'
const desc = `根据官网参考（REFERENCE）将整体分为 index、operators、ajax、webSocket & testing
而 type 分为 const class function interface typeAlias
index 主要是 生成 Observable、Subscription、Subject 及相关
operators 则是 pipe 内的函数
rx6 在顶级去掉了 Scheduler 的概念，个人认为，在 rx6 里本身就不需要Scheduler，或者说将其隐式分到了其他操作 Observable Subscription中
或者说Scheduler是高阶 Observable类
pipe 则是高阶 Observable 实例
未完待续...(感觉还是没理解。。。)`

const level1Demos = new DemoModule('如何学习 rx', desc)
const register = level1Demos.createRegister()
/** index
*  merge concat race MergeAll ConcatAll SwitchAll concatMap mergeMap switchMap CombineLatest Zip forkJoin WithLatestFrom
*/
// merge
// index merge; operators merge mergeAll mergeMap mergeMapTo mergeScan
register('merge-index', () => {
  const source1 = interval(400).pipe(take(3)).pipe(map(v => 1))
  const source2 = interval(300).pipe(take(2)).pipe(map(v => 2))
  const source3 = Observable.create(observer => {
    setTimeout(() => {
      console.log('err')
      observer.error()
    }, 500)
  })
  merge(source1, source2).subscribe({
    next: v => {
      console.log(`sub1 value from source${v}`)
    },
    complete: v => {
      console.log(`sub1 complete`)
    }
  })
  merge(source1, source2, source3).subscribe({
    next: v => {
      console.log(`sub2 value from source${v}`)
    },
    complete: v => {
      console.log(`sub2 complete, from source${v}`)
    },
    error: v => {
      console.log('sub2 has some error')
    }
  })
}, '合并多个observable，触发顺序与merge顺序无关。全部complete才complete，一个error就error')

register('merge-operators', () => {
  console.log('弃用，建议直接使用静态方法 merge')
})

register('mergeAll-operators', () => {
  Observable.create(observer => {
    setTimeout(() => observer.next(1), 100)
    setTimeout(() => observer.next(1), 300)
    setTimeout(() => observer.next(1), 1300)
  }).pipe(map(v => interval(1000).pipe(take(3))))
    .subscribe(ob => {
      const now = Date.now()
      ob.subscribe(v => console.log('from interval', Date.now() - now))
      console.log('from observable')
    })
}, '首先看一个概念，高阶Observable。即返回一个 observable')

register('mergeAll2-operators', () => {
  const source = Observable.create(observer => {
    setTimeout(() => observer.next(1), 100)
    setTimeout(() => observer.next(1), 400)
    setTimeout(() => observer.next(1), 1300)
  })
  const now = Date.now()
  const higherOrder = source.pipe(map(v => interval(1000).pipe(take(3))))
  higherOrder.pipe(mergeAll(1))
    .subscribe(v => console.log(v, Date.now() - now))
}, `merge 不建议作为操作符，而使用静态方法。但是对于高阶observable 其实是有merge的必要的，所以就有了mergeAll，
参数为merge数量(指的是触发结果合并的数量，比如source触发一次，致使高阶observable 触发三次，那么需要处理完这三次才处理后续的)，默认无限。
例如demo中，触发了三次 next，但每次 source 触发会使得 interval 发布三次，当处理完一次并发的才处理第二个`)
// 思考？？？？？

register('mergeMap-operators', () => {
  Observable.create(observer => {
    setTimeout(() => observer.next(1), 100)
    setTimeout(() => observer.next(1), 300)
    setTimeout(() => observer.next(1), 1300)
  }).pipe(map(v => interval(1000).pipe(take(3))))
    .subscribe(ob => {
      const now = Date.now()
      ob.subscribe(v => console.log('from interval', Date.now() - now))
      console.log('from observable')
    })
}, '')
// concat
// index concat; operators concat concatAll concatMap concatMapTo

// forkJoin (index)

// race (index)

// switch (operators)
// switchAll switchMap switchMapTo

// combine
// index combineLatest; operators combineAll combineLatest

// startWith (operators)
// withLatestFrom

export default level1Demos
