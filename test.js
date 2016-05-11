var test = require('tape')
var addDefault = require('./')

const defaultId = { _id: {'$gte': null} }

test('does not modify selector', t => {
  const selector = {}
  addDefault(selector, defaultId)
  t.deepEquals(selector, {})
  t.end()
})

test('empty selector', t => {
  const selector = {}
  const modified = addDefault(selector, defaultId)
  const expected = { _id: {'$gte': null} } 
  
  t.deepEquals(modified, expected)
  t.end()
})
