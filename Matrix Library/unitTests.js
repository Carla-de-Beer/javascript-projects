// QUnit unit testing for the matrix.js file's functionalities.

// 1. Test scalar addition functionality
// 2. Test matrix addition functionality
// 3. Test matrix subtraction functionality
// 4. Test scalar multiplication functionality
// 5. Test matrix multiplication functionality
// 6. Test matrix transpose functionality
// 7. Test matrix map functionality
// 8. Test matrix toArray functionality
// 9. Test matrix fromArray functionality

// 1. Test scalar summation functionality --------------------------------------
QUnit.module("1. matrix.js - scalar addition");

let scalar1 = 0;
QUnit.test(`Matrix addition test (scalar addition by ${scalar1})`, (assert) => {
	let a = new Matrix(3, 3);
	a.data[0] = [1, 2, 3];
	a.data[1] = [4, 5, 6];
	a.data[2] = [7, 8, 9];
	a.add(scalar1);

	assert.deepEqual(a, a, `Matrix correctly addition by scalar value (${scalar1})`);
});

let scalar2 = 1;
QUnit.test(`Matrix addition test (scalar addition by ${scalar2})`, (assert) => {
	let a = new Matrix(3, 3);
	a.data[0] = [1, 2, 3];
	a.data[1] = [4, 5, 6];
	a.data[2] = [7, 8, 9];
	a.add(scalar2);
	let expected = new Matrix(3, 3);
	expected.data[0] = [2, 3, 4];
	expected.data[1] = [5, 6, 7];
	expected.data[2] = [8, 9, 10];

	assert.deepEqual(a, expected, `Matrix correctly addition by scalar value (${scalar2})`);
});

let scalar3 = 3.75;
QUnit.test(`Matrix addition test (scalar addition by ${scalar3})`, (assert) => {
	let a = new Matrix(3, 3);
	a.data[0] = [1, -2.5, 3];
	a.data[1] = [4, 5, 6];
	a.data[2] = [7, 8, 9];
	a.add(scalar3);

	let expected = new Matrix(3, 3);
	expected.data[0] = [4.75, 1.25, 6.75];
	expected.data[1] = [7.75, 8.75, 9.75];
	expected.data[2] = [10.75, 11.75, 12.75];

	assert.deepEqual(a, expected, `Matrix correctly addition by scalar value (${scalar3})`);
});

let scalar4 = 7;
QUnit.test(`Matrix addition test (scalar addition of indentity matrix by ${scalar4}; negation test)`, (assert) => {
	let a = new Matrix(2, 2);
	a.data[0] = [1, 1];
	a.data[1] = [1, 1];
	a.add(scalar4);

	let expected = new Matrix(2, 2);
	expected.data[0] = [1, 1];
	expected.data[1] = [1, 1];

	assert.notDeepEqual(a, expected, "Matrices correctly defined as not being equal following addition");
});

// 2. Test matrix addition functionality --------------------------------------
QUnit.module("2. matrix.js - matrix addition");

QUnit.test("Matrix addition test (matrix addition by zero matrix)", (assert) => {
	let a = new Matrix(3, 3);
	a.randomize();

	let b = new Matrix(3, 3);
	b.data[0] = [0, 0, 0];
	b.data[1] = [0, 0, 0];
	b.data[2] = [0, 0, 0];

	a = a.add(b);

	assert.deepEqual(a, a, "Matrix addition by zero matrix correctly performed");
});

QUnit.test("Matrix addition test (matrix addition by indentity matrix)", (assert) => {
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

	assert.deepEqual(a, expected, "Matrix addition by identity matrix correctly performed");
});

QUnit.test("Matrix addition test (n x m matrix addition by n x m matrix)", (assert) => {
	let a = new Matrix(2, 3);
	a.randomize();
	let b = new Matrix(2, 3);
	b.randomize();

	assert.deepEqual(a.add(b), undefined, "Matrix size correctly defined as being incorrect");
});

QUnit.test("Matrix addition test (n x m matrix addition by m x n matrix)", (assert) => {
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

// 3. Test matrix subtraction functionality -----------------------------------------
QUnit.module("3. matrix.js - matrix subtraction");

QUnit.test("Matrix subtraction test (matrix subtraction by zero matrix)", (assert) => {
	let a = new Matrix(3, 3);
	a.randomize();

	let b = new Matrix(3, 3);
	b.data[0] = [0, 0, 0];
	b.data[1] = [0, 0, 0];
	b.data[2] = [0, 0, 0];

	assert.deepEqual(Matrix.subtract(a, b), a, "Matrix subtraction by zero matrix correctly performed");
});

QUnit.test("Matrix subtraction test (matrix subtraction by indentity matrix)", (assert) => {
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

	assert.deepEqual(result, expected, "Matrix subtraction by identity matrix correctly performed");
});

QUnit.test("Matrix subtraction test (n x m matrix subtraction by n x m matrix)", (assert) => {
	let a = new Matrix(2, 3);
	a.randomize();
	let b = new Matrix(3, 2);
	b.randomize();

	assert.deepEqual(Matrix.subtract(a, b), undefined, "Matrix size correctly defined as being incorrect");
});

QUnit.test("Matrix subtraction test (n x m matrix subtraction by m x n matrix)", (assert) => {
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

// 4. Test scalar multiplication functionality --------------------------------------
QUnit.module("4. matrix.js - scalar multiply");

let scalar5 = 0;
QUnit.test(`Matrix multiplication test (scalar multiplication by ${scalar5})`, (assert) => {
	let a = new Matrix(7, 3);
	a.randomize();
	a.multiply(scalar5);
	let expected = new Matrix(7, 3);

	assert.deepEqual(a, expected, `Matrix correctly multiplied by scalar value (${scalar5})`);
});

let scalar6 = 2;
QUnit.test(`Matrix multiplication test (scalar multiplication of indentity matrix by ${scalar6})`, (assert) => {
	let scalar = 2;
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
QUnit.test(`Matrix multiplication test (scalar multiplication of random matrix by ${scalar7})`, (assert) => {
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
QUnit.test(`Matrix multiplication test (scalar multiplication of indentity matrix by ${scalar8}; negation test)`, (assert) => {
	let a = new Matrix(2, 2);
	a.data[0] = [1, 1];
	a.data[1] = [1, 1];
	a.multiply(scalar8);

	let expected = new Matrix(2, 2);
	expected.data[0] = [1, 1];
	expected.data[1] = [1, 1];

	assert.notDeepEqual(a, expected, "Matrices correctly defined as not being equal following multiplication");
});

// 5. Test matrix multiplication functionality --------------------------------------
QUnit.module("5. matrix.js - matrix multiply");

QUnit.test("Matrix multiplication test (matrix multiplication by zero matrix)", (assert) => {
	let a = new Matrix(3, 3);
	a.randomize();

	let b = new Matrix(3, 3);
	b.data[0] = [0, 0, 0];
	b.data[1] = [0, 0, 0];
	b.data[2] = [0, 0, 0];

	assert.deepEqual(Matrix.multiply(a, b), b, "Matrix correctly multiplied by zero matrix");
});

QUnit.test("Matrix multiplication test (matrix multiplication by indentity matrix)", (assert) => {
	let a = new Matrix(3, 3);
	a.randomize();

	let b = new Matrix(3, 3);
	b.data[0] = [1, 1, 1];
	b.data[1] = [1, 1, 1];
	b.data[2] = [1, 1, 1];

	a.multiply(b);
	let expected = a;

	assert.deepEqual(a, expected, "Matrix correctly multiplied by identity matrix");
});

QUnit.test("Matrix multiplication test (n x m matrix multiplication by n x m matrix)", (assert) => {
	let a = new Matrix(2, 3);
	a.randomize();
	let b = new Matrix(2, 3);
	b.randomize();
	a = a.multiply(b);

	assert.deepEqual(a, undefined, "Matrix size correctly defined as being incorrect");
});

QUnit.test("Matrix multiplication test (n x m matrix multiplication by m x n matrix)", (assert) => {
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

// 6. Test matrix transpose functionality --------------------------------------
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

// 7. Test matrix map functionality --------------------------------------------
QUnit.module("7. matrix.js - matrix map");

// 8. Test matrix toArray functionality  ---------------------------------------
QUnit.module("8. matrix.js - matrix toArray");

QUnit.test("Matrix toArray test", (assert) => {
	let a = new Matrix(2, 3);
	a.data[0] = [1, 3, 5];
	a.data[1] = [4, -2, 7.5];
	let expected = [1, 3, 5, 4, -2, 7.5];

	assert.deepEqual(a.toArray(), expected, "Matrix correctly converted to array");
});

// 9. Test matrix fromArray functionality  -------------------------------------
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
