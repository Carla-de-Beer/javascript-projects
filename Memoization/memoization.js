// Carla de Beer
// Created: August 2018
// Memoization example in JavaScript.
// Memoization is a useful technique for functions that are called repeatedly with the same set of inputs,
// but whose result is relatively expensive to produce.
// NOTE: Only pure functions can be memoized. Memoization does not works for impure functions, 
// because if the function does not return same value for the same input,
// the returned cached value will not be the required result. It’ll make more sense when we memoize some stuff.

// Return a memoizing version of a function f
// Based on: https://taylodl.wordpress.com/2012/06/13/functional-javascript-memoization-part-i/

function memoize(f) {
   if (f instanceof Function) {
      // only memoize functions of parity 1, otherwise return function                                 
      if (f.length == 0 || f.length > 1) return f;
 
      let fn = function(x) {
         if (fn.memoizer.values[x] == null) {
            fn.memoizer.values[x] = f.call(f,x);
         }
         return fn.memoizer.values[x];
      };
 
      fn.memoizer = { values : [] };
      return fn;
   } else {
      return f;                                             
   }
}

function fib(value) {
  if (value === 0) return 0;
  if (value === 1) return 1;
  return fib(value - 2) + fib(value - 1);
}

fn = memoize(fib);

// Performance tests

let sum = 0.0;
let average = 0.0;
let limit = 10;
let value = 40;

function getAverageRuntimeMemoized() {
  sum = 0.0;
  average = 0.0;
  for (let i = 0; i < limit; ++i) {
    var t0 = performance.now();
    console.log(fn(value));
    var t1 = performance.now();
    sum += (t1 - t0);
  }

  average = sum/limit;
  console.log(`The memoized function takes on average ${average} milliseconds.`);
}

function getAverageRuntimeNonMemoized() {
  for (let i = 0; i < limit; ++i) {
    var t0 = performance.now();
    console.log(fib(value));
    var t1 = performance.now();
    sum += (t1 - t0);
  }

  average = sum/limit;
  console.log(`The non-memoized function takes on average ${average} milliseconds.`);
}

console.log(`Calculating the average runtime over ${limit} runs ...`);
getAverageRuntimeMemoized();
getAverageRuntimeNonMemoized();