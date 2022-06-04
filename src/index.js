/** Convert binary data to/from I Ching hexagrams such that the binary is visible */

// 64 Base64 characters in order, 65th character is padding symbol
const bs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

// 64 I Ching hexagrams in order, 65th character is yin/yang symbol.
// To see these, suggested font is Segoe UI Symbol. Note that the "binary' order
// here bears no particular relation to the order of code points in Unicode.
const hexagrams = '䷁䷗䷆䷒䷎䷣䷭䷊䷏䷲䷧䷵䷽䷶䷟䷡䷇䷂䷜䷻䷦䷾䷯䷄䷬䷐䷮䷹䷞䷰䷛䷪䷖䷚䷃䷨䷳䷕䷑䷙䷢䷔䷿䷥䷷䷝䷱䷍䷓䷩䷺䷼䷴䷤䷸䷈䷋䷘䷅䷉䷠䷌䷫䷀☯'

// Build lookup tables
const e = {}
const d = {}
for (let i = 0; i <= 65; i++) {
  const b = bs[i]
  const hexagram = hexagrams[i]
  e[b] = hexagram
  d[hexagram] = b
}

/** Encode binary data as I Ching hexagrams */
export const encode = buf =>
  buf.toString('base64').split('').map(b => e[b]).join('')

/** Decode I Ching hexagrams to binary data */
export const decode = str =>
  Buffer.from(str.split('').map(hexagram => {
    if (!(hexagram in d)) {
      throw new Error('Unrecognised hexagram: ' + hexagram)
    }
    return d[hexagram]
  }).join(''), 'base64')
