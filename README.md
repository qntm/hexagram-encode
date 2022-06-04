# hexagram-encode

Convert binary data to a string of [*I Ching* hexagrams](https://en.wikipedia.org/wiki/Hexagram_%28I_Ching%29) and back. Bits in the original data are represented visually as broken or unbroken lines in the resulting hexagram. For example, the binary sequence 0b00000000, 0b01010101, 0b11111111 becomes "䷁䷣䷄䷀".

This is essentially Base64 encoding, replacing alphanumeric characters with different code points which make the original bits visible. Each hexagram represents a single Base64 character (i.e. a binary number from 0 to 63 inclusive), with the most significant bit at the top. With analogy to electronic circuits, a broken line represents 0 and an unbroken line represents 1.

> ䷁䷗䷆䷒䷎䷣䷭䷊<br/>
> ䷏䷲䷧䷵䷽䷶䷟䷡<br/>
> ䷇䷂䷜䷻䷦䷾䷯䷄<br/>
> ䷬䷐䷮䷹䷞䷰䷛䷪<br/>
> ䷖䷚䷃䷨䷳䷕䷑䷙<br/>
> ䷢䷔䷿䷥䷷䷝䷱䷍<br/>
> ䷓䷩䷺䷼䷴䷤䷸䷈<br/>
> ䷋䷘䷅䷉䷠䷌䷫䷀<br/>

Base64 uses a 65th character for padding; here, we use U+262F YIN YANG, "☯". As with Base64, the presence of "☯" at the end of a hexagram-encoded string means "ignore the lowermost two broken lines in the final hexagram", and the presence of "☯☯" at the end means "ignore the lowermost four broken lines".

Clearly, this has negligible practical use. The resulting string is significantly larger than the original Base64 in UTF-8 (although the same size in UTF-16 or UTF-32), it does not render in most fonts, and the original 8-bit bytes are just as obfuscated by the 6-bit dicing as they are in Base64.

Apologies to those who use these code points for their intended purpose.

## Installation

```bash
npm install hexagram-encode
```

## Usage

```js
import { encode, decode } from 'hexagram-encode'

const buf = Buffer.from('ABCDEFGH456789+/', 'base64')

const str = encode(buf)
console.log(str) // "䷁䷗䷆䷒䷎䷣䷭䷊䷋䷘䷅䷉䷠䷌䷫䷀"

const buf2 = decode(str)
console.log(buf.equals(buf2)) // true
```

## Notes

*I Ching* hexagrams appear in Unicode at code points [U+4DC0 to U+4DFF inclusive](http://unicode.org/charts/PDF/U4DC0.pdf).

Wikipedia presents [this image](https://commons.wikimedia.org/wiki/File:I_Ching_hexagrams_00-77.svg) which suggests the yin/yang symbol as "Hexagram 0", but gives no obvious rationale for this. Still, in the absence of a better idea it seemed a reasonable choice of padding character.

Relatively few fonts render *I Ching* hexagrams; I tend to use Segoe UI Symbol.

I have discovered at least one font which renders *I Ching* hexagrams incorrectly: Code2000. Compare the renderings of [U+4DF4 HEXAGRAM FOR DEVELOPMENT](https://en.wikipedia.org/wiki/List_of_hexagrams_of_the_I_Ching#Hexagram_53) and [U+4DF5 HEXAGRAM FOR THE MARRYING MAIDEN](https://en.wikipedia.org/wiki/List_of_hexagrams_of_the_I_Ching#Hexagram_54) in the [Unicode chart](http://unicode.org/charts/PDF/U4DC0.pdf) (correct) and in the [Code2000 chart](http://i.fonts2u.com/co/mp101_code2000_1.png) (incorrect). They have been swapped; or, equivalently, flipped upside-down. Unfortunately it seems that [Code2000](https://en.wikipedia.org/wiki/Code2000) is no longer under active development, so it is unlikely that this will ever be corrected. This hurts the already-negligible practicality of this encoding.
