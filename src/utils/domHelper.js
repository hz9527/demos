import {getType} from './shareUtils'
class Dom {
  constructor(el) {
    this.el = el
  }
  bind(eventName, handler) {
    this.el.addEventListener(eventName, handler)
    return this
  }
  remove(eventName, handler) {
    this.el.removeEventListener(eventName, handler)
    return this
  }
}

class Doms {
  constructor(els) {
    this.doms = Array.prototype.map.call(els, el => new Dom(el))
  }
  bind(eventName, handler) {
    this.doms.forEach(dom => dom.bind(eventName, handler))
    return this
  }
  remove(eventName, handler) {
    this.doms.forEach(dom => dom.remove(eventName, handler))
    return this
  }
}

function $(selector) {
  const els = document.querySelectorAll(selector)
  return els ? els.length > 1 ? new Doms(els) : new Dom(els[0]) : null
}

function rewriteLog(dom) {
  const log = console.log
  const clear = console.clear
  let preMsg = ''
  console.log = function () {
    const msg = Array.prototype.map.call(arguments, item => {
      const type = getType(item)
      if (type === 'array' || 'object') {
        try {
          return JSON.stringify(item, void 0, 2)
        } catch(err) {
          log(err)
        }
      }
      return item
    }).join(' ')
    log(...arguments)
    preMsg += ((preMsg ? '\n' : '') + msg)
    dom.innerHTML = preMsg
  }
  console.clear = () => {
    preMsg = ''
    dom.innerHTML = preMsg
    clear()
  }
}

export {
  $,
  rewriteLog
}
