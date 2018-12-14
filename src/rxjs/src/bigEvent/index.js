import {noop, RemoveEvent, resolveSubscribe, schedulerExector, classFactory} from './helper.js'
import ServerFactory, {TimerServer} from './server'
export * from './builtIn'
class Data {
  constructor() {
    this.index = []
    this.content = {}
    this.serverFactory = new ServerFactory()
  }
}
const defaultData = new Data()
const defaultServers = [TimerServer]
const Safety = true
class SuperEvent {
  constructor() {
    this.data = defaultData
    this.schedulers = []
  }
  pipe(fn) {
    return classFactory(ShareDataEvent, Safety)(this.data, this.schedulers.concat(fn))
    // return new ShareDataEvent(this.data, this.schedulers.concat(fn))
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
    return classFactory(RemoveEvent, Safety)(this.data, index, fn)
  }
  emit(data) {
    // 需要 for循环
    const list = this.data.index.slice()
    const server = this.data.serverFactory.create()
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
    const server = this.data.serverFactory.create()
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
      if (data && data.constructor !== Error) throw new Error('uncatch err')
    })
  }
}

export default class Event extends SuperEvent {
  constructor(serverOpt = true) {
    super()
    this.data = new Data()
    if (serverOpt === true) { // use default server
      defaultServers.forEach(server => {
        this.data.serverFactory.use(server)
      })
    }
  }
  useServer(server) {
    this.data.serverFactory.use(server)
  }
  extendEventServer(event) {
    if (event && (event.constructor === Event || event.constructor === ShareDataEvent)) {
      this.data.serverFactory.extendServers(event.data.serverFactory)
    }
  }
}
class ShareDataEvent extends SuperEvent {
  constructor(data, schedulers) {
    super()
    this.schedulers = schedulers
    this.data = data
  }
}

export const saveEvent = classFactory(Event, Safety)
