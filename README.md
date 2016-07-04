[![Build Status](https://semaphoreci.com/api/v1/jonotron/couchdb-query-defaults/branches/master/shields_badge.svg)](https://semaphoreci.com/jonotron/couchdb-query-defaults)

add default selector fields to your couchdb 2.0 find query selector

Installation
============

    npm install couchdb-query-defaults

Usage
=====

```javascript
const addDefault = require('couchdb-query-defaults')
const selector = {
  a: 1,
  b: 1
}
const defaults = {
  _id: {'$gte': null}
}
const defaultedSelector = addDefault(selector, defaults)
```

Lead Maintainer: [Jonathan Bowers](https://github.com/jonotron)

