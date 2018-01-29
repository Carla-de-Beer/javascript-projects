let a = new Matrix(2, 3);
let b = new Matrix(3, 2);
let c = new Matrix(a.rows, b.cols);

a.randomize();
b.randomize();
c = Matrix.multiply(a, b);

a.print();
b.print();
c.print();
