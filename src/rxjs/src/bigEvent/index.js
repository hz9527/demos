import {noop, RemoveEvent, resolveSubscribe, schedulerExector} from './helper.js'
import Server from './builtIn'
export * from './builtIn'

export default class Event {
  constructor() {
    this.data = {
      index: [],
      content: {}
    }
    this.schedulers = []
  }
  pipe(fn) {
    return new ShareDataEvent(this.data, this.schedulers.concat(fn))
  }
  on(fn, index = 0) {
    const opts = resolveSubscribe(fn, this.schedulers)
    if (!opts) throw new Error(`${fn} is invaild`)
    typeof index !== 'number' && (index = 0)
    let i = 0
    while(index > this.data.index[i]) {
      i++
    }
    this.data.index[i] !== index && this.data.index.splice(i, 0, index)
    this.data.content[index] = this.data.content[index] || []
    this.data.content[index].push(opts)
    return new RemoveEvent(this.data, index, fn)
  }
  emit(data) {
    // 需要 for循环
    const list = this.data.index.slice()
    const server = new Server()
    for (let i = 0; i < list.length; i++) {
      this.data.content[list[i]].forEach(item => {
        schedulerExector(item.schedulers, data, item.handler, server)
      })
    }
  }
  _complete(method, data, cb = noop) {
    const list = this.data.index
    const content = this.data.content
    this.data.index = []
    this.data.content = {}
    const server = new Server()
    list.forEach(key => {
      content[key].forEach(item => {
        item[method] ? schedulerExector(item.schedulers, data, item[method]) : cb(data)
      }, server)
    })
  }
  complete(data) {
    this._complete('complete', data)
  }
  error(err) {
    this._complete('error', data, data => {
      if (data && data.constructor === Error) throw new Error('uncatch err')
    })
  }
}

class ShareDataEvent extends Event {
  constructor(data, schedulers) {
    super()
    this.schedulers = schedulers
    this.data = data
  }
}
