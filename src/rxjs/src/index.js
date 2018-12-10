import { fromEvent, Subject } from 'rxjs';
import { multicast, filter, map } from 'rxjs/operators';
import {$, rewriteLog} from '../../utils/domHelper'
import DescDocs from './desc'
import BaseDemo from './base'

const Demo = Object.assign({}, BaseDemo)

const Log = $('.log')
const Desc = $('.description')
rewriteLog(Log.el)
// 全局监听 document
const source = fromEvent(document, 'click');
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));

multicasted.pipe(filter(({target}) => target.classList.contains('title') && target.parentNode.classList.contains('item')))
  .subscribe(e => {
    e.target.parentNode.classList.toggle('close')
    // toggle else
  })

multicasted.pipe(filter(({target}) => target.classList.contains('btn')))
  .pipe(map(({target}) => target.classList.item(1)))
  .pipe(filter(key => key in Demo))
  .subscribe(key => {
    console.clear()
    Demo[key]()
    Desc.el.innerHTML = `${key in DescDocs ? `${DescDocs[key]}\n` : ''}${Demo[key].toString()}`
  })
multicasted.connect();
