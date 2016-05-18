"use strict"

const flatten = require('lodash.flatten')

module.exports = addDefault

function addDefault(selector, defaults) {
  const modified = Object.assign({}, selector)

  let present = false
  const keys = getFields(selector)
  const defs = getFields(defaults)
  for (let def of defs) {
    let isDefaultInSelector = keys.indexOf(def) >= 0

    if (!isDefaultInSelector) {
      const d = {}
      d[def] = defaults[def]
      Object.assign(modified, d) 
    }
  }

  return modified
}

function getFields (selector, accum) {
  accum = accum ? accum.slice(0) : []; // clone the array
  for (let key in selector) {
    switch (key) {
      case '$or':
        // don't do anything. $or fields are not considered for default
        break
      case '$and':
        accum = accum.concat(flatten(selector[key].map(branch => {
          return getFields(branch, accum)
        })))
        break
      default:
        accum.push(key)
        break
    } // switch (key)
  }

  return accum
}
