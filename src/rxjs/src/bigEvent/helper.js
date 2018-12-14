const noop = () => {}

class RemoveEvent {
  constructor(data, index, fn) {
    this.data = data
    this.index = index
    this.fn = fn
  }
  off() {
    if (!this.data.content[this.index]) return
    this.data.content[this.index] = this.data.content[this.index].filter(({handler}) => handler !== this.fn)
    if (this.data.content[this.index].length === 0) {
      delete this.data.content[this.index]
      this.data.index.splice(this.data.index.indexOf(this.index), 1)
    }
  }
}

function schedulerExector(schedulers, data, fn, server, i = 0) {
  const scheduler = schedulers[i]
  if (!scheduler) {
    fn(data)
  } else {
    scheduler(data, (newData = data) => {
      schedulerExector(schedulers, newData, fn, server, ++i)
    }, server)
  }
}

const opts = {next: 'handler', error: 'error', complete: 'complete'}
function resolveSubscribe(data, schedulers) {
  if (!data) return false
  const result = {schedulers}
  if (typeof data === 'function') {
    result.handler = data
  } else {
    Object.keys(opts).forEach(key => {
      result[opts[key]] = data[key]
    })
  }
  return result
}

// 通过装饰器实现内部数据隐藏
// 代理实现内部数据隐藏
function safeClass(Class) {
  return function () {
    const data = {}
    return new Proxy(new Class(...Array.apply(null, arguments)), {
      get(target, key) {
        if (key in data) return data[key]
        if (target.hasOwnProperty(key)) {
          return void 0
        } else {
          return typeof target[key] === 'function' ? target[key].bind(target) : target[key]
        }
      },
      set(target, key, value) {
        data[key] = value
      }
    })
  }
}

function classFactory(Class, safety) {
  return safety ? safeClass(Class) : function(...arg) {
    return new Class(...arg)
  }
}

export {
  noop,
  RemoveEvent,
  schedulerExector,
  resolveSubscribe,
  safeClass,
  classFactory
}
