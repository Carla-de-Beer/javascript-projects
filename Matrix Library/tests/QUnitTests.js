// QUnit unit testing for the matrix.js file's functionalities.
// Created: January 2018.

// A. Test scalar addition functionality
// B. Test matrix addition functionality
// C. Test matrix subtraction functionality
// D. Test scalar multiplication functionality
// E. Test matrix multiplication functionality
// F. Test matrix transpose functionality
// G. Test matrix map functionality
// H. Test matrix toArray functionality
// I. Test matrix fromArray functionality

// A. Test scalar summation functionality --------------------------------------
QUnit.module("1. matrix.js - scalar addition");

let scalar1 = 0;
QUnit.test(`Matrix-scalar addition test (${scalar1})`, (assert) => {
	let a = new Matrix(3, 3);
	a.data[0] = [1, 2, 3];
	a.data[1] = [4, 5, 6];
	a.data[2] = [7, 8, 9];
	a.add(scalar1);

	assert.deepEqual(a, a, `Matrix addition by scalar value correctly executed (${scalar1})`);
});

let scalar2 = 1;
QUnit.test(`Matrix-scalar addition test (${scalar2})`, (assert) => {
	let a = new Matrix(3, 3);
	a.data[0] = [1, 2, 3];
	a.data[1] = [4, 5, 6];
	a.data[2] = [7, 8, 9];
	a.add(scalar2);

	let expected = new Matrix(3, 3);
	expected.data[0] = [2, 3, 4];
	expected.data[1] = [5, 6, 7];
	expected.data[2] = [8, 9, 10];

	assert.deepEqual(a, expected, `Matrix addition by scalar value correctly executed (${scalar2})`);
});

let scalar3 = 3.75;
QUnit.test(`Matrix-scalar addition test (${scalar3})`, (assert) => {
	let a = new Matrix(3, 3);
	a.data[0] = [1, -2.5, 3];
	a.data[1] = [4, 5, 6];
	a.data[2] = [7, 8, 9];
	a.add(scalar3);

	let expected = new Matrix(3, 3);
	expected.data[0] = [4.75, 1.25, 6.75];
	expected.data[1] = [7.75, 8.75, 9.75];
	expected.data[2] = [10.75, 11.75, 12.75];

	assert.deepEqual(a, expected, `Matrix addition by scalar value correctly executed (${scalar3})`);
});

let scalar4 = 7;
QUnit.test(`Matrix-scalar addition test (${scalar4}; negation test)`, (assert) => {
	let a = new Matrix(2, 2);
	a.data[0] = [1, 1];
	a.data[1] = [1, 1];
	a.add(scalar4);

	let expected = new Matrix(2, 2);
	expected.data[0] = [1, 1];
	expected.data[1] = [1, 1];

	assert.notDeepEqual(a, expected, "Matrices correctly defined as not being equal following addition negation test");
});

// B. Test matrix addition functionality --------------------------------------
QUnit.module("2. matrix.js - matrix addition");

QUnit.test("Matrix-matrix addition test (matrix addition by zero matrix)", (assert) => {
	let a = new Matrix(3, 3);
	a.randomize();

	let b = new Matrix(3, 3);
	b.data[0] = [0, 0, 0];
	b.data[1] = [0, 0, 0];
	b.data[2] = [0, 0, 0];

	a = a.add(b);

	assert.deepEqual(a, a, "Matrix addition by zero matrix correctly executed");
});

QUnit.test("Matrix-matrix addition test (matrix addition by identity matrix)", (assert) => {
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

	assert.deepEqual(a, expected, "Matrix addition by identity matrix correctly executed");
});

QUnit.test("Matrix-matrix addition test ((n x m matrix) + (n x m matrix))", (assert) => {
	let a = new Matrix(2, 3);
	a.randomize();
	let b = new Matrix(2, 3);
	b.randomize();

	assert.deepEqual(a.add(b), undefined, "Matrix size correctly defined as being incorrect");
});

QUnit.test("Matrix-matrix addition test ((n x m matrix) + (m x n matrix))", (assert) => {
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

	assert.deepEqual(Matrix.multiply(a, b), expected, "Matrix correctly added to other matrix");
});

// C. Test matrix subtraction functionality -----------------------------------------
QUnit.module("3. matrix.js - matrix subtraction");

QUnit.test("Matrix-matrix subtraction test (matrix subtraction by zero matrix)", (assert) => {
	let a = new Matrix(3, 3);
	a.randomize();

	let b = new Matrix(3, 3);
	b.data[0] = [0, 0, 0];
	b.data[1] = [0, 0, 0];
	b.data[2] = [0, 0, 0];

	assert.deepEqual(Matrix.subtract(a, b), a, "Matrix subtraction by zero matrix correctly executed");
});

QUnit.test("Matrix-matrix subtraction test (matrix subtraction by indentity matrix)", (assert) => {
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

	assert.deepEqual(result, expected, "Matrix subtraction by identity matrix correctly executed");
});

QUnit.test("Matrix-matrix subtraction test ((n x m matrix) - (m x n matrix))", (assert) => {
	let a = new Matrix(2, 3);
	a.randomize();
	let b = new Matrix(3, 2);
	b.randomize();

	assert.deepEqual(Matrix.subtract(a, b), undefined, "Matrix size correctly defined as being incorrect");
});

QUnit.test("Matrix-matrix subtraction test ((n x m matrix) - (n x m matrix))", (assert) => {
	let a = new Matrix(2, 3);
	a.data[0] = [5, 0, 0];
	a.data[1] = [5, 2, 8];

	let b = new Matrix(2, 3);
	b.data[0] = [6, 2, 8];
	b.data[1] = [8, 7, 2];

	let result = Matrix.subtract(a, b);
	let expected = new Matrix(a.rows, b.cols);
	expected.data[0] = [-1, -2, -8];
	expected.data[1] = [-3, -5, 6];

	assert.deepEqual(result, expected, "Matrix correctly subtracted from other matrix");
});

// D. Test scalar multiplication functionality --------------------------------------
QUnit.module("4. matrix.js - scalar multiply");

let scalar5 = 0;
QUnit.test(`Matrix-scalar multiplication test (${scalar5})`, (assert) => {
	let a = new Matrix(7, 3);
	a.randomize();
	a.multiply(scalar5);
	let expected = new Matrix(7, 3);

	assert.deepEqual(a, expected, `Matrix correctly multiplied by scalar value (${scalar5})`);
});

let scalar6 = 2;
QUnit.test(`Matrix-scalar multiplication test (${scalar6})`, (assert) => {
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

	assert.deepEqual(a, expected, `Matrix correctly multiplied by scalar value (${scalar6})`);
});

let scalar7 = 3.5;
QUnit.test(`Matrix-scalar multiplication test (${scalar7})`, (assert) => {
	let a = new Matrix(2, 2);
	a.data[0] = [2, 4];
	a.data[1] = [-1, 3];
	a.multiply(scalar7);

	let expected = new Matrix(2, 2);
	expected.data[0] = [7, 14];
	expected.data[1] = [-3.5, 10.5];

	assert.deepEqual(a, expected, `Matrix correctly multiplied by scalar value (${scalar7})`);
});

let scalar8 = 7;
QUnit.test(`Matrix-scalar multiplication test (${scalar8}); negation test`, (assert) => {
	let a = new Matrix(2, 2);
	a.data[0] = [1, 1];
	a.data[1] = [1, 1];
	a.multiply(scalar8);

	let expected = new Matrix(2, 2);
	expected.data[0] = [1, 1];
	expected.data[1] = [1, 1];

	assert.notDeepEqual(a, expected, "Matrices correctly defined as not being equal following multiplication negation test");
});

// E. Test matrix multiplication functionality --------------------------------------
QUnit.module("5. matrix.js - matrix multiply");

QUnit.test("Matrix-matrix multiplication test (matrix multiplication by zero matrix)", (assert) => {
	let a = new Matrix(3, 3);
	a.randomize();

	let b = new Matrix(3, 3);
	b.data[0] = [0, 0, 0];
	b.data[1] = [0, 0, 0];
	b.data[2] = [0, 0, 0];

	assert.deepEqual(Matrix.multiply(a, b), b, "Matrix correctly multiplied by zero matrix");
});

QUnit.test("Matrix-matrix multiplication test (matrix multiplication by identity matrix)", (assert) => {
	let a = new Matrix(3, 3);
	a.randomize();
	let expected = a;

	let b = new Matrix(3, 3);
	b.data[0] = [1, 1, 1];
	b.data[1] = [1, 1, 1];
	b.data[2] = [1, 1, 1];

	a.multiply(b);

	assert.deepEqual(a, expected, "Matrix correctly multiplied by identity matrix");
});

QUnit.test("Matrix-matrix multiplication test ((n x m matrix) x (n x m matrix))", (assert) => {
	let a = new Matrix(2, 3);
	a.randomize();
	let b = new Matrix(2, 3);
	b.randomize();
	a = a.multiply(b);

	assert.deepEqual(a, undefined, "Matrix size correctly defined as being incorrect");
});

QUnit.test("Matrix-matrix multiplication test ((n x m matrix) x (m x n matrix))", (assert) => {
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

	assert.deepEqual(Matrix.multiply(a, b), expected, "Matrix correctly multiplied by other matrix");
});

// F. Test matrix transpose functionality --------------------------------------
QUnit.module("6. matrix.js - matrix transpose");

QUnit.test("Matrix transposition test", (assert) => {
	let a = new Matrix(2, 3);
	a.data[0] = [1, 3, 5];
	a.data[1] = [4, -2, 7.5];

	let expected = new Matrix(3, 2);
	expected.data[0] = [1, 4];
	expected.data[1] = [3, -2];
	expected.data[2] = [5, 7.5];

	assert.deepEqual(Matrix.transpose(a), expected, "Matrix correctly transposed");
});

// G. Test matrix map functionality --------------------------------------------
QUnit.module("7. matrix.js - matrix map");

QUnit.test("Matrix map test (sigmoid function)", (assert) => {
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

	assert.deepEqual(a, expected, "Matrix correctly mapped by a function");
});

// H. Test matrix toArray functionality  ---------------------------------------
QUnit.module("8. matrix.js - matrix toArray");

QUnit.test("Matrix toArray test", (assert) => {
	let a = new Matrix(2, 3);
	a.data[0] = [1, 3, 5];
	a.data[1] = [4, -2, 7.5];
	let expected = [1, 3, 5, 4, -2, 7.5];

	assert.deepEqual(a.toArray(), expected, "Matrix correctly converted to array");
});

// I. Test matrix fromArray functionality  -------------------------------------
QUnit.module("9. matrix.js - matrix fromArray");

QUnit.test("Matrix fromArray test", (assert) => {
	let array = [1, 3, 5, 4, -2, 7.5];

	let expected = new Matrix(6, 1);
	expected.data[0] = [1];
	expected.data[1] = [3];
	expected.data[2] = [5];
	expected.data[3] = [4];
	expected.data[4] = [-2];
	expected.data[5] = [7.5];

	assert.deepEqual(Matrix.fromArray(array), expected, "Array correctly converted to n x 1 matrix");
});
