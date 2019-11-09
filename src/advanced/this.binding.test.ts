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

describe(`Binding of "this" can be trip you up in a class`, () => {
  let uut: BindingTest
  let funcsToRun :Func[]

  beforeEach(() => {
    uut = new BindingTest()
    funcsToRun = []
  })

  describe(`when using the standard function syntax in a class. It should`, () => {
    it(`return 50 with a straight call`, () => {
      uut.calculate50Func().should.equal(50)
    })
    describe('But, when pushing the function into an array',()=>{
      it(`it will throw`, () => {
        try {
          funcsToRun.push(uut.calculate50Func)
          true.should.be.false
        } catch (err) {
          err.message.includes(`Cannot read property of 'x'`)
        }
      })
  
      it(`unless you explicitly bind 'this' to the object created`, () => {
        funcsToRun.push(uut.calculate50Func.bind(uut))
        const [result] = funcsToRun.map((e) => e())
        result.should.equal(50)
      })
    })

  })

  describe(`Lambda syntax on the other hand should just` , () => {
    it(`return 50 if pushed to an array`, () => {
      funcsToRun.push(uut.calculate50Lambda)
      const [result] = funcsToRun.map((e) => e())
      result.should.equal(50)
    })
  })
})