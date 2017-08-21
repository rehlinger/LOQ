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
verify(/\s[^e]\s/,
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