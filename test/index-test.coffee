chai            = require 'chai'
sinon           = require 'sinon'
sinonChai       = require 'sinon-chai'
should          = chai.should()
expect          = chai.expect
assert          = chai.assert
chai.use(sinonChai)

setImmediate    = setImmediate || process.nextTick

ArrayType        = require '../src'
ArrayTest        = require './array'

ArrayTest ArrayType, ->
  it 'should have aliases', ->
    expect(ArrayType('array')).to.be.instanceOf ArrayType
