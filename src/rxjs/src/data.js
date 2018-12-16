let counts = 0
export class DemoModule {
  constructor (title, desc = '') {
    this.desc = desc
    this.demos = []
    this.key = `item${++counts}`
    this.title = title || this.key
  }
  createRegister() {
    return this.regist.bind(this)
  }
  regist(title, fn, desc = '') {
    if (!title) {
      console.warn(`please define titile for ${fn}`);
    } else if (typeof fn !== 'function') {
      console.warn(`${fn} must be function`);
    } else {
      const key = `${this.key}-demo${this.demos.length + 1}`
      this.demos.push({key, fn, desc, title})
    }
  }
}

class Modules { // 以 demokey 拍平
  constructor(modules) {
    this.demos = {}
    // {title: demos[{key, title}]}
    let data = Array.from(new Set(modules)).reduce((res, demoModule) => {
      const {desc = demoModule.desc, demos = []} = res[demoModule.title] || {}
      demoModule.demos.forEach(({key, fn, desc, title}) => {
        demos.push({key, title})
        this.demos[key] = {fn, desc: `${title}\n${desc}`}
      })
      res[demoModule.title] = {desc, demos}
      return res
    }, {})
    data = Object.keys(data).map(title => (Object.assign({title}, data[title])))
    Modules.createdHooks.forEach(hook => hook(data))
  }
  has(demoKey) {
    return demoKey in this.demos
  }
  get(demoKey) {
    return this.demos[demoKey] // fn desc
  }
  static onCreated(fn) {
    if (typeof fn !== 'function') return
    this.createdHooks.push(fn)
  }
}
Modules.createdHooks = []

export default Modules
