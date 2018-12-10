import { onErrorResumeNext } from "rxjs";

const CONF = {
  con: 'item-box',
  itemCon: 'item',
  title: 'title',
  btn: name => `btn ${name}`
}
export default function init() { // el, ...{title, data}
  const set = new Set()
  const args = Array.apply(null, arguments)
  const el = args.shift()
  const data = args.map(({title, data}) => {
    return {
      title,
      data: Object.keys(data).map(key => data[key]).filter(fn => {
        if (set.has(fn.name)) {
          console.warn(`${fn.name} has defined`)
          return false
        }
        if (!fn.title) {
          console.warn(`please define titile for ${fn.name}`)
          return false
        }
        set.add(fn.name)
        return true
      })
    }
  })
  const div = document.createElement('div')
  div.className = CONF.con
  div.innerHTML = data.map(item => {
    return `<div class="${CONF.itemCon}">
      <div class="${CONF.title}">${item.title}</div>
      ${item.data.map(fn => `<div class="${CONF.btn(fn.name)}">${fn.title}</div>`).join('')}
    </div>`
  }).join('')
  el.appendChild(div)
  // return data.reduce(
  //   (res, {data}) => 
  //     Object.assign(
  //       {},
  //       res,
  //       data.reduce((obj, item) => Object.assign({}, obj, {[item.name]: item}), {})),
  //   {}
  // )
  return Object.assign({}, ...data.map(({data}) => data.reduce((obj, item) => Object.assign({}, obj, {[item.name]: item}), {})))
}