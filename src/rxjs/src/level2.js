import {Observable, interval, combineLatest, of, zip} from 'rxjs'
import {take, map, switchAll, switchMap,combineAll} from 'rxjs/operators'

import {DemoModule} from './data'

const desc = `这一部分主要是对多个流过程细节的操作，
流的过程抉择 switch，一旦源消息触发，将进行新的高阶 observable 处理，并取消之前未完成的订阅
流的消息合并 combineLatest zip`
const level2Demos = new DemoModule('多个流的过程2', desc)
const register = level2Demos.createRegister()

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
}, `正好总结一下all map mapTo
all 参数最多就数字表示并发数，不过只要merge可以使用
map 第一个参数是返回 observable 的函数，第二个参数是处理器，第三个参数只要merge有，并发数
mapTo 第一个参数是 observable，后面两个参数同上`)

// combine
// index combineLatest; operators combineAll combineLatest

register('combineLatest-index', () => {
  combineLatest(
    interval(500).pipe(take(4)),
    interval(1000).pipe(take(3)),
    Observable.create(observer => {
      observer.next(2333)
      observer.next(555)
    })
  ).subscribe(v => {
    console.log(v)
  })
}, `当所有流触发后第一次触发，后续每次触发都返回所有流最新值组成的数组
这个和 zip 很像，但机制不同`)

register('combineAll-operator', () => {
  Observable.create(observer => {
    observer.next(1)
    observer.next(2)
    observer.next(2)
    observer.next(2)
  }).pipe(
    map(v => interval(500).pipe(take(3))),
    take(2)
  ).pipe(combineAll((...args) => args.map(v => `test ${v}`))).subscribe({
    next: x => console.log(x),
    complete: () => console.log('complate')
  })
}, `注意 pipe 可以传递多个参数
这里表示合并的数量是指源消息生成的 高阶observable 数量
例如 take(2) 但是源消息只 next 一次，这里就不会发布
可以传入一个处理函数
有一点像 merge combineLatest-operators显然被废弃～`)

// zip
// index zip; Operators zipAll

register('zip-index', () => {
  zip(
    interval(500).pipe(take(4)),
    interval(1000).pipe(take(3)),
    Observable.create(observer => {
      observer.next(2333)
      observer.next(555)
      observer.complete()
    })
  ).subscribe({
    next: v => console.log(v),
    complete: () => console.log('complate')
  })
}, `zip 和 combineLatest 很像，首次触发时机是一样的，但是第二次需要等待所有ok才继续
这也意味着一旦有一个 complete，就不再继续了`)

register('zipAll-operator', () => {
  console.log('如果理解了 combineAll 这里应该就明白了，可以传入一个处理函数')
})

// startWith (operators)
// withLatestFrom

export default level2Demos
