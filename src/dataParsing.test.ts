/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as chai from 'chai'
const should = chai.should()

describe.only(`Boolean parsing Using JSON.parse() should`, () => {
  it(`return true for "true" `, () => {
    JSON.parse(`true`).should.be.true
  })
  it(`return false for "false" `, () => {
    JSON.parse(`false`).should.be.false
  })

  it(`throw if given a string that it is not true or false `, () => {
    should.throw(() => JSON.parse(`notTrueOrFalse`))
  })
  it(`throw if passed an empty string `, () => {
    should.throw(() => JSON.parse(``))
  })
  it(`throw if passed spaces only`, () => {
    should.throw(() => JSON.parse(`   `))
  })
})