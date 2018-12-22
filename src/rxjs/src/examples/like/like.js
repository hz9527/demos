import {fromEvent, race} from 'rxjs'
import {filter, map, scan, startWith, delay, switchMapTo,
   debounceTime, tap, partition, share, concatMapTo, skipUntil
 } from 'rxjs/operators'
import {$} from '../utils'
import Executor, {DebounceTime, HideTime} from './utils'

const Source = fromEvent($('.demo-like'), 'click')
  .pipe(filter(({target}) => target.classList.contains('btn')))
  .pipe(map(({target: {dataset: {index}}}) => index))

// 1. 如何判断在有效时间内？
// 2. 如何取消即将消失的动画？
// 状态 0 toggle点击 0 第一次连击 1 多次连击
// 消失动画，merge点击、截流，决定是否取消
// 状态订阅点击和消失动画
// 点赞动画订阅状态
const Tasks = {}

Source.subscribe(id => {
  if (!(id in Tasks)) {
    Tasks[id] = Source.pipe(filter(ind => ind === id)).pipe(share()).pipe(startWith(id))
    const vaildTime = Tasks[id].pipe(debounceTime(DebounceTime)).pipe(share())
    // 取消动画执行了，但是有新的点击进入需要移除取消动画，继续点赞
    // state 0 hide 1 justShow 2 hasShow
    const click = Tasks[id].pipe(scan((state, id) => (state === 2 ? 2 : ++state), -1)).pipe(partition(state => state === 0))
    const Clicks = click[1].pipe(filter(v => v > 0)).pipe(partition(state => state === 1))
    const SecondClick = Clicks[0].pipe(share())
    const End = race(SecondClick, vaildTime).pipe(partition(v => v !== id))
    const beforeHide = End[0].pipe(concatMapTo(vaildTime)).pipe(share())
    // 第一次点击
    const SubToggle = click[0].pipe(filter(v => v === 0))
      .subscribe(v => {
        Executor.toggle(id)
      })
    // 第二次点击衍生消失动画
    const SubShow = SecondClick.subscribe(() => {
      Executor.show(id)
    })
    const SubChange = Clicks[1].subscribe(v => {
      Executor.change(id)
    })
    // 消失动画
    const SubBeforeHide = beforeHide.subscribe(() => {
      Executor.beforeHide(id)
    })
    // beofeHide 后如果有新的点击，取消beforeHide
    const SubCancelBeforeHide = Tasks[id].pipe(skipUntil(beforeHide))
      .subscribe(() => {
        Executor.cancelHide(id)
      })
    const SubHide = Tasks[id].pipe(switchMapTo(beforeHide.pipe(delay(HideTime))))
      .subscribe(() => {
        Executor.hide(id)
        UnSubEnd()
      })
    const SubExpir = End[1]
      .subscribe(() => {
        UnSubEnd()
      })
    const UnSubEnd = () => {
      SubToggle.unsubscribe()
      SubShow.unsubscribe()
      SubChange.unsubscribe()
      SubBeforeHide.unsubscribe()
      SubCancelBeforeHide.unsubscribe()
      SubHide.unsubscribe()
      SubExpir.unsubscribe()
      delete Tasks[id]
      console.log('send data')
    }
  }
})
