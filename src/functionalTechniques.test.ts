/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as chai from 'chai'
chai.should()

type SomeFunc = (fn: any) => any
const compose = (...args: SomeFunc[]) => (value: any) =>
  args.reduceRight((acc: SomeFunc, fn: SomeFunc) => fn(acc), value)
const pipe = (...args: SomeFunc[]) => (value: any) => args.reduce((acc: SomeFunc, fn: SomeFunc) => fn(acc), value)
const add5 = (x: number): number => x + 5
const multiplyBy3 = (x: number): number => x * 3

describe(`ADVANCED: We can Compose (right to left) and Pipe (left to right) functions together`, () => {
  it(`Link to this test: src/functionalTechniques.test.ts:5 ←🐞`, () => { })

  it(`compose() will execute the functions in right to left order`, () => {
    const result = compose(
      add5,
      multiplyBy3
    )(10)
    result.should.equal(35)
  })

  it(`pipe() will execute the functions in left to right order`, () => {
    const result = pipe(add5, multiplyBy3)(10)
    result.should.equal(45)
  })
})
