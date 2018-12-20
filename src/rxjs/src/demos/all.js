import {DemoModule} from '../data'

const baseUrl = 'https://rxjs-dev.firebaseapp.com/'

const data = [
  {
    "name": "index",
    "title": "index",
    "items": [
      {
        "name": "animationframe",
        "title": "animationFrame",
        "path": "api/index/const/animationFrameScheduler",
        "docType": "const",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "argumentoutofrangeerror",
        "title": "ArgumentOutOfRangeError",
        "path": "api/index/interface/ArgumentOutOfRangeError",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "asap",
        "title": "asap",
        "path": "api/index/const/asapScheduler",
        "docType": "const",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "async",
        "title": "async",
        "path": "api/index/const/asyncScheduler",
        "docType": "const",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "asyncsubject",
        "title": "AsyncSubject",
        "path": "api/index/class/AsyncSubject",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "behaviorsubject",
        "title": "BehaviorSubject",
        "path": "api/index/class/BehaviorSubject",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "bindcallback",
        "title": "bindCallback",
        "path": "api/index/function/bindCallback",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "bindnodecallback",
        "title": "bindNodeCallback",
        "path": "api/index/function/bindNodeCallback",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "combinelatest",
        "title": "combineLatest",
        "path": "api/index/function/combineLatest",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "completionobserver",
        "title": "CompletionObserver",
        "path": "api/index/interface/CompletionObserver",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "concat",
        "title": "concat",
        "path": "api/index/function/concat",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "config",
        "title": "config",
        "path": "api/index/const/config",
        "docType": "const",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "connectableobservable",
        "title": "ConnectableObservable",
        "path": "api/index/class/ConnectableObservable",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "defer",
        "title": "defer",
        "path": "api/index/function/defer",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "empty",
        "title": "EMPTY",
        "path": "api/index/const/EMPTY",
        "docType": "const",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "empty",
        "title": "empty",
        "path": "api/index/function/empty",
        "docType": "function",
        "stability": "deprecated",
        "securityRisk": false
      },
      {
        "name": "emptyerror",
        "title": "EmptyError",
        "path": "api/index/interface/EmptyError",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "errorobserver",
        "title": "ErrorObserver",
        "path": "api/index/interface/ErrorObserver",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "factoryorvalue",
        "title": "FactoryOrValue",
        "path": "api/index/type-alias/FactoryOrValue",
        "docType": "type-alias",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "forkjoin",
        "title": "forkJoin",
        "path": "api/index/function/forkJoin",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "from",
        "title": "from",
        "path": "api/index/function/from",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "fromevent",
        "title": "fromEvent",
        "path": "api/index/function/fromEvent",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "fromeventpattern",
        "title": "fromEventPattern",
        "path": "api/index/function/fromEventPattern",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "generate",
        "title": "generate",
        "path": "api/index/function/generate",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "groupedobservable",
        "title": "GroupedObservable",
        "path": "api/index/class/GroupedObservable",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "identity",
        "title": "identity",
        "path": "api/index/function/identity",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "iif",
        "title": "iif",
        "path": "api/index/function/iif",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "interopobservable",
        "title": "InteropObservable",
        "path": "api/index/type-alias/InteropObservable",
        "docType": "type-alias",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "interval",
        "title": "interval",
        "path": "api/index/function/interval",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "isobservable",
        "title": "isObservable",
        "path": "api/index/function/isObservable",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "merge",
        "title": "merge",
        "path": "api/index/function/merge",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "monotypeoperatorfunction",
        "title": "MonoTypeOperatorFunction",
        "path": "api/index/interface/MonoTypeOperatorFunction",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "never",
        "title": "never",
        "path": "api/index/function/never",
        "docType": "function",
        "stability": "deprecated",
        "securityRisk": false
      },
      {
        "name": "never",
        "title": "NEVER",
        "path": "api/index/const/NEVER",
        "docType": "const",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "nextobserver",
        "title": "NextObserver",
        "path": "api/index/interface/NextObserver",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "noop",
        "title": "noop",
        "path": "api/index/function/noop",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "notification",
        "title": "Notification",
        "path": "api/index/class/Notification",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "objectunsubscribederror",
        "title": "ObjectUnsubscribedError",
        "path": "api/index/interface/ObjectUnsubscribedError",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "observable",
        "title": "observable",
        "path": "api/index/const/observable",
        "docType": "const",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "observable",
        "title": "Observable",
        "path": "api/index/class/Observable",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "observableinput",
        "title": "ObservableInput",
        "path": "api/index/type-alias/ObservableInput",
        "docType": "type-alias",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "observablelike",
        "title": "ObservableLike",
        "path": "api/index/type-alias/ObservableLike",
        "docType": "type-alias",
        "stability": "deprecated",
        "securityRisk": false
      },
      {
        "name": "observer",
        "title": "Observer",
        "path": "api/index/interface/Observer",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "of",
        "title": "of",
        "path": "api/index/function/of",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "onerrorresumenext",
        "title": "onErrorResumeNext",
        "path": "api/index/function/onErrorResumeNext",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "operator",
        "title": "Operator",
        "path": "api/index/interface/Operator",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "operatorfunction",
        "title": "OperatorFunction",
        "path": "api/index/interface/OperatorFunction",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "pairs",
        "title": "pairs",
        "path": "api/index/function/pairs",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "partialobserver",
        "title": "PartialObserver",
        "path": "api/index/type-alias/PartialObserver",
        "docType": "type-alias",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "pipe",
        "title": "pipe",
        "path": "api/index/function/pipe",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "queue",
        "title": "queue",
        "path": "api/index/const/queueScheduler",
        "docType": "const",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "race",
        "title": "race",
        "path": "api/index/function/race",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "range",
        "title": "range",
        "path": "api/index/function/range",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "replaysubject",
        "title": "ReplaySubject",
        "path": "api/index/class/ReplaySubject",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "scheduler",
        "title": "Scheduler",
        "path": "api/index/class/Scheduler",
        "docType": "class",
        "stability": "deprecated",
        "securityRisk": false
      },
      {
        "name": "scheduleraction",
        "title": "SchedulerAction",
        "path": "api/index/interface/SchedulerAction",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "schedulerlike",
        "title": "SchedulerLike",
        "path": "api/index/interface/SchedulerLike",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "subject",
        "title": "Subject",
        "path": "api/index/class/Subject",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "subscribable",
        "title": "Subscribable",
        "path": "api/index/interface/Subscribable",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "subscribableorpromise",
        "title": "SubscribableOrPromise",
        "path": "api/index/type-alias/SubscribableOrPromise",
        "docType": "type-alias",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "subscriber",
        "title": "Subscriber",
        "path": "api/index/class/Subscriber",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "subscription",
        "title": "Subscription",
        "path": "api/index/class/Subscription",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "subscriptionlike",
        "title": "SubscriptionLike",
        "path": "api/index/interface/SubscriptionLike",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "teardownlogic",
        "title": "TeardownLogic",
        "path": "api/index/type-alias/TeardownLogic",
        "docType": "type-alias",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "throwerror",
        "title": "throwError",
        "path": "api/index/function/throwError",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "timeinterval",
        "title": "TimeInterval",
        "path": "api/index/interface/TimeInterval",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "timeouterror",
        "title": "TimeoutError",
        "path": "api/index/interface/TimeoutError",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "timer",
        "title": "timer",
        "path": "api/index/function/timer",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "timestamp",
        "title": "Timestamp",
        "path": "api/index/interface/Timestamp",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "unaryfunction",
        "title": "UnaryFunction",
        "path": "api/index/interface/UnaryFunction",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "unsubscribable",
        "title": "Unsubscribable",
        "path": "api/index/interface/Unsubscribable",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "unsubscriptionerror",
        "title": "UnsubscriptionError",
        "path": "api/index/interface/UnsubscriptionError",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "using",
        "title": "using",
        "path": "api/index/function/using",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "virtualtimescheduler",
        "title": "VirtualTimeScheduler",
        "path": "api/index/class/VirtualTimeScheduler",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "zip",
        "title": "zip",
        "path": "api/index/function/zip",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      }
    ]
  },
  {
    "name": "operators",
    "title": "operators",
    "items": [
      {
        "name": "audit",
        "title": "audit",
        "path": "api/operators/audit",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "audittime",
        "title": "auditTime",
        "path": "api/operators/auditTime",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "buffer",
        "title": "buffer",
        "path": "api/operators/buffer",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "buffercount",
        "title": "bufferCount",
        "path": "api/operators/bufferCount",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "buffertime",
        "title": "bufferTime",
        "path": "api/operators/bufferTime",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "buffertoggle",
        "title": "bufferToggle",
        "path": "api/operators/bufferToggle",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "bufferwhen",
        "title": "bufferWhen",
        "path": "api/operators/bufferWhen",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "catcherror",
        "title": "catchError",
        "path": "api/operators/catchError",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "combineall",
        "title": "combineAll",
        "path": "api/operators/combineAll",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "combinelatest",
        "title": "combineLatest",
        "path": "api/operators/combineLatest",
        "docType": "function",
        "stability": "deprecated",
        "securityRisk": false
      },
      {
        "name": "concat",
        "title": "concat",
        "path": "api/operators/concat",
        "docType": "function",
        "stability": "deprecated",
        "securityRisk": false
      },
      {
        "name": "concatall",
        "title": "concatAll",
        "path": "api/operators/concatAll",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "concatmap",
        "title": "concatMap",
        "path": "api/operators/concatMap",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "concatmapto",
        "title": "concatMapTo",
        "path": "api/operators/concatMapTo",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "count",
        "title": "count",
        "path": "api/operators/count",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "debounce",
        "title": "debounce",
        "path": "api/operators/debounce",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "debouncetime",
        "title": "debounceTime",
        "path": "api/operators/debounceTime",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "defaultifempty",
        "title": "defaultIfEmpty",
        "path": "api/operators/defaultIfEmpty",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "delay",
        "title": "delay",
        "path": "api/operators/delay",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "delaywhen",
        "title": "delayWhen",
        "path": "api/operators/delayWhen",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "dematerialize",
        "title": "dematerialize",
        "path": "api/operators/dematerialize",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "distinct",
        "title": "distinct",
        "path": "api/operators/distinct",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "distinctuntilchanged",
        "title": "distinctUntilChanged",
        "path": "api/operators/distinctUntilChanged",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "distinctuntilkeychanged",
        "title": "distinctUntilKeyChanged",
        "path": "api/operators/distinctUntilKeyChanged",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "elementat",
        "title": "elementAt",
        "path": "api/operators/elementAt",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "endwith",
        "title": "endWith",
        "path": "api/operators/endWith",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "every",
        "title": "every",
        "path": "api/operators/every",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "exhaust",
        "title": "exhaust",
        "path": "api/operators/exhaust",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "exhaustmap",
        "title": "exhaustMap",
        "path": "api/operators/exhaustMap",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "expand",
        "title": "expand",
        "path": "api/operators/expand",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "filter",
        "title": "filter",
        "path": "api/operators/filter",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "finalize",
        "title": "finalize",
        "path": "api/operators/finalize",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "find",
        "title": "find",
        "path": "api/operators/find",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "findindex",
        "title": "findIndex",
        "path": "api/operators/findIndex",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "first",
        "title": "first",
        "path": "api/operators/first",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "flatmap",
        "title": "flatMap",
        "path": "api/operators/flatMap",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "groupby",
        "title": "groupBy",
        "path": "api/operators/groupBy",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "ignoreelements",
        "title": "ignoreElements",
        "path": "api/operators/ignoreElements",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "isempty",
        "title": "isEmpty",
        "path": "api/operators/isEmpty",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "last",
        "title": "last",
        "path": "api/operators/last",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "map",
        "title": "map",
        "path": "api/operators/map",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "mapto",
        "title": "mapTo",
        "path": "api/operators/mapTo",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "materialize",
        "title": "materialize",
        "path": "api/operators/materialize",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "max",
        "title": "max",
        "path": "api/operators/max",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "merge",
        "title": "merge",
        "path": "api/operators/merge",
        "docType": "function",
        "stability": "deprecated",
        "securityRisk": false
      },
      {
        "name": "mergeall",
        "title": "mergeAll",
        "path": "api/operators/mergeAll",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "mergemap",
        "title": "mergeMap",
        "path": "api/operators/mergeMap",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "mergemapto",
        "title": "mergeMapTo",
        "path": "api/operators/mergeMapTo",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "mergescan",
        "title": "mergeScan",
        "path": "api/operators/mergeScan",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "min",
        "title": "min",
        "path": "api/operators/min",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "multicast",
        "title": "multicast",
        "path": "api/operators/multicast",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "observeon",
        "title": "observeOn",
        "path": "api/operators/observeOn",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "onerrorresumenext",
        "title": "onErrorResumeNext",
        "path": "api/operators/onErrorResumeNext",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "pairwise",
        "title": "pairwise",
        "path": "api/operators/pairwise",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "partition",
        "title": "partition",
        "path": "api/operators/partition",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "pluck",
        "title": "pluck",
        "path": "api/operators/pluck",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "publish",
        "title": "publish",
        "path": "api/operators/publish",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "publishbehavior",
        "title": "publishBehavior",
        "path": "api/operators/publishBehavior",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "publishlast",
        "title": "publishLast",
        "path": "api/operators/publishLast",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "publishreplay",
        "title": "publishReplay",
        "path": "api/operators/publishReplay",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "race",
        "title": "race",
        "path": "api/operators/race",
        "docType": "function",
        "stability": "deprecated",
        "securityRisk": false
      },
      {
        "name": "reduce",
        "title": "reduce",
        "path": "api/operators/reduce",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "refcount",
        "title": "refCount",
        "path": "api/operators/refCount",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "repeat",
        "title": "repeat",
        "path": "api/operators/repeat",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "repeatwhen",
        "title": "repeatWhen",
        "path": "api/operators/repeatWhen",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "retry",
        "title": "retry",
        "path": "api/operators/retry",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "retrywhen",
        "title": "retryWhen",
        "path": "api/operators/retryWhen",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "sample",
        "title": "sample",
        "path": "api/operators/sample",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "sampletime",
        "title": "sampleTime",
        "path": "api/operators/sampleTime",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "scan",
        "title": "scan",
        "path": "api/operators/scan",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "sequenceequal",
        "title": "sequenceEqual",
        "path": "api/operators/sequenceEqual",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "share",
        "title": "share",
        "path": "api/operators/share",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "sharereplay",
        "title": "shareReplay",
        "path": "api/operators/shareReplay",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "single",
        "title": "single",
        "path": "api/operators/single",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "skip",
        "title": "skip",
        "path": "api/operators/skip",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "skiplast",
        "title": "skipLast",
        "path": "api/operators/skipLast",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "skipuntil",
        "title": "skipUntil",
        "path": "api/operators/skipUntil",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "skipwhile",
        "title": "skipWhile",
        "path": "api/operators/skipWhile",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "startwith",
        "title": "startWith",
        "path": "api/operators/startWith",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "subscribeon",
        "title": "subscribeOn",
        "path": "api/operators/subscribeOn",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "switchall",
        "title": "switchAll",
        "path": "api/operators/switchAll",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "switchmap",
        "title": "switchMap",
        "path": "api/operators/switchMap",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "switchmapto",
        "title": "switchMapTo",
        "path": "api/operators/switchMapTo",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "take",
        "title": "take",
        "path": "api/operators/take",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "takelast",
        "title": "takeLast",
        "path": "api/operators/takeLast",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "takeuntil",
        "title": "takeUntil",
        "path": "api/operators/takeUntil",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "takewhile",
        "title": "takeWhile",
        "path": "api/operators/takeWhile",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "tap",
        "title": "tap",
        "path": "api/operators/tap",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "throttle",
        "title": "throttle",
        "path": "api/operators/throttle",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "throttletime",
        "title": "throttleTime",
        "path": "api/operators/throttleTime",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "throwifempty",
        "title": "throwIfEmpty",
        "path": "api/operators/throwIfEmpty",
        "docType": "const",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "timeinterval",
        "title": "timeInterval",
        "path": "api/operators/timeInterval",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "timeout",
        "title": "timeout",
        "path": "api/operators/timeout",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "timeoutwith",
        "title": "timeoutWith",
        "path": "api/operators/timeoutWith",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "timestamp",
        "title": "timestamp",
        "path": "api/operators/timestamp",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "toarray",
        "title": "toArray",
        "path": "api/operators/toArray",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "window",
        "title": "window",
        "path": "api/operators/window",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "windowcount",
        "title": "windowCount",
        "path": "api/operators/windowCount",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "windowtime",
        "title": "windowTime",
        "path": "api/operators/windowTime",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "windowtoggle",
        "title": "windowToggle",
        "path": "api/operators/windowToggle",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "windowwhen",
        "title": "windowWhen",
        "path": "api/operators/windowWhen",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "withlatestfrom",
        "title": "withLatestFrom",
        "path": "api/operators/withLatestFrom",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "zip",
        "title": "zip",
        "path": "api/operators/zip",
        "docType": "function",
        "stability": "deprecated",
        "securityRisk": false
      },
      {
        "name": "zipall",
        "title": "zipAll",
        "path": "api/operators/zipAll",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      }
    ]
  },
  {
    "name": "ajax",
    "title": "ajax",
    "items": [
      {
        "name": "ajax",
        "title": "ajax",
        "path": "api/ajax/ajax",
        "docType": "const",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "ajaxerror",
        "title": "AjaxError",
        "path": "api/ajax/AjaxError",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "ajaxrequest",
        "title": "AjaxRequest",
        "path": "api/ajax/AjaxRequest",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "ajaxresponse",
        "title": "AjaxResponse",
        "path": "api/ajax/AjaxResponse",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "ajaxtimeouterror",
        "title": "AjaxTimeoutError",
        "path": "api/ajax/AjaxTimeoutError",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      }
    ]
  },
  {
    "name": "websocket",
    "title": "webSocket",
    "items": [
      {
        "name": "websocket",
        "title": "webSocket",
        "path": "api/webSocket/webSocket",
        "docType": "function",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "websocketsubject",
        "title": "WebSocketSubject",
        "path": "api/webSocket/WebSocketSubject",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      },
      {
        "name": "websocketsubjectconfig",
        "title": "WebSocketSubjectConfig",
        "path": "api/webSocket/WebSocketSubjectConfig",
        "docType": "interface",
        "stability": "",
        "securityRisk": false
      }
    ]
  },
  {
    "name": "testing",
    "title": "testing",
    "items": [
      {
        "name": "testscheduler",
        "title": "TestScheduler",
        "path": "api/testing/TestScheduler",
        "docType": "class",
        "stability": "",
        "securityRisk": false
      }
    ]
  }
]
export default new DemoModule('allApi', data.reduce((str, item) => {
  str += `<div>${item.title}
  </div>${item.items.map(info => `<a class="btn-a" href="${baseUrl}${info.path}" target="_blank">${info.title}</a>`).join('')}`
  return str
}, ''))
