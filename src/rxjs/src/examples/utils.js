function checkEnums(enums) { // 接受
  const data = new Set(enums.filter(item => typeof item !== 'object'))
  return (value) => data.has(value)
}
const $ = selector => {
  const el = document.querySelectorAll(selector)
  return el ? el.length === 1 ? el[0] : el : null
}
export {
  checkEnums,
  $
}
