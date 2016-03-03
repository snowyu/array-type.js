chai            = require 'chai'
sinon           = require 'sinon'
sinonChai       = require 'sinon-chai'
should          = chai.should()
expect          = chai.expect
assert          = chai.assert
chai.use(sinonChai)

setImmediate    = setImmediate || process.nextTick
isFunction      = require 'util-ex/lib/is/type/function'

module.exports = (ArrayTypeInfo, Tests)->
  ArrayType = ArrayTypeInfo()
  describe ArrayType.name, ->
    it 'should be exist Array type', ->
      expect(ArrayType).to.be.instanceOf ArrayTypeInfo
      ArrayType.pathArray().should.be.deep.equal ['type', ArrayType.name]

    describe 'range', ->
      it 'should not set the wrong range of Array', ->
        expect(ArrayType.createType.bind(ArrayType, max:'as')).to.be.throw 'the max should be an integer'
        expect(ArrayType.createType.bind(ArrayType, min:'as')).to.be.throw 'the min should be an integer'
        expect(ArrayType.createType.bind(ArrayType, min:5, max:2)).to.be.throw 'the max should be greater than min'
        result = ArrayType.clone()
        try
          result.max = 2
          result.min = 5
        catch e
          err = e
        expect(err).to.be.exist
        expect(err.message).to.be.include 'the min should be less than max'
      it 'should limit the range of ArrayType value', ->
        n = ArrayType.createType(min: 2, max:4)
        expect(n.min).to.be.equal 2
        expect(n.max).to.be.equal 4
        expect(n.validate([1,2])).to.be.true
        expect(n.validate([1,2,3])).to.be.true
        expect(n.validate([1,2,3,4])).to.be.true
        expect(n.validate.bind(n,[1])).to.be.throw 'an invalid ' + ArrayType.name
        expect(n.validate.bind(n,[1,2,3,4,5])).to.be.throw 'an invalid ' + ArrayType.name
        expect(n.isValid([])).to.be.false
        expect(n.isValid([1,2,3,4,5])).to.be.false
      it 'should limit max ArrayType value', ->
        n = ArrayType.createType(max:3)
        expect(n.validate([])).to.be.true
        expect(n.validate([1])).to.be.true
        expect(n.validate([1,2])).to.be.true
        expect(n.validate([1,2,3])).to.be.true
        expect(n.validate.bind(n,[1,2,3,4])).to.be.throw 'an invalid ' + ArrayType.name
        expect(n.isValid([])).to.be.true
        expect(n.isValid([1,2,3,4])).to.be.false
        expect(n.isValid([1,2,3,4,5])).to.be.false
      it 'should limit min ArrayType value', ->
        n = ArrayType.createType(min: 2)
        expect(n.validate([1,2])).to.be.true
        expect(n.validate([1,2,3])).to.be.true
        expect(n.validate([1,2,3,4])).to.be.true
        expect(n.validate([1,2,3,4,5])).to.be.true
        expect(n.validate.bind(n,[1])).to.be.throw 'an invalid ' + ArrayType.name
        expect(n.isValid([])).to.be.false

    describe '.validate', ->
      it 'should validate string ArrayType value', ->
        expect(ArrayType.validate('[123]')).to.be.true
        expect(ArrayType.validate('[1,2,"s"]')).to.be.true
        expect(ArrayType.validate(new Array)).to.be.true
        expect(ArrayType.validate.bind(ArrayType,"dsd")).to.be.throw 'an invalid ' + ArrayType.name

    describe '.cloneType', ->
      it 'should clone type', ->
        t = ArrayType.createType(min:1, max:3)
        result = t.cloneType()
        expect(t.isSame result).to.be.true

    Tests(ArrayTypeInfo) if isFunction Tests
