import {MAX_FLOOR} from './config'

function getNum(num) {
  return parseInt(Math.random() * num)
}
function genFloor(exclude) {
  let result = getNum(MAX_FLOOR)
  while (result === exclude) {
    result = getNum(MAX_FLOOR)
  }
  return result
}
// 回家占 45%， 出门 45%，串门 10%
const ItemConf = [
  {
    max: 0.45,
    getItem() {
      return {
        cur: 0,
        target: genFloor(0)
      }
    }
  },
  {
    max: 0.9,
    getItem() {
      return {
        cur: genFloor(0),
        target: 0
      }
    }
  },
  {
    max: 1,
    getItem() {
      const cur = genFloor(0)
      let target = genFloor(0)
      while (cur === target) {
        target = genFloor(0)
      }
      return {cur, target}
    }
  }
]

function item () {
  const v = Math.random()
  let i = 0
  let result
  while (v > ItemConf[i].max) {
    i++
  }
  result = ItemConf[i].getItem()
  return result
}

export default function genList (len = 20) {
  let t = 0
  // 500 ms 为最小单位
  return Array.apply(null, {length: len}).map((info, i) => {
    if (i > 0) {
      t += 500 * getNum(10)
    }
    return Object.assign({}, item(), {delay: t})
  })
}
