function genStr() {
  return Math.random().toString(36).slice(2, parseInt(Math.randon() * 5) + 2)
}
export function getList(keyWord) {
  return new Promise((resolve, reject) => {
    const Length = 20 - keyWord.length
    const Time = parseInt(Math.random() * 200) + 200
    setTimeout(() => {
      resolve(Array.apply(null, {length: Length}).map(() => `${genStr()}${keyWord}${genStr()}`))
    }, Time)
  })
}

export const PageData = {
  show: false,
  list: [], // {value, key}
  message: '暂无数据'
}

const Vaild = {
  show: v => typeof v === 'boolean',
  value: v => typeof v === 'string',
  key: v => typeof v === 'number'
}

const setState = ((Data) => {
  const data = JSON.parse(JSON.stringify(Data))
  const con = $('input-list')
  return (newData) => {
    if (newData !== data) throw new Error(`${newData} is invaild`)
    if (newData !== data) {
      con.classList.toggle('input-show')
      data.show = newData.show
    }

  }
})(PageData)
