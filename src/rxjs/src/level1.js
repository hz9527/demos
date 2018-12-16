
import {DemoModule} from './data'
const desc = `根据官网参考（REFERENCE）将整体分为 index、operators、ajax、webSocket & testing
而 type 分为 const class function interface typeAlias
index 主要是 生成 Observable、Subscription、Subject 及相关
operators 则是 pipe 内的函数
rx6 在顶级去掉了 Scheduler 的概念，个人认为，在 rx6 里本身就不需要Scheduler，或者说将其隐式分到了其他操作 Observable Subscription中
或者说Scheduler是高阶 Observable类
pipe 则是高阶 Observable 实例
未完待续...(感觉还是没理解。。。)`

const level1Demos = new DemoModule('如何学习 rx', desc)
const register = level1Demos.createRegister()
/** index
*  bindCallback bindNodeCallback combineLatest concat defer empty
*/
register('merge', () => {

})

export default level1Demos
