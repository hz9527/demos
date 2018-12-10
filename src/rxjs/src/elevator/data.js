import {MAX_FLOOR} from './config'
// 当前楼层为 0 概率增加 10%
// 去往 0 层 概率增加 10%
const Cur0 = 0.1
const Target0 = 0.1

function getNum(num) {
  return parseInt(Math.random() * num)
}
function genFloor(pro, defaultValue = 0) {
  return Math.random() > pro ? getNum(MAX_FLOOR + 1) : defaultValue
}
function item () {
  // 生成一个需求，返回当前楼层，去往楼层
  const cur = genFloor(Cur0)
  const target = genFloor(Target0)
  while (cur === target) {
    target = genFloor(Target0)
  }
  return {cur, target}
}

export default function genList (len = 20) {
  let t = 0
  // 500 ms 为最小单位
  return Array.apply(null, len).map((item, i) => {
    if (i > 0) {
      t += 500 * getNum(10)
    }
    return Object.assign({}, item(), {delay: t})
  })
}
