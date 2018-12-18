# why

其实第一次听说 rxjs 应该是 2017年 上半年吧。那个时候只是知道是做事件驱动的、函数式这样一些特性，并没有真正意义去了解过。
直到今天看到这样一个帖子：好友列表，点击哪个好友展示哪个好友信息，如果是正常的处理逻辑也需要判断请求返回的是否是当前需要展示的数据。
记得之前写过一个类似的需求（点击预览图片，会根据图片实际宽高显示 查看大图 按钮），实现是通过一个单例来决定是否显示。
对于这类数据异步操作，其实都存在类似 竞争、截流等操作  

似乎 rx 有不同的思路

## rxjs 入门

### 基本概念

1. Observable 可观察对象
1. Observer 观察者
1. Subsription 订阅
1. Operators 操作符
1. Subject 主体
1. Schedulers 调度器

### 推拉的概念

发布与订阅的关系基本可以概括为推拉，可以理解为数据生产者与消费者的关系；
数据生产者最重要的是什么时候生产，消费者最重要的则是什么时候获得数据。
拉数据是消费者主动实行的，从而触发生产者生产；推数据是生产者主动实行的，从而触发消费者消费

## rxjs api
[operators](#operators)
### index

**const**

`[animationFrame,asap,async,config,empty,never,observable,queue]`

**interface**

```js
[
  'ArgumentOutOfRangeError',
  'CompletionObserver',
  'EmptyError',
  'ErrorObserver',
  'MonoTypeOperatorFunction',
  'NextObserver',
  'ObjectUnsubscribedError',
  'Observer',
  'Operator',
  'OperatorFunction',
  'SchedulerAction',
  'SchedulerLike',
  'Subscribable',
  'SubscriptionLike',
  'TimeInterval',
  'TimeoutError',
  'Timestamp',
  'UnaryFunction',
  'Unsubscribable',
  'UnsubscriptionError'
]
```

**class**

```js
[
  'AsyncSubject',
  'BehaviorSubject',
  'ConnectableObservable',
  'GroupedObservable',
  'Notification',
  'Observable',
  'ReplaySubject',
  'Scheduler',
  'Subject',
  'Subscriber',
  'Subscription',
  'VirtualTimeScheduler'
]
```

**function**

```js
[
  'bindCallback',
  'bindNodeCallback',
  'combineLatest',
  'concat', // down
  'defer',
  'empty',
  'forkJoin',
  'from',
  'fromEvent', // down
  'fromEventPattern',
  'generate',
  'identity',
  'iif',
  'interval', // down
  'isObservable',
  'merge', // down
  'never',
  'noop',
  'of',
  'onErrorResumeNext',
  'pairs', // down
  'pipe', // down
  'race', // down
  'range',
  'throwError',
  'timer', // down
  'using',
  'zip'
]
```

> todo combineLatest concat defer forkJoin merge race using zip

**type-alias**

```js
[
  'FactoryOrValue',
  'InteropObservable',
  'ObservableInput',
  'ObservableLike',
  'PartialObserver',
  'SubscribableOrPromise',
  'TeardownLogic'
]
```
### operators

**function**

```js
[
  'audit',
  'auditTime',
  'buffer',
  'bufferCount',
  'bufferTime',
  'bufferToggle',
  'bufferWhen',
  'catchError',
  'combineAll',
  'combineLatest',
  'concat', // 弃用
  'concatAll', // down
  'concatMap', // down
  'concatMapTo', // down
  'count',
  'debounce',
  'debounceTime', // down
  'defaultIfEmpty',
  'delay', // down
  'delayWhen',
  'dematerialize',
  'distinct',
  'distinctUntilChanged',
  'distinctUntilKeyChanged',
  'elementAt',
  'endWith',
  'every',
  'exhaust',
  'exhaustMap',
  'expand',
  'filter', // down
  'finalize',
  'find', // down
  'findIndex',
  'first',
  'flatMap',
  'groupBy',
  'ignoreElements',
  'isEmpty',
  'last',
  'map', // down
  'mapTo',
  'materialize',
  'max',
  'merge', // 弃用
  'mergeAll', // down
  'mergeMap', // down
  'mergeMapTo', // down
  'mergeScan', // down
  'min',
  'multicast', // down
  'observeOn',
  'onErrorResumeNext',
  'pairwise',
  'partition',
  'pluck', // down
  'publish',
  'publishBehavior',
  'publishLast',
  'publishReplay',
  'race', // 弃用
  'reduce',
  'refCount',
  'repeat',
  'repeatWhen',
  'retry',
  'retryWhen',
  'sample',
  'sampleTime',
  'scan', // down
  'sequenceEqual',
  'share',
  'shareReplay',
  'single',
  'skip',
  'skipLast',
  'skipUntil',
  'skipWhile',
  'startWith',
  'subscribeOn',
  'switchAll', // down
  'switchMap', // down
  'switchMapTo', // down
  'take', // down
  'takeLast',
  'takeUntil',
  'takeWhile',
  'tap',
  'throttle',
  'throttleTime',
  'timeInterval',
  'timeout',
  'timeoutWith',
  'timestamp',
  'toArray',
  'window',
  'windowCount',
  'windowTime',
  'windowToggle',
  'windowWhen',
  'withLatestFrom',
  'zip',
  'zipAll'
]
```

**const**
`[throwifempty]`  
[index](#index)

### ajax

**const**
`[ajax]`

**interface**
`[ajaxerror,ajaxrequest,ajaxtimeouterror]`

**class**
`[ajaxresponse]`

### websocket
**function**
`[websocket]`

**class**
`[websocketsubject]`

**interface**
`[websocketsubjectconfig]`

### testing

**class**
`[testscheduler]`

## rxjs 思想
## rxjs 总结

## demo

- [ ] 输入框at
- [ ] 电梯调度
