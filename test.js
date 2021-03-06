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

test('selecting another field', t => {
  const selector = { field: 1 }
  const modified = addDefault(selector, defaultId)
  const expected = { field: 1, _id: {'$gte': null }}

  t.deepEquals(modified, expected)
  t.end()
})

test('selecting default field does not add default', t => {
  const selector = { _id: 1 }
  const modified = addDefault(selector, defaultId)
  const expected = { _id: 1 }

  t.deepEquals(modified, expected)
  t.end()
})

test('selecting default and another field does not add default', t => {
  const selector = { '$and': [
    {_id: 1},
    {field: 1} 
  ]}
  const modified = addDefault(selector, defaultId)

  t.deepEquals(modified, selector)
  t.end()
})

test('only non-selected defaults are added', t => {
  const selector = { '$and': [
    {a: 1},
    {b: 2} 
  ]}
  const defaults = {
    _id: {'$gte': null},
    a: {'$eq': 2}
  }
  const expected = { 
    _id: {'$gte': null},
    '$and': [
      {a: 1},
      {b: 2} 
    ]
  }
  const modified = addDefault(selector, defaults)

  t.deepEquals(modified, expected)
  t.end()
})

test('fields included in $or are not considered default', t => {
  const selector = { '$or': [
    {_id: 1},
    {b: 2}
  ]}
  const expected = {
    _id: {'$gte': null},
    '$or': [
      {_id: 1},
      {b:2}
    ]
  }
  const modified = addDefault(selector, defaultId)

  t.deepEquals(modified, expected)
  t.end()
})
