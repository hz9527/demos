import { fromEvent } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import {$, rewriteLog} from '../../utils/domHelper'
import Init from './init'
import DescDocs from './desc'
import BaseDemo from './base'

const Demo = Init(
  $('.demos').el,
  {title: 'rx base', data: BaseDemo}
);
console.log(Demo)

const Log = $('.log')
const Desc = $('.description')
rewriteLog(Log.el)
// 全局监听 document
const observable = fromEvent(document, 'click');
// const subject = new Subject();
// const multicasted = source.pipe(multicast(subject));
observable.pipe(filter(({target}) => target.classList.contains('title') && target.parentNode.classList.contains('item')))
  .subscribe(e => {
    e.target.parentNode.classList.toggle('close')
    // toggle else
  })

observable.pipe(filter(({target}) => target.classList.contains('btn-clear')))
  .subscribe(console.clear)

observable.pipe(filter(({target}) => target.classList.contains('btn')))
  .pipe(map(({target}) => target.classList.item(1)))
  .pipe(filter(key => key in Demo))
  .subscribe(key => {
    console.clear()
    Demo[key]()
    Desc.el.innerHTML = `${key in DescDocs ? `${DescDocs[key]}\n` : ''}${Demo[key].toString()}`
  })
// multicasted.connect();
