//11.1 Add support to handle arrays and array functions to EGG

let topEnv = Object.create(null);
let specialForms = Object.create(null);

function parseExpression(program) {
  program = skipSpace(program);
  var match, expr;
  if (match = /^"([^"]*)"/.exec(program))
    expr = {type: "value", value: match[1]};
  else if (match = /^\d+\b/.exec(program))
    expr = {type: "value", value: Number(match[0])};
  else if (match = /^[^\s(),"]+/.exec(program))
    expr = {type: "word", name: match[0]};
  else
    throw new SyntaxError("Unexpected syntax: " + program);

  return parseApply(expr, program.slice(match[0].length));
}

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(")
    return {expr: expr, rest: program};

  program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    var arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",")
      program = skipSpace(program.slice(1));
    else if (program[0] != ")")
      throw new SyntaxError("Expected ',' or ')'");
  }
  return parseApply(expr, program.slice(1));
}
/*
function skipSpace(string) {
  var first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}
*/
function evaluate(expr, env) {
  switch(expr.type) {
    case "value":
      return expr.value;

    case "word":
      if (expr.name in env)
        return env[expr.name];
      else
        throw new ReferenceError("Undefined variable: " +
                                 expr.name);
    case "apply":
      if (expr.operator.type == "word" &&
          expr.operator.name in specialForms)
        return specialForms[expr.operator.name](expr.args,
                                                env);
      var op = evaluate(expr.operator, env);
      if (typeof op != "function")
        throw new TypeError("Applying a non-function.");
      return op.apply(null, expr.args.map(function(arg) {
        return evaluate(arg, env);
      }));
  }
}

function parse(program) {
  var result = parseExpression(program);
  if (skipSpace(result.rest).length > 0)
    throw new SyntaxError("Unexpected text after program");
  return result.expr;
}

specialForms["define"] = function(args, env) {
  if (args.length != 2 || args[0].type != "word")
    throw new SyntaxError("Bad use of define");
  var value = evaluate(args[1], env);
  env[args[0].name] = value;
  return value;
};

specialForms["do"] = function(args, env) {
  var value = false;
  args.forEach(function(arg) {
    value = evaluate(arg, env);
  });
  return value;
};

function run() {
  var env = Object.create(topEnv);
  var program = Array.prototype.slice
    .call(arguments, 0).join("\n");
  return evaluate(parse(program), env);
}

topEnv["print"] = function(value) {
  console.log(value);
  return value;
};

topEnv["true"] = true;
topEnv["false"] = false;

specialForms["while"] = function(args, env) {
  if (args.length != 2)
    throw new SyntaxError("Bad number of args to while");

  while (evaluate(args[0], env) !== false)
    evaluate(args[1], env);

  return false;
};

specialForms["fun"] = function(args, env) {
  if (!args.length)
    throw new SyntaxError("Functions need a body");
  function name(expr) {
    if (expr.type != "word")
      throw new SyntaxError("Arg names must be words");
    return expr.name;
  }
  var argNames = args.slice(0, args.length - 1).map(name);
  var body = args[args.length - 1];
  return function() {
    if (arguments.length != argNames.length)
      throw new TypeError("Wrong number of arguments");
    var localEnv = Object.create(env);
    for (var i = 0; i < arguments.length; i++)
      localEnv[argNames[i]] = arguments[i];
    return evaluate(body, localEnv);
  };
};

["+", "-", "*", "/", "==", "<", ">"].forEach(function(op) {
  topEnv[op] = new Function("a, b", "return a " + op + " b;");
});

topEnv["array"] = function(...args) {
  return args;
};

topEnv["length"] = function(arr) {
  return arr.length;
};

topEnv["element"] = function(arr, num) {
  return arr[num];  
};

//console.log(parse("array(1, 2, 3)")); 
//console.log(run("do(print(array(1, 2, 3)))")); 

//run("do(define(plusOne, fun(a, +(a, 1))),",
//"   print(plusOne(10)))");/*?*/

// run("do(define(sum, fun(array,",
//     "     do(define(i, 0),", 
//     "        define(sum, 0),",
//     "        while(<(i, length(array)),",
//     "          do(define(sum, +(sum, element(array, i))),",
//     "             define(i, +(i, 1)))),",
//     "        sum))),",
//     "   print(sum(array(1, 2, 3))))");/*?*/

//10.2 Explain what allow the function fun to close over the sourrounding environment 

// run("do(define(f, fun(a, fun(b, +(a, b)))),",
// "   print(f(4)(5)))"); /*?*/

//The function when it proceeds to create a new environment does so by having prototypal inheritance
//from the previous environment were the variable a is initially created.

//10.3 Modify the skipSpace function to skip lines containing #

function skipSpace(string) {
var first = string.search(/\S/);
  if (first == -1) return "";
  let output = string.slice(first);
  let outputNoComments = output.replace(/#.*\n/,"");
  return outputNoComments;
};

//console.log(parse("# hello\nx"));
//console.log(parse("a # one\n   # two\n()"));

//10.4 Add an option of reassigning a variable using a new set method instead of define

//Attempt 1, only looks back one level and is not correctly implemented
// specialForms["set"] = function(args, env) {
//   if (env[args[0].name] === undefined) 
//     throw ReferenceError("Variable not defined in closure!");
//   if (args.length != 2 || args[0].type != "word")
//     throw new SyntaxError("Bad use of set");
//   var value = evaluate(args[1], env);
//   Object.getPrototypeOf(env)[args[0].name] = env[args[1].name];
//   return value;
// };

specialForms["set"] = function(args, env) {
  if (env[args[0].name] === undefined) 
    throw ReferenceError("Variable not defined in closure! ("+args[0].name+")");
  if (args.length != 2 || args[0].type != "word")
    throw new SyntaxError("Bad use of set");
  var value = evaluate(args[1], env);
  //corrected check that will search prototype 
  for (var scope = env; scope; scope = Object.getPrototypeOf(scope)) {
    if (Object.prototype.hasOwnProperty.call(scope, args[0].name)) {
      scope[args[0].name] = value;
      return value;
    }
  }
};

run("do(define(x, 4),",
"   define(setx, fun(val, set(x, val))),",
"   setx(50),",
"   print(x))");/*?*/

run("do(define(has,8),set(has, 3))");
run("do(print(set(haz, 3)))"); //Ref Error! 


