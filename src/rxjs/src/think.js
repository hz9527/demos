import {DemoModule} from './data'

const desc = `通过一系列学习，相信有了一些思考，比如流流程处理，流之间处理
思考1:点赞业务
思考2:图片大图按钮显示
思考3:连续请求两次数据，保证返回的一定是最新的请求`
export const think = new DemoModule('思考', '')
const register = think.createRegister()

register('点赞', () => {})
