## array-type [![npm][npm-svg]][npm]

[![Build Status][travis-svg]][travis]
[![Code Climate][codeclimate-svg]][codeclimate]
[![Test Coverage][codeclimate-test-svg]][codeclimate-test]
[![downloads][npm-download-svg]][npm]
[![license][npm-license-svg]][npm]

[npm]: https://npmjs.org/package/array-type
[npm-svg]: https://img.shields.io/npm/v/array-type.svg
[npm-download-svg]: https://img.shields.io/npm/dm/array-type.svg
[npm-license-svg]: https://img.shields.io/npm/l/array-type.svg
[travis-svg]: https://img.shields.io/travis/snowyu/array-type.js/master.svg
[travis]: http://travis-ci.org/snowyu/array-type.js
[codeclimate-svg]: https://codeclimate.com/github/snowyu/array-type.js/badges/gpa.svg
[codeclimate]: https://codeclimate.com/github/snowyu/array-type.js
[codeclimate-test-svg]: https://codeclimate.com/github/snowyu/array-type.js/badges/coverage.svg
[codeclimate-test]: https://codeclimate.com/github/snowyu/array-type.js/coverage


The array type. See the [type-info](https://github.com/snowyu/type-info.js) for type info collections.

## Usage

```js
//register the array type to the TypeInfo..
import 'array-type'
import {Type} from 'abstract-type'
//get the array type info:
const ArrayType = Type.get('array')
/*
//Just load array type only:
import {ArrayType} from 'array-type'
*/

var LimitedArrayType = new ArrayType({min:1, max:3})

var arr = new ArrayType([1,2,3])

for (const item of arr) {
  console.log(item)
}

console.log(arr)
//<type "array": "value":[1,2,3]>
console.log(arr.isValid())
//=true
console.log(arr.toJson()))
//='[1,2,3]'
console.log(arr.toJson({withType:true})))
//='{"value":[1,2,3],"name":"array"}'
console.log(LimitedArrayType.isValid([]))
//=false
console.log(LimitedArrayType.isValid([1]))
//=true
var n = arr.clone();
n.assign('aaa')
//=TypeError: "aaa" is an invalid array
```

## API

* The ArrayType Class
  * options:
    * `min`: the minimum length of the array. null or undefined means unlimited.
    * `max`: the maximum length of the array.
    * `of`:  option to limit the element's type. the array's element type
      * eg, `ArrayType of: 'String'`

See [abstract-type](https://github.com/snowyu/abstract-type.js)

## License

MIT
