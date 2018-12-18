import {Observable, merge, interval, concat, race} from 'rxjs'
import {take, map, mergeAll, mergeMap, mergeMapTo, mergeScan, switchAll, switchMap, mapTo} from 'rxjs/operators'

import {DemoModule} from './data'
const desc = `根据官网参考（REFERENCE）将整体分为 index、operators、ajax、webSocket & testing
而 type 分为 const class function interface typeAlias
index 主要是 生成 Observable、Subscription、Subject 及相关
operators 则是 pipe 内的函数
rx6 在顶级去掉了 Scheduler 的概念，个人认为，在 rx6 里本身就不需要Scheduler，或者说将其隐式分到了其他操作 Observable Subscription中
或者说Scheduler是高阶 Observable类
pipe 则是高阶 Observable 实例
未完待续...(感觉还是没理解。。。)`

const level1Demos = new DemoModule('多个流处理1', desc)
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
    .subscribe(v => console.log(v, Date.now() - now, `next${v + 1}`))
}, `merge 不建议作为操作符，而使用静态方法。但是对于高阶observable 其实是有merge的必要的，所以就有了mergeAll，
参数为merge数量(指的是触发结果合并的数量，比如source触发一次，致使高阶observable 触发三次，那么需要处理完这三次才处理后续的)，默认无限。
例如demo中，merge数量是1，阻塞后续 next 消息，直到内部 observable complete 才处理下一条源消息流。`)
// 思考？？？？？

register('mergeMap-operators', () => {
  const source = Observable.create(observer => {
    setTimeout(() => observer.next('s1'), 100)
    setTimeout(() => observer.next('s2'), 300)
    setTimeout(() => observer.next('s3'), 1300)
  })
  source.pipe(mergeMap(
    v => interval(1000).pipe(take(10)),
    (sourceV, intervalV, sourceI, intervalI) => `source ${sourceV} ind: ${sourceI}; interval ${intervalV} ind: ${intervalI}`,
    2
  )).subscribe(res => {
      console.log(res)
    })
}, `参数：1. 一个返回 observable 的函数，入参为 source 发布的数据
2. 结果处理函数，默认不处理（其实pipe(map)就好了，看场景吧）
3. 合并数量
合并的是 内部 Observable 和源 observable 并发的数量。假设设置为 2 则指当前 observable 未 complete 还能并发的 源消息数为 2`)

register('mergeMapTo-operator', () => {
  Observable.create(observer => {
    setTimeout(() => observer.next('s1'), 100)
    setTimeout(() => observer.next('s2'), 300)
    setTimeout(() => observer.next('s3'), 1300)
  }).pipe(mergeMapTo(
    interval(1000).pipe(take(5)),
    (sourceV, intervalV, sourceI, intervalI) => `source ${sourceV} ind: ${sourceI}; interval ${intervalV} ind: ${intervalI}`,
    1
  )).subscribe(res => {
      console.log(res)
    })
}, `基本和mergeMap一致，只是第一个参数直接是 observable 即可，所以这个时候第二个参数比较重要了，因为第一个参数拿不到 source value`)

register('mergeScan-operator', () => {
  Observable.create(observer => {
    setTimeout(() => observer.next(10), 100)
    setTimeout(() => observer.next(100), 300)
    setTimeout(() => observer.next(1000), 1300)
  }).pipe(mergeScan(
    (res, v) => Observable.create(observer => {
      setTimeout(() => observer.next(res + v), 1000)
      setTimeout(() => {
        observer.next(res + v)
        observer.complete()
      }, 2000)
    }),
    0
  )).subscribe(res => {
      console.log(res)
    })
}, `参数：1. 累加器 就像promise一样，返回 observable 产生的数据
2. 初始值
3. 并发数，显然是源消息流并发数
什么时候才会累加？内部流处理完才可以和并发流合并，比如这里将并发数设置为1
10 * 2 110 * 2 1110 * 2
如果不设置，当内部第一个流处理完只要第3个流还没开始处理，所以只会累加这两个`)


// concat
// index concat; operators concat concatAll concatMap concatMapTo
register('concat1-index', () => {
  const source1 = interval(1000).pipe(take(5))
  const source2 = Observable.create(observer => {
    observer.next(1)
    observer.next(2333)
    setTimeout(() => {
      observer.next('timer')
    }, 4000)
  })
  concat(source1, source2).subscribe(res => {
    console.log(res)
  })
}, `如果理解了 merge concat 就很容易理解了，merge 是让多个流并行， concat 则是让多个流串行
参数可以是一个个 observable 也可以是 observable 数组。
如果是参数列表，则是第一个流完成才能进行下一个流
如果是数组，返回一个 observable 并且是并发的（就是merge）
concat operator 弃用`)

register('concatAll-operator', () => {
  console.log('等价于 mergeAll 并发数设置为 1')
  // outerObservable.pipe(map(v => innerobservable)).pipe(concatAll() / mergeAll(num))
}, `内部observable complete 处理完 才处理下一条 源消息流`)

register('concatMap-operator', () => {
  console.log('等价于 mergeMap 并发数设置为 1')
  // outerObservable.pipe(concatMap(v => innerobservable, fn(outerData, innerData, outerIndex, innerIndex)))
  // outerObservable.pipe(mergeMapMap(v => innerobservable, fn, num))
}, `1. 返回 observable 的函数；2. 数据处理器`)

register('concatMapTo-operator', () => {
  console.log('等价于 mergeMapTo 并发数设置为 1')
  // outerObservable.pipe(concatMap(innerobservable, fn(outerData, innerData, outerIndex, innerIndex)))
  // outerObservable.pipe(mergeMapMap(innerobservable, fn, num))
}, `1. observable 2. 数据处理器`)


// switch (operators)
// switchAll switchMap switchMapTo

register('switch-operator', () => {
  Observable.create(observer => {
    setTimeout(() => observer.next('s1'), 100)
    setTimeout(() => observer.next('s2'), 300)
    setTimeout(() => observer.next('s3'), 1500)
    setTimeout(() => observer.complete(), 2500)
  }).pipe(map(v => interval(1000).pipe(take(5)))).pipe(switchAll())
  .subscribe(v => console.log(v))
}, `没有参数。switch 在数据竞争里比较关键。就是指当源 observable 发出新的数据就取消内部 observable 之前的订阅。
适用场景就是优先当前请求并废弃之前正在处理的事务`)

register('switchMap-operator', () => {
  Observable.create(observer => {
    setTimeout(() => observer.next('我来模拟第一次点击事件'), 100)
    setTimeout(() => observer.next('我来模拟第二次点击事件'), 300)
    setTimeout(() => observer.next('我来模拟第三次点击事件'), 1500)
  }).pipe(switchMap((click, i) => Observable.create(observer => {
    console.log(`第${i + 1}次点击，准备请求数据，将取消之前未返回的数据的订阅啦`)
    setTimeout(() => observer.next(`给，这是第${i + 1}次点击的数据返回 入参${click}`), 2000 - i * 1000)
  }))).subscribe(d => console.log(d))
}, `参数与concat 类似，第二个参数是处理函数`)

register('switchMapTo-operator', () => {
  console.log('好像应该明白了')
})

// race (index&operator)
register('race', () => {
  race(
    Observable.create(ob => {
      console.log('pull1');
      setTimeout(() => ob.next('ob1'), 500)
      setTimeout(() => ob.next('ob1'), 900)
    }),
    Observable.create(ob => {
      console.log('pull2');
      setTimeout(() => ob.next('ob2'), 800)
      setTimeout(() => ob.next('ob2'), 850)
    }),
  ).subscribe(console.log)
}, `让observable竞争，第一个返回的获得订阅权限
operator race 废弃`)

export default level1Demos
