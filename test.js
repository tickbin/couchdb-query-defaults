var test = require('tape')
var addDefault = require('./')
var pouchfind = require('pouchdb-find')

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
