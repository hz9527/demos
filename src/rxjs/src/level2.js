import {Observable, merge, interval, concat} from 'rxjs'
import {take, map, mergeAll, mergeMap, mergeMapTo, mergeScan} from 'rxjs/operators'

import {DemoModule} from './data'
const level1Demos = new DemoModule('如何学习 rx', '')
const register = level1Demos.createRegister()

// forkJoin (index)
register('forkJoin-index', () => {

}, `等待所有observable完成后取每一个结果组成一个数组
有点像Promise.all(Promise.allList).then(res => res.map(list => list[list.length - 1]))`)

// combine
// index combineLatest; operators combineAll combineLatest

// startWith (operators)
// withLatestFrom
