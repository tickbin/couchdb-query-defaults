# Deprecation Notice 

**Deprecation notice:** This project and codebase are not maintained. We might revisit this again in the future, but for now the code is read-only :)

# Query defaults

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

