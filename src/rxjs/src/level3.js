import {Observable, interval, forkJoin, of} from 'rxjs'
import {take, map} from 'rxjs/operators'

import {DemoModule} from './data'
const level3Demos = new DemoModule('多个流结果的处理', '')
const register = level3Demos.createRegister()

// forkJoin (index)
register('forkJoin-index', () => {
  const source1 = interval(500).pipe(take(5)).pipe(map(v => `interval ${v}`))
  const source2 = of(0, 1, 2, 3).pipe(map(v => `of ${v}`))
  const source3 = Observable.create(observer => {
    observer.next(Date.now())
    setTimeout(() => {
      observer.complete()
    }, 3000)
  })
  forkJoin(source1, source2, source3)
    .subscribe(res => console.log(res, Date.now() - res[2]))
}, `等待所有 observable 完成后取每一个结果组成一个数组(并发触发)
有点像Promise.all(Promise.allList).then(res => res.map(list => list[list.length - 1]))`)

export default level3Demos
