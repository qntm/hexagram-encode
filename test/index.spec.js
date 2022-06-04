/* eslint-env mocha */

import assert from 'assert'

import { encode, decode } from '../src/index.js'

describe('hexagram-encode', () => {
  it('demo', () => {
    const buf = Buffer.from('ABCDEFGH456789+/', 'base64')

    const str = encode(buf)
    assert.strictEqual(str, '䷁䷗䷆䷒䷎䷣䷭䷊䷋䷘䷅䷉䷠䷌䷫䷀')

    const buf2 = decode(str)
    assert.deepStrictEqual(buf2, buf)
  })

  it('errors', () => {
    assert.throws(() => decode('a'), Error('Unrecognised hexagram: a'))
  })
})
