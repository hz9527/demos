import {DemoModule} from './data'

const desc = `通过一系列学习，相信有了一些思考，比如流流程处理，流之间处理
思考1:点赞业务
1. 单点同一按钮一定时间范围内连赞 2. 不在时间范围内能toggle 3. 长按连赞 4. 连赞动画
思考2:图片大图按钮显示
点击图片确定是否显示大图，但是可以切换图片，关闭弹窗
思考3:连续请求两次数据，保证返回的一定是最新的请求
思考4:一个输入框业务
1. 输入@唤起列表，选择某个人，插入到input中 2. 从最后删除某个人，@ren删除 3. 从中间插入删除字符，@人变成字符串
4. 发送数据需要{content: String, atList: [{offset: Number, length: Number}]}`
export const think = new DemoModule('思考', desc)
const register = think.createRegister()

register('点赞', () => {

}, `点击作为最开始的源
1. 如果在时间范围内执行连赞动画
2. 如果不在时间范围内或更新id执行 toggle
3. 完成后进行请求数据`)

register('显示大图', () => {

}, `点击某个图作为源，衍生new Image作为内部 observable，一旦更新图片就放弃内部 observable 订阅`)
