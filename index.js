/** Convert binary data to/from I Ching hexagrams such that the binary is visible */

// 64 Base64 characters in order, 65th character is padding symbol
var base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

// 64 I Ching hexagrams in order, 65th character is yin/yang symbol.
// To see these, suggested font is Segoe UI Symbol. Note that the "binary" order
// here bears no particular relation to the order of code points in Unicode.
var hexagrams = "䷁䷗䷆䷒䷎䷣䷭䷊䷏䷲䷧䷵䷽䷶䷟䷡䷇䷂䷜䷻䷦䷾䷯䷄䷬䷐䷮䷹䷞䷰䷛䷪䷖䷚䷃䷨䷳䷕䷑䷙䷢䷔䷿䷥䷷䷝䷱䷍䷓䷩䷺䷼䷴䷤䷸䷈䷋䷘䷅䷉䷠䷌䷫䷀☯";

var encode = {};
var decode = {};
base64 = base64.split("");
hexagrams = hexagrams.split("");
for(var i = 0; i <= 65; i++) {
	var base64c = base64[i];
	var hexagram = hexagrams[i];
	encode[base64c] = hexagram;
	decode[hexagram] = base64c;
}

module.exports = {

	/** Encode binary data as I Ching hexagrams */
	encode: function(buf) {
		return buf.toString("base64").split("").map(function(base64c) {
			return encode[base64c];
		}).join("");
	},

	/** Decode I Ching hexagrams to binary data */
	decode: function(str) {
		return new Buffer(str.split("").map(function(hexagram) {
			if(!(hexagram in decode)) {
				throw new Error("Unrecognised hexagram: " + hexagram);
			}
			return decode[hexagram];
		}).join(""), "base64");
	}
};
