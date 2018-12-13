// timer server 在一个微队列里接受所有传入timer，使得其共用同一个timer
// 同一次发布才会共用timeServer
class TimerTask {
  constructor() {
    this.data = {}
    this.id = 1
    this.isUpdate = false
  }
  add(cb, time) {
    if (this.isUpdate === false) {
      this.isUpdate = true
      Promise.resolve().then(() => {
        delete this.data[this.id]
        this.id++
      })
    }
    if (!this.data[this.id] || !this.data[this.id][time]) {
      if (!this.data[this.id]) this.data[this.id] = {}
      this.data[this.id][time] = [cb]
      const list = this.data[this.id][time]
      setTimeout(() => list.forEach(cb => cb()), time)
    } else {
      this.data[this.id][time].push(cb)
    }
    return this.data[this.id]
  }
}
class Server {
  constructor() {
    this.task = new TimerTask()
    this.timerServer = this.timerServer.bind(this)
  }
  timerServer(cb, time) {
    this.task.add(cb, time)
  }
}

function filter(fn) {
  return (data, next) => {
    fn(data) && next(data)
  }
}

function map(fn) {
  return (data, next) => {
    next(fn(data))
  }
}

function timer(time) {
  return (data, next, {timerServer}) => {
    timerServer(() => {
      next(data)
    }, time)
  }
}

function debounceTime(time) {
  let hasPlay = false
  return (data, next, {timerServer}) => {
    if (!hasPlay) {
      hasPlay = true
      timerServer(() => (hasPlay = false), time)
      next(data)
    }
  }
}

function async() {
  return (data, next) => {
    Promise.resolve(data).then(next)
  }
}

function scan(fn, preValue) {
  return (data, next) => {
    preValue = fn(preValue, data)
    next(preValue)
  }
}

export default Server
export {filter, map, timer, debounceTime, async, scan}
