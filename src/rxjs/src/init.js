export const CONF = {
  con: 'item-box',
  itemCon: 'item',
  itemDesc: 'item-desc',
  itemTitle: 'title',
  btn: 'btn'
}
export default function init(el, data) { // el, ...{title, demos}
  const div = document.createElement('div')
  div.className = CONF.con
  div.innerHTML = data.map(item => {
    return `<div class="${CONF.itemCon}">
      <div class="${CONF.itemTitle}">${item.title}</div>
      ${item.desc ? `<div class="${CONF.itemDesc}">描述：${item.desc.replace(/\n/g, '</br>')}</div>` : ''}
      ${item.demos.map(demo => `<div class="${CONF.btn} ${demo.key}">${demo.title}</div>`).join('')}
    </div>`
  }).join('')
  el.appendChild(div)
}
