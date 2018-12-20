import { fromEvent } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import './index.scss'
import {$, rewriteLog} from '../../utils/domHelper'
import Init, {CONF} from './init'
import Modules from './data'
import baseDemo from './demos/base'
import level1Demos from './demos/level1'
import level2Demos from './demos/level2'
import level3Demos from './demos/level3'
import {think} from './demos/think'
import allApi from './demos/all'

Modules.onCreated((data) => Init($('.demos').el, data))
const modules = new Modules([allApi, baseDemo, level1Demos, level2Demos, level3Demos, think])

const Log = $('.log')
const Desc = $('.description')
rewriteLog(Log.el)
// 全局监听 document
const observable = fromEvent(document, 'click');
observable.pipe(filter(({target}) => target.classList.contains(CONF.itemTitle)
 && target.parentNode.classList.contains(CONF.itemCon)))
  .subscribe(e => {
    e.target.parentNode.classList.toggle(CONF.itemClose)
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
