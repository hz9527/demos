import Event, {filter, map, timer, debounceTime, async} from '../index.js'

const event = new Event()

event.on(data => {
  console.log('test')
})

event.pipe(timer(10))
  .pipe(filter(d => d > 1))
  .pipe(map(v => ({value: v})))
  .on(data => {
    console.log('timer', data)
  })
event.pipe(debounceTime(3))
  .on(data => {
    console.log('debounceTime')
  })
event.pipe(async())
  .on(data => {
    console.log('async')
  })

const ev = event.on(data => {
  console.log('test index')
  ev.off()
}, -1)

event.emit(1)
event.emit(2)
setTimeout(() => {
  event.emit(3)
}, 5)
