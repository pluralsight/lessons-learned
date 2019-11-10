/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as chai from 'chai'
chai.should()

type Func = ()=>number
class BindingTest {
  private x = 10

  public  calculate50Func(): number {
    return this.x * 5
  }
  public calculate50Lambda=() :number => this.x * 5
}

describe(`ADVANCED: Binding of "this" can be trip you up in a class`, () => {
  it(`Link to this test: src/thisBinding.test.ts:15)`, () => {})
  let uut: BindingTest
  let funcsToRun :Func[]

  beforeEach(() => {
    uut = new BindingTest()
    funcsToRun = []
  })

  describe(`When using the standard function syntax in a class. It should`, () => {
    it(`return 50 with a straight call`, () => {
      uut.calculate50Func().should.equal(50)
    })
    describe(`but when pushing the function into an array and executing,`, () => {
      it(`it will throw`, () => {
        try {
          funcsToRun.push(uut.calculate50Func)
          funcsToRun.map((e) => e())
          true.should.be.false
        } catch (err) {
          err.message.includes(`Cannot read property 'x' of undefined`).should.be.true
        }
      })

      it(`unless you explicitly bind 'this' to the object created`, () => {
        funcsToRun.push(uut.calculate50Func.bind(uut))
        const [result] = funcsToRun.map((e) => e())
        result.should.equal(50)
      })
    })
  })

  describe(`Lambda syntax on the other hand should just`, () => {
    it(`return 50 if pushed to an array and executed`, () => {
      funcsToRun.push(uut.calculate50Lambda)
      const [result] = funcsToRun.map((e) => e())
      result.should.equal(50)
    })
  })
})