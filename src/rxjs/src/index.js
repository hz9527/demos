import { fromEvent } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import {$, rewriteLog} from '../../utils/domHelper'
import Init, {CONF} from './init'
import Modules from './data'
import baseDemo from './base'
import level1Demos from './level1'

Modules.onCreated((data) => Init($('.demos').el, data))
const modules = new Modules([baseDemo, level1Demos])

const Log = $('.log')
const Desc = $('.description')
rewriteLog(Log.el)
// 全局监听 document
const observable = fromEvent(document, 'click');
observable.pipe(filter(({target}) => target.classList.contains(CONF.itemTitle)
 && target.parentNode.classList.contains(CONF.itemCon)))
  .subscribe(e => {
    e.target.parentNode.classList.toggle('close')
    // toggle else
  })

observable.pipe(filter(({target}) => target.classList.contains('clear-log')))
  .subscribe(console.clear)

observable.pipe(filter(({target}) => target.classList.contains('clear-desc')))
  .subscribe(({target}) => {
    Desc.el.innerHTML = ''
  })

observable.pipe(filter(({target}) => target.classList.contains(CONF.btn)))
  .pipe(map(({target}) => target.classList.item(1)))
  .pipe(filter(key => modules.has(key)))
  .subscribe(key => {
    console.clear()
    const {fn, desc} = modules.get(key)
    fn()
    Desc.el.innerHTML = `${desc ? `${desc}\n` : ''}${fn.toString()}`
  })
