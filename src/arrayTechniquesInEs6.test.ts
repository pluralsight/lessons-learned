/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as chai from 'chai'
chai.should()

describe(`ADVANCED: Array Manipulation Techniques (some use ES6)`, () => {
  it(`Link to this test: src/arrayTechniquesInEs6.test.ts:5)`, () => {})
  it(`Flatten a 2D array into a 1D array in Node prior to 11.x`, () => {
    const array2D = [[`A`], [`B`], [`C`]]
    const flattened = array2D.reduce((flat, arr) => [...flat, ...arr])
    flattened.should.eql([`A`, `B`, `C`])
  })
  it(`in Node 11.x and up we have Array.prototype.flat and Array.prototype.flatMap`, () => {})
  it(`Append one array to end of existing array with spread operator`, () => {
    const startArray = [`a`, `b`]
    const addArray = [`c`, `d`]
    startArray.push(...addArray)
    startArray.should.eql([`a`, `b`, `c`, `d`])
  })
  it(`Appending an empty arry with the spread operator doesn't do anything (which is good)`, () => {
    const emptyArray: string[] = []
    const startArray = [`a`, `b`, `c`, `d`]
    startArray.push(...emptyArray)
    startArray.should.eql([`a`, `b`, `c`, `d`])
  })

  it(`Find any elements in source array that are not in reference array`, () => {
    const referenceArray = [`A`, `B`]
    const sourceArray = [`A`, `B`, `C`]
    const missing = sourceArray.filter((e) => !referenceArray.includes(e))
    missing.should.eql([`C`])
  })

  it(`extract Specified Columns from 2D array`, () => {
    const sourceData = [[`a1`, `b1`, `c1`], [`a2`, `b2`, `c2`], [`a3`, `b3`, `c3`]]
    const columnsToExtract = [0, 2]
    const extractCols =  columnsToExtract.map((e) => sourceData.map((row) => row[e]))
    extractCols.should.eql([[`a1`, `a2`, `a3`], [`c1`, `c2`, `c3`]])
  })

  it(`extract Specified Columns from sparsely populated 2D array`, () => {
    const sourceData = [[`a1`, `b1`, `c1`], [`a2`, `b2`, `c2`], [`a3`]]
    const columnsToExtract = [0, 2]
    const extractCols =  columnsToExtract.map((e) => sourceData.map((row) => row[e]))
    extractCols.should.eql([[`a1`, `a2`, `a3`], [`c1`, `c2`, undefined]])
  })


  type SomeFunc = (fn:any) => any
  it(`Compose flatten and filter `, () => {
    const compose = (...args:SomeFunc[]) => (value:any) => args.reduceRight((acc:SomeFunc, fn:SomeFunc) => fn(acc), value)
    const flatten =  (array2D :string[][]) => array2D.reduce((flat, arr) => [...flat, ...arr])
    const referenceArray = [`A`, `B`]
    const filter = (source :string[])  => source.filter((e) => !referenceArray.includes(e))
    const testArray2D = [[`A`], [`B`], [`C`]]
    const result = compose(filter, flatten)(testArray2D)
    result.should.eql([`C`])
  })
})
