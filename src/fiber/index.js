const app = document.getElementById('app')
let height = 100

const queue = []
const change = function () {
  const handler = window.requestIdleCallback((timeRemaining) => {
    console.log(timeRemaining.didTimeout)
    height += 10
    app.style.height = `${height}px`
  })
}
function a() {
  let i = 0
  while (i < 1000000) {
    i++
  }
}
queue.push(a)
let i = 0
while (queue.length) {
  i++
  queue.shift()()
  i < 100 && queue.push(i % 2 === 0 ? a : change)
}
