"use strict"

module.exports = addDefault

function addDefault(selector, defs) {
  const modified = Object.assign({}, selector)

  let present = false
  for (let key in modified) {
    if (!present) 
      present = Object.keys(defs).indexOf(key) >= 0
  }

  if (!present) {
    Object.assign(modified, defs) 
  }

  return modified
}
