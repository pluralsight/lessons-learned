/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as chai from 'chai'
import * as sinon from 'sinon'
chai.should()

class MyClass {
  public lambda1 = () => 50
  public normalFunc() {
    return 50
  }
}

describe(`ADVANCED: Arrow function expressions are hard to stub`, () => {
  it(`Link to this test: src/testingLambdas.test.ts:8)`, () => {})
  let uut : MyClass
  beforeEach(() => {
    uut = new MyClass()
  })
  // afterEach ( () =>{});
  it(`The arrow function expression as a method will work when called normally`, () => {
    uut.lambda1().should.equal(50)
  })

  it(`but when you stub it, the property for the arrow function does not yet exist so it throws`, () => {
    try {
      sinon.stub(MyClass.prototype, `lambda1`)
      true.should.be.false
    } catch (error) {
      error.message.includes(`Cannot stub non-existent own property lambda1`).should.be.true
    }
  })
  it(`like you can a normal function`, () => {
    sinon.stub(MyClass.prototype, `normalFunc`).returns(25)
    uut.normalFunc().should.equal(25)
  })
})
