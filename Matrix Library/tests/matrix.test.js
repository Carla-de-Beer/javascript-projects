// Jest unit testing for the matrix.js file's functionalities.
// Created: February 2018.

// A. Test scalar addition functionality
// B. Test matrix addition functionality
// C. Test matrix subtraction functionality
// D. Test scalar multiplication functionality
// E. Test matrix multiplication functionality
// F. Test matrix transpose functionality
// G. Test matrix map functionality
// H. Test matrix toArray functionality
// I. Test matrix fromArray functionality

const Matrix = require("../matrix");

// A. Test scalar summation functionality --------------------------------------
let scalar1 = 0;
test(`1. Matrix-scalar addition test (${scalar1})`, () => {
  let a = new Matrix(3, 3);
	a.data[0] = [1, 2, 3];
	a.data[1] = [4, 5, 6];
	a.data[2] = [7, 8, 9];
  a.add(scalar1);

  expect(a).toEqual({
    rows: 3,
    cols: 3,
    data: [[1, 2, 3],
           [4, 5, 6],
           [7, 8, 9]]
  });
});

let scalar2 = 1;
test(`2. Matrix-scalar addition test (${scalar2})`, () => {
  let a = new Matrix(3, 3);
	a.data[0] = [1, 2, 3];
	a.data[1] = [4, 5, 6];
	a.data[2] = [7, 8, 9];
  a.add(scalar2);

  expect(a).toEqual({
    rows: 3,
    cols: 3,
    data: [[2, 3, 4],
           [5, 6, 7],
           [8, 9, 10]]
  });
});

let scalar3 = 3.75;
test(`3. Matrix-scalar addition test (${scalar3})`, () => {
  let a = new Matrix(3, 3);
  a.data[0] = [1, -2.5, 3];
	a.data[1] = [4, 5, 6];
	a.data[2] = [7, 8, 9];
  a.add(scalar3);

  expect(a).toEqual({
    rows: 3,
    cols: 3,
    data: [[4.75, 1.25, 6.75],
           [7.75, 8.75, 9.75],
           [10.75, 11.75, 12.75]]
  });
});

let scalar4 = 7;
test(`4. Matrix-scalar addition test (${scalar4}); negation test`, () => {
  let a = new Matrix(2, 2);
	a.data[0] = [1, 1];
	a.data[1] = [1, 1];
	a.add(scalar4);

  expect(a).not.toEqual({
    rows: 2,
    cols: 2,
    data: [[1, 1],
           [1, 1]]
  });
});

// B. Test matrix addition functionality --------------------------------------
test("5. Matrix-matrix addition test (matrix addition by zero matrix)", () => {
  let a = new Matrix(3, 3);
	a.data[0] = [4, -1, 2];
	a.data[1] = [3, 5, 7];
	a.data[2] = [2, 5, -2.5];

  let b = new Matrix(3, 3);
  b.data[0] = [0, 0, 0];
  b.data[1] = [0, 0, 0];
  b.data[2] = [0, 0, 0];

	let expected = new Matrix(3, 3);
  expected.data[0] = [4, -1, 2];
	expected.data[1] = [3, 5, 7];
	expected.data[2] = [2, 5, -2.5];

  a.add(b);

  expect(a).toEqual(expected);
});

test("6. Matrix-matrix addition test (matrix addition by indentity matrix)", () => {
  let a = new Matrix(3, 3);
	a.data[0] = [4, -1, 2];
	a.data[1] = [3, 5, 7];
	a.data[2] = [2, 5, -2.5];

  let b = new Matrix(3, 3);
  b.data[0] = [1, 1, 1];
  b.data[1] = [1, 1, 1];
  b.data[2] = [1, 1, 1];

	let expected = new Matrix(3, 3);
	expected.data[0] = [5, 0, 3];
	expected.data[1] = [4, 6, 8];
	expected.data[2] = [3, 6, -1.5];

  a.add(b);

  expect(a).toEqual(expected);
});

test("7. Matrix-matrix addition test ((n x m matrix) + (n x m matrix))", () => {
  let a = new Matrix(2, 3);
  a.randomize();
  let b = new Matrix(2, 3);
  b.randomize();

  let result = a.add(b);

  expect(result).toEqual(undefined);
});

test("8. Matrix-matrix addition test ((n x m matrix) + (m x n matrix))", () => {
  let a = new Matrix(2, 3);
	a.data[0] = [5, 0, 0];
	a.data[1] = [5, 2, 8];

	let b = new Matrix(3, 2);
	b.data[0] = [6, 2];
	b.data[1] = [8, 7];
	b.data[2] = [8, 2];

	let expected = new Matrix(a.rows, b.cols);
	expected.data[0] = [30, 10];
	expected.data[1] = [110, 40];

  expect(Matrix.multiply(a, b)).toEqual(expected);
});

// C. Test matrix subtraction functionality -----------------------------------------
test("9. Matrix-matrix subtraction test (matrix subtraction by zero matrix)", () => {
  let a = new Matrix(3, 3);
	a.randomize();

	let b = new Matrix(3, 3);
	b.data[0] = [0, 0, 0];
	b.data[1] = [0, 0, 0];
	b.data[2] = [0, 0, 0];

  expect(Matrix.subtract(a, b)).toEqual(a);
});

test("10. Matrix-matrix subtraction test (matrix subtraction by indentity matrix)", () => {
  let a = new Matrix(3, 3);
	a.data[0] = [4, -1, 2];
	a.data[1] = [3, 5, 7];
	a.data[2] = [2, 5, -2.5];

	let b = new Matrix(3, 3);
	b.data[0] = [1, 1, 1];
	b.data[1] = [1, 1, 1];
	b.data[2] = [1, 1, 1];

	let expected = new Matrix(3, 3);
	expected.data[0] = [3, -2, 1];
	expected.data[1] = [2, 4, 6];
	expected.data[2] = [1, 4, -3.5];

	let result = Matrix.subtract(a, b);

  expect(Matrix.subtract(a, b)).toEqual(expected);
});

test("11. Matrix-matrix subtraction test ((n x m matrix) - (m x n matrix))", () => {
  let a = new Matrix(2, 3);
	a.randomize();
	let b = new Matrix(3, 2);
	b.randomize();

  expect(Matrix.subtract(a, b)).toEqual(undefined);
});

test("12. Matrix-matrix subtraction test ((n x m matrix) - (n x m matrix))", () => {
  let a = new Matrix(2, 3);
	a.data[0] = [5, 0, 0];
	a.data[1] = [5, 2, 8];

	let b = new Matrix(2, 3);
	b.data[0] = [6, 2, 8];
	b.data[1] = [8, 7, 2];

	let expected = new Matrix(a.rows, b.cols);
	expected.data[0] = [-1, -2, -8];
	expected.data[1] = [-3, -5, 6];

  expect(Matrix.subtract(a, b)).toEqual(expected);
});

// D. Test scalar multiplication functionality --------------------------------------
let scalar5 = 0;
test(`13. Matrix-scalar multiplication test (${scalar5})`, () => {
  let a = new Matrix(7, 3);
	a.randomize();
	a.multiply(scalar5);
	let expected = new Matrix(7, 3);

  expect(a).toEqual(expected);
});

let scalar6 = 2;
test(`14. Matrix-scalar multiplication test (${scalar6})`, () => {
  let a = new Matrix(5, 5);
	a.data[0] = [1, 1, 1, 1, 1];
	a.data[1] = [1, 1, 1, 1, 1];
	a.data[2] = [1, 1, 1, 1, 1];
	a.data[3] = [1, 1, 1, 1, 1];
	a.data[4] = [1, 1, 1, 1, 1];
	a.multiply(scalar6);

	let expected = new Matrix(5, 5);
	expected.data[0] = [2, 2, 2, 2, 2];
	expected.data[1] = [2, 2, 2, 2, 2];
	expected.data[2] = [2, 2, 2, 2, 2];
	expected.data[3] = [2, 2, 2, 2, 2];
	expected.data[4] = [2, 2, 2, 2, 2];

  expect(a).toEqual(expected);
});

let scalar7 = 3.5;
test(`15. Matrix-scalar multiplication test (${scalar7})`, () => {
  let a = new Matrix(2, 2);
	a.data[0] = [2, 4];
	a.data[1] = [-1, 3];
	a.multiply(scalar7);

	let expected = new Matrix(2, 2);
	expected.data[0] = [7, 14];
	expected.data[1] = [-3.5, 10.5];

  expect(a).toEqual(expected);
});

let scalar8 = 7;
test(`16. Matrix-scalar multiplication test (${scalar8}); negation test`, () => {
  let a = new Matrix(2, 2);
	a.data[0] = [1, 1];
	a.data[1] = [1, 1];
	a.multiply(scalar8);

	let expected = new Matrix(2, 2);
	expected.data[0] = [1, 1];
	expected.data[1] = [1, 1];

  expect(a).not.toEqual(expected);
});

// E. Test matrix multiplication functionality --------------------------------------
test("17. Matrix-matrix multiplication test (matrix multiplication by zero matrix)", () => {
  let a = new Matrix(3, 3);
	a.randomize();

	let b = new Matrix(3, 3);
	b.data[0] = [0, 0, 0];
	b.data[1] = [0, 0, 0];
	b.data[2] = [0, 0, 0];

  expect(Matrix.multiply(a, b)).toEqual(b);
});

test("18. Matrix-matrix multiplication test (matrix multiplication by indentity matrix)", () => {
  let a = new Matrix(3, 3);
	a.randomize();
  let expected = a;

	let b = new Matrix(3, 3);
	b.data[0] = [1, 1, 1];
	b.data[1] = [1, 1, 1];
	b.data[2] = [1, 1, 1];

	a.multiply(b);

  expect(a).toEqual(expected);
});

test("19. Matrix-matrix multiplication test ((n x m matrix) x (n x m matrix))", () => {
  let a = new Matrix(2, 3);
	a.randomize();
	let b = new Matrix(2, 3);
	b.randomize();

  expect(a.multiply(b)).toEqual(undefined);
});

test("20. Matrix-matrix multiplication test ((n x m matrix) x (m x n matrix))", () => {
  let a = new Matrix(2, 3);
	a.data[0] = [5, 0, 0];
	a.data[1] = [5, 2, 8];

	let b = new Matrix(3, 2);
	b.data[0] = [6, 2];
	b.data[1] = [8, 7];
	b.data[2] = [8, 2];

	let expected = new Matrix(a.rows, b.cols);
	expected.data[0] = [30, 10];
	expected.data[1] = [110, 40];

  expect(Matrix.multiply(a, b)).toEqual(expected);
});

// F. Test matrix transpose functionality --------------------------------------
test("21. Matrix transposition test", () => {
  let a = new Matrix(2, 3);
	a.data[0] = [1, 3, 5];
	a.data[1] = [4, -2, 7.5];

	let expected = new Matrix(3, 2);
	expected.data[0] = [1, 4];
	expected.data[1] = [3, -2];
	expected.data[2] = [5, 7.5];

  expect(Matrix.transpose(a)).toEqual(expected);
});

// G. Test matrix map functionality --------------------------------------------
test("22. Matrix map test (sigmoid function)", () => {
  function sigmoid(x) {
		return 1 / (1 + Math.exp(-x));
	}

	let a = new Matrix(2, 2);
	a.data[0] = [1, 4];
	a.data[1] = [3, -2];

	a.map(sigmoid);

	let expected = new Matrix(2, 2);
	expected.data[0] = [0.7310585786300049, 0.9820137900379085];
	expected.data[1] = [0.9525741268224334, 0.11920292202211755];

  expect(a).toEqual(expected);
});

// H. Test matrix toArray functionality  ---------------------------------------
test("23. Matrix toArray test", () => {
  let a = new Matrix(2, 3);
	a.data[0] = [1, 3, 5];
	a.data[1] = [4, -2, 7.5];
	let expected = [1, 3, 5, 4, -2, 7.5];
  expect(a.toArray()).toEqual(expected);
});

// I. Test matrix fromArray functionality  -------------------------------------
test("24. Matrix fromArray test", () => {
  let array = [1, 3, 5, 4, -2, 7.5];

	let expected = new Matrix(6, 1);
	expected.data[0] = [1];
	expected.data[1] = [3];
	expected.data[2] = [5];
	expected.data[3] = [4];
	expected.data[4] = [-2];
	expected.data[5] = [7.5];

  expect(Matrix.fromArray(array)).toEqual(expected);
});
