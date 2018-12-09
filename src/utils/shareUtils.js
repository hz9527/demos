function getType(obj, ignoreBase = false) {
  let type = typeof obj
  if (obj && type === 'object') {
    type = obj.constructor.name.toLowerCase()
  } else {
    type = 'null'
  }
  if (ignoreBase) {
    return type === 'array' ? type : type === 'object' ? type : 'base'
  }
  return type
}

export {getType}
