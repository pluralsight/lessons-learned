/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as chai from 'chai'
chai.should()

describe('FUNDAMENTAL: Floating Point Numbers are inexact', () => {
it('Link to this test: src/floatingPoint.test.ts:5)', () => {
//actual test goes here
})
  it('Equality comparisons are likely to not be what you expect', () => {
    const result = Math.abs(0.1 + 0.2 - 0.3) === 0
    result.should.be.false
  })
  it('Relative comparisons with Number.EPSILON will work', () => {
    const result = Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON
    result.should.be.true
  })
})
