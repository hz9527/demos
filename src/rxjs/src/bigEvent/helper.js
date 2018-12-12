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

function schedulerExector(schedulers, data, fn, i = 0) {
  const scheduler = schedulers[i]
  if (!scheduler) {
    fn(data)
  } else {
    scheduler(data, (newData = data) => {
      schedulerExector(schedulers, newData, fn, ++i)
    })
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

export {
  noop,
  RemoveEvent,
  schedulerExector,
  resolveSubscribe
}
