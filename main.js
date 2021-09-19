// CREATED BY LIQUIDREKTO

// Một số hàm hỗ trợ

function perm(xs) { // CHỈNH HỢP
    //
    // Code được copy nguyên xi từ StackOverflow
    // Lí do đơn giản là tôi thực sự ko thể nghĩ ddc nên triển khai pt này ntn :))
    let ret = [];
  
    for (let i = 0; i < xs.length; i = i + 1) {
      let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1))); // Đệ quy
  
      if(!rest.length) {
        ret.push([xs[i]])
      } else {
        for(let j = 0; j < rest.length; j = j + 1) {
          ret.push([xs[i]].concat(rest[j]))
        }
      }
    }
    return ret;
  }

function GetSubstitionSetOfSquaredMatrix(matrix) { // Trả về tập hợp phép thế của một ma trận (đại loại vậy?)
    // TRẢ VỀ TẬP HỢP CÁC PHÉP THẾ
    var subs_set = [];
    var cases; // Mảng chứa tất cả các trường hợp có thể xảy ra của một phép thế (?)
    var i;
    if (matrix.ROWS == matrix.COLUMNS) {
        var checker = [];
        for (i = 0; i < matrix.COLUMNS; i++) {
            checker.push(i+1); // Tạo thứ tự từ 1 đến số cấp của ma trận
        }
        cases = perm(checker); // In hết tất cả trường hợp vào mảng này. Độ dài là n! (n là số cấp của ma trận)

        for (i = 0; i < cases.length; i++) {
            var sub = new SUBSTITUTION(matrix.ROWS); // Tạo biến với class "PHÉP-THẾ" đã tạo
            sub.AddSubData(cases[i]); // Thêm dữ liệu vào phép thế :v
            subs_set.push(sub); // Thêm phép thế này vào tập hợp các phép thế
        }
        return subs_set; // Trả về tập hợp phép thế
    } else {
        console.error("MA TRẬN BẠN NHẬP VÀO KHÔNG PHẢI MA TRẬN VUÔNG!");
    }
}


class SUBSTITUTION {
    constructor(size) {
        this.SIZE = size; // Xác định số phần tử trong phép thế
        this.DATA = null;
    }

    GetSign() { // Tìm dấu phép thế (BẰNG 1 hoặc -1)
        // Áp dụng công thức mà phang
        var i,k;
        var numberofnegs = 0; // Số lần nghịch thế xuất hiện
        for (i = 0; i < this.SIZE-1; i++) { // Áp dụng công thức PI ({i,j} thuộc S) của (i-j)/(s(i)-s(j))
            for (k = i+1; k < this.SIZE; k++) {
                var num = i - k; // i - j
                var denum = this.DATA[i] - this.DATA[k]; // s(i) - s(j) \ s là phép thế
                if (num/denum < 0) { // Nếu như tử trên mẫu ra âm => CÓ XUẤT HIỆN NGHỊCH THẾ
                    numberofnegs += 1;
                }
            }
        }
        return (numberofnegs % 2 == 0 ? 1 : -1); // Nếu như số nghịch thế chẵn thì in ra 1, ngược lại in ra -1
        
    }

    AddSubData(arr) { // Thêm dữ liệu vào phép thế
        if (arr.length == this.SIZE) {
            this.DATA = arr;
        } else {
            console.error(`DỮ LIỆU NHẬP VÀO KHÔNG ĐỦ SO VỚI YÊU CẦU CỦA PHÉP THẾ! CÒN ${this.SIZE - arr.length} SỐ NỮA MỚI ĐỦ SỐ CỘT ĐÃ XÁC ĐỊNH!`);
        }
    }


}






class SQUARED_MAT {
    constructor(size) {
        // Xác định cấp của ma trận vuông
        this.ROWS = size; // Số hàng
        this.COLUMNS = size; // Số cột
        this.DATA = []; // Dữ liệu chính của ma trận
    }

    AddDataToRow(row,data) {
        // Kiểm tra dữ liệu nhập vào
        if (row <= this.ROWS && row > 0) { // Nếu như hàng cần thêm tồn tại trong ma trận
            if (data.length == this.COLUMNS) { // Nếu như số phần tử trong mảng data trùng với số cột đã đặt
                this.DATA[row - 1] = data;
            } else {
                console.error(`DỮ LIỆU NHẬP VÀO KHÔNG ĐỦ SO VỚI YÊU CẦU CỦA MA TRẬN! CÒN ${this.COLUMNS - data.length + 1} SỐ NỮA MỚI ĐỦ SỐ CỘT ĐÃ XÁC ĐỊNH!`);
            }

        } else {
            console.error(`KHÔNG THỂ TÌM THẤY HÀNG THEO YÊU CẦU!`);
        }
    }

    EvalDeterminant() { // Tính định thức
        var i,k;
        var out = 0;
        var prod = 1;
        // ÁP DỤNG CÔNG THỨC
        // SIGMA (s thuộc S) của pt (sgn(s)*a<1-s(1)>*a<2-s(2)>*...*a<n-s(n)>)
        //
        // trong đó: s là một phép thé
        //           S là tập hợp tất cả các phép thế

        var sub_arr = GetSubstitionSetOfSquaredMatrix(this); // Lấy tập hợp tất cả các phép thế của ma trận 
        for (i = 0; i < sub_arr.length; i++) {
            var target_sub = sub_arr[i]; // Lấy một phép thế chỉ định
            for (k = 0; k < this.ROWS; k++) { // Tính tích a<1-s(1)>*a<2-s(2)>*...*a<n-s(n)>
                prod *= this.DATA[k][target_sub.DATA[k]-1]; 
                //console.log(this.DATA[k][target_sub.DATA[k]-1])
            }
            prod *= target_sub.GetSign(); // Nhân thêm với dấu của phép thế chỉ định
            //console.log(prod);
            out += prod; // Cộng thêm số hạng
            prod = 1; // Reset lại biến tích
        }

        return out;
    }


}