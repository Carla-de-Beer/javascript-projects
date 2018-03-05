// Basic matrix operations library.
// Created: January 2018.
// Based on the examples by Daniel Shiffman:
// https://www.youtube.com/user/shiffman/videos

class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for (let i = 0; i < this.rows; ++i) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; ++j) {
        this.data[i][j] = 0;
      }
    }
  }

  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; ++i) {
      m.data[i][0] = arr[i];
    }
    return m;
  }

  static subtract(a, b) {
    // Matrices must be of the same size, otherwise subtraction is not possible.
    if (a.cols !== b.cols && a.rows !== b.rows) {
      console.log("Matrices must be of equal size");
      return undefined;
    }
    // Return a new Matrix a-b
    let result = new Matrix(a.rows, a.cols);
    for (let i = 0; i < result.rows; ++i) {
      for (let j = 0; j < result.cols; ++j) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
  }

  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; ++i) {
      for (let j = 0; j < this.cols; ++j) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  randomize() {
    for (let i = 0; i < this.rows; ++i) {
      for (let j = 0; j < this.cols; ++j) {
        this.data[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  add(n) {
    if (n instanceof Matrix) {
      // Matrices must be of the same size, otherwise addition is not possible.
      if (this.cols !== n.cols && this.rows !== n.rows) {
        console.log("Matrices must be of equal size");
        return undefined;
      }
      for (let i = 0; i < this.rows; ++i) {
        for (let j = 0; j < this.cols; ++j) {
          this.data[i][j] += n.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; ++i) {
        for (let j = 0; j < this.cols; ++j) {
          this.data[i][j] += n;
        }
      }
    }
  }

  static transpose(matrix) {
    let result = new Matrix(matrix.cols, matrix.rows);
    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.cols; ++j) {
        result.data[j][i] = matrix.data[i][j];
      }
    }
    return result;
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) {
      console.log("Columns of A must match rows of B");
      return undefined;
    }
    let result = new Matrix(a.rows, b.cols);
    for (let i = 0; i < result.rows; ++i) {
      for (let j = 0; j < result.cols; ++j) {
        // Dot product values in col
        let sum = 0;
        for (let k = 0; k < a.cols; ++k) {
          sum += a.data[i][k] * b.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    return result;
  }

  multiply(n) {
  // Scalar product
  for (let i = 0; i < this.rows; ++i) {
    for (let j = 0; j < this.cols; ++j) {
      this.data[i][j] *= n;
        if (this.data[i][j] === -0) {
          this.data[i][j] = 0;
        }
      }
    }
  }

  map(func) {
    // Apply a function to every element of Matrix
    for (let i = 0; i < this.rows; ++i) {
      for (let j = 0; j < this.cols; ++j) {
        let val = this.data[i][j];
        this.data[i][j] = func(val);
      }
    }
  }

  static createIdentityMatrix(size) {
      let matrix = new Matrix(size, size);
      for (let i = 0; i < matrix.rows; ++i) {
        for (let j = 0; j < matrix.cols; ++j) {
          matrix.data[i][j] = 1;
        }
      }
      return matrix;
  }

  print() {
    console.table(this.data);
  }
}

// exception handling allows for both QUnit and Jest unit tests to be run from the same sourec file
try {
  module.exports = Matrix;
}
catch(e) {
  console.log("QUnit does not need to add modules: " + e);
}
