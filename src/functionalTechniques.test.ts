/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as chai from 'chai'
chai.should()

type Func = (fn: any) => any
const compose = (...args: Func[]) => (value: any) => args.reduceRight((acc: Func, fn: Func) => fn(acc), value)
const pipe = (...args: Func[]) => (value: any) => args.reduce((acc: Func, fn: Func) => fn(acc), value)
const add5 = (x: number): number => x + 5
const multiplyBy3 = (x: number): number => x * 3

describe(`ADVANCED: We can Compose (right to left) and Pipe (left to right) functions together`, () => {
  it(`Link to this test: src/functionalTechniques.test.ts:5 ←🐞`, () => {})

  it(`compose() will execute the functions in right to left order`, () => {
    const result = compose(add5, multiplyBy3)(10)
    result.should.equal(35)
  })

  it(`pipe() will execute the functions in left to right order`, () => {
    const result = pipe(add5, multiplyBy3)(10)
    result.should.equal(45)
  })
})

interface MyObj {
  name: string
}

class TestAsyncFunc {
  private row0: string[]
  private restOfRows: string[][]
  private testData: string[][] = [
    [`a`, `b`],
    [`c`, `d`],
    [`e`, `f`, `g`],
  ]

  public destructTest(): void {
    // NOTE: Since I code with ; starting with an array needs a semicolon to prevent JS's auto semicolon insertion problems
    ;[this.row0, ...this.restOfRows] = this.testData
    console.log(this.row0, this.restOfRows)
  }

  public async stepByStep(): Promise<MyObj[]> {
    const small = this.testData.filter(this.lengthLessThan3.bind(this))
    const promises = small.map<MyObj>(this.process.bind(this))
    const newMap = await Promise.all(promises)
    return newMap
  }

  public async fluent(): Promise<MyObj[]> {
    // prettier-ignore
    return await Promise.all(this.testData
      .filter(this.lengthLessThan3.bind(this))
      .map<MyObj>(this.process.bind(this)))
  }

  private async process([item0]: string[]): Promise<MyObj> {
    return {name: item0}
  }

  private lengthLessThan3(row: string[]): boolean {
    return row.length < 3
  }
}
describe.only(`filter->map sequential when using async should`, () => {
  const expected = [
    {
      name: `a`,
    },
    {
      name: `c`,
    },
  ]

  it(`process correctly with fluent notation`, async () => {
    const uut = new TestAsyncFunc()
    const result = await uut.fluent()
    result.should.eql(expected)
  })
  it(`process correctly with step by step calls`, async () => {
    const uut = new TestAsyncFunc()
    const result = await uut.stepByStep()
    result.should.eql(expected)
  })
})
