//9.1 Write some regular expressions to match use case given
//car and cat
verify(/ca[rt]/,
    ["my car", "bad cats"],
    ["camper", "high art"]);

//pop and prop
verify(/pr?op/,
    ["pop culture", "mad props"],
    ["plop"]);

//ferret, ferry, and ferrari
verify(/ferr(et|y|ari)/,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

//any word ending in -ious
verify(/.ious\b/,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

//a whitespace character followed by a dot, comma, colon, or semicolon
verify(/\s[.,:;]/,
    ["bad punctuation ."],
    ["escape the dot"]);

//a word longer than six letters
verify(/\w{7}/,
    ["hottentottententen"],
    ["no", "hotten totten tenten"]);

//a word without the letter e
verify(/\b[^\se]+\b/,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape"]);


function verify(regexp, yes, no) {
// Ignore unfinished exercises
if (regexp.source == "...") return;
yes.forEach(function(s) {
 if (!regexp.test(s))
   console.log("Failure to match '" + s + "'");
});
no.forEach(function(s) {
 if (regexp.test(s))
   console.log("Unexpected match for '" + s + "'");
});
}

//9.2 Replace the all inline quotations from single to double, while retaining contractions as single
var text = "'fhjaklj fh askl' akljfhalk's 'asjkdfhjkl'";
console.log(text.replace(/'(?!s\s|m\s|ve\s|ll\s|d\s|re\s|t\s)/g, '"'));
console.log(text.replace(/'($|\W)|(^|\W)'/g, '$1"$2'));


//9.3 Test for valid JavaScript number formats
var number = /^(\+|\-)?((\.\d+)|(\d+\.?\d*))((E|e)(\+|\-)?\d+)?$/;

// Tests:
["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4",
 "1e+12"].forEach(function(s) {
  if (!number.test(s))
    console.log("Failed to match '" + s + "'");
});
["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5",
 "."].forEach(function(s) {
  if (number.test(s))
    console.log("Incorrectly accepted '" + s + "'");
});

//Regulex Tool