var mat = new SQUARED_MAT(2);
mat.AddDataToRow(1,[11, -7]);
mat.AddDataToRow(2,[-3, -6]);

var mat1 = new SQUARED_MAT(3);

mat1.AddDataToRow(1,[-2,1,3]);
mat1.AddDataToRow(2,[6,2,-9]);
mat1.AddDataToRow(3,[-7,8,1]);

var mat2 = new SQUARED_MAT(4);

mat2.AddDataToRow(1,[-2,1,3,9]);
mat2.AddDataToRow(2,[5,6,-10,2]);
mat2.AddDataToRow(3,[-5,-8,4,14]);
mat2.AddDataToRow(4,[19,-11,-13,-6]);

var mat3 = new SQUARED_MAT(5);
mat3.AddDataToRow(1,[1,3,-5,-7,9]);
mat3.AddDataToRow(2,[2,-4,6,8,-10]);
mat3.AddDataToRow(3,[1,2,8,5,11]);
mat3.AddDataToRow(4,[-4,-5,-7,-6,14]);
mat3.AddDataToRow(5,[9,-2,5,9,-12]);

console.log(`Kết quả 2x2: ${mat.EvalDeterminant()}`);
console.log(`Kết quả 3x3: ${mat1.EvalDeterminant()}`);
console.log(`Kết quả 4x4: ${mat2.EvalDeterminant()}`);
console.log(`Kết quả 5x5: ${mat3.EvalDeterminant()}`);

