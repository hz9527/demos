import {$} from '../utils'
function genStr() {
  return Math.random().toString(36).slice(2, parseInt(Math.randon() * 5) + 2)
}
export function getList(keyWord) {
  return new Promise((resolve, reject) => {
    const Length = keyWord.length < 9 ? 10 - keyWord.length : 0
    const Time = parseInt(Math.random() * 200) + 200
    setTimeout(() => {
      resolve(Array.apply(null, {length: Length}).map(() => `${genStr()}${keyWord}${genStr()}`))
    }, Time)
  })
}

export const PageData = {
  show: false,
  list: [], // value
  message: '暂无数据'
}

const Vaild = {
  show: v => typeof v === 'boolean',
  item: v => typeof v === 'string'
}

const setState = ((Data) => {
  const data = JSON.parse(JSON.stringify(Data))
  const con = $('input-list')
  return (newData) => {
    if (newData !== data) throw new Error(`${newData} is invaild`)
    if (newData.show !== data.show) {
      if (Vaild.show(newData.show)) {
        con.classList.toggle('input-show')
        data.show = newData.show
      }
    }
    if (newData.list.length === 0) {
      con.innerHTML = data.message
      data.list = []
    } else {
      if (newData.list.every(item => Vaild.value(item))) {
        data.list = newData.list.slice()
        con.innerHTML = `${data.list.map(item => `<div class="list-item" data-value="${item}">${item}</div>`).join('')}`
      } else {
        newData.list = data.list.slice()
      }
    }
  }
})(PageData)
