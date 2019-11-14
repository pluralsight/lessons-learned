/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as chai from 'chai'
chai.should()

describe(`ADVANCED: Array Manipulation Techniques (some use ES6)`, () => {
  it(`Link to this test:→ src/arrayTechniquesInEs6.test.ts:5 ←🐞`, () => {})
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
    const extractCols = columnsToExtract.map((e) => sourceData.map((row) => row[e]))
    extractCols.should.eql([[`a1`, `a2`, `a3`], [`c1`, `c2`, `c3`]])
  })

  it(`extract Specified Columns from sparsely populated 2D array`, () => {
    const sourceData = [[`a1`, `b1`, `c1`], [`a2`, `b2`, `c2`], [`a3`]]
    const columnsToExtract = [0, 2]
    const extractCols = columnsToExtract.map((e) => sourceData.map((row) => row[e]))
    extractCols.should.eql([[`a1`, `a2`, `a3`], [`c1`, `c2`, undefined]])
  })

  it.only(`remove empty rows while ignoring a specific column`, () => {
    const sourceData = [[``, ``, ``, `FALSE`, ``], [``, ``, ``, `FALSE`, `b`], [`c`, ``, ``, `FALSE`, ``]]
    const deepCopy = sourceData.map((inner) => inner.slice())
    deepCopy.map((e) => {
      e.splice(3, 1)
      return e
    })
    const test = sourceData.filter((_, index) => deepCopy[index].reduce((el, val) => el + val).length > 0)
    test.should.eql([[``, ``, ``, `FALSE`, `b`], [`c`, ``, ``, `FALSE`, ``]])
  })

  describe(`Treat Arrays In a Functional manner`, () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type SomeFunc = (fn: any) => any
    it(`Compose flatten and filter `, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const compose = (...args: SomeFunc[]) => (value: any) =>
        args.reduceRight((acc: SomeFunc, fn: SomeFunc) => fn(acc), value)
      const flatten = (array2D: string[][]) => array2D.reduce((flat, arr) => [...flat, ...arr])
      const referenceArray = [`A`, `B`]
      const filter = (source: string[]) => source.filter((e) => !referenceArray.includes(e))
      const testArray2D = [[`A`], [`B`], [`C`]]
      const result = compose(
        filter,
        flatten
      )(testArray2D)
      result.should.eql([`C`])
    })

    describe(`Extract Cols from 2D, Combine to 1D, and Create Unique values`, () => {
      it(`with intermediate variables`, () => {
        const colsToExtract = [0, 2]
        const srcData = [[`a1`, `b1`, `c1`], [`a2`, `b2`, `c2`], [`a3`]]
        const extractedCols = colsToExtract.map((e) => srcData.map((row) => row[e]))
        const combinedCols = extractedCols.reduce((flat, row) => [...flat, ...row])
        const undefinedRemoved = combinedCols.filter((elem) => elem != undefined)
        const uniques = [...new Set(undefinedRemoved)]
        uniques.should.eql([`a1`, `a2`, `a3`, `c1`, `c2`])
      })

      it(`without intermediate variables`, () => {
        const colsToExtract = [0, 2]
        const srcData = [[`a1`, `b1`, `c1`], [`a2`, `b2`, `c2`], [`a3`]]
        const uniques = [
          ...new Set(
            colsToExtract
              .map((e) => srcData.map((row) => row[e]))
              .reduce((flat, row) => [...flat, ...row])
              .filter((elem) => elem != undefined)
          ),
        ]
        uniques.should.eql([`a1`, `a2`, `a3`, `c1`, `c2`])
      })
    })
  })
})
