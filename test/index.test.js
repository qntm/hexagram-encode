/* eslint-env mocha */

import assert from 'node:assert/strict'

import { encode, decode } from '../src/index.js'

describe('hexagram-encode', () => {
  it('demo', () => {
    const buf = Buffer.from('ABCDEFGH456789+/', 'base64')

    const str = encode(buf)
    assert.equal(str, '䷁䷗䷆䷒䷎䷣䷭䷊䷋䷘䷅䷉䷠䷌䷫䷀')

    const buf2 = decode(str)
    assert.deepEqual(buf2, buf)
  })

  it('errors', () => {
    assert.throws(() => decode('a'), Error('Unrecognised hexagram: a'))
  })
})
