function setInputFilter(textbox, inputFilter) { // Lọc một số thành phần trong input
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
}

var CURRENT_SQ_MAT_SIZE = 0;



setInputFilter(document.getElementById('mat-sz-input'), function(value) {
    return /^\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});

function MatrixTable(rows, columns) {
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    table.classList.add('table-style-def');
    var i,k,n;
    // Tạo hàng chỉ cột
    var tr = document.createElement('tr');
    for (i = 0; i < columns+1; i++) {
        if (i > 0) {
            var th = document.createElement('th');
            th.innerText = i;
            tr.appendChild(th);
        } else {
            var td = document.createElement('td');
            tr.appendChild(td);
        }
    }
    tbody.appendChild(tr);

    // Tạo hàng chỉ dòng

    for (n = 0; n < rows; n++) {
        var tr_2 = document.createElement('tr');
        for (k = 0; k < columns+1; k++) {
            if (k > 0) {
                var td_1 = document.createElement('td');
                var input = document.createElement('input');
                input.type = 'text';
                input.placeholder = '-';
                input.classList.add('input-num');
                td_1.appendChild(input);
                tr_2.appendChild(td_1);
            } else {
                var th_1 = document.createElement('th');
                th_1.innerText = n+1;
                tr_2.appendChild(th_1);
            }
            
        }
        tbody.appendChild(tr_2);
        
    }
    table.appendChild(tbody);
    return table;
}

var table_area = document.getElementById('table-section');

var eval_btn = document.createElement('button');
eval_btn.innerText = "Tính định thức";
eval_btn.classList.add('button-def');
eval_btn.style.display = 'block';
eval_btn.addEventListener('click', () => {
    if (isTableDataValid()) {
        FindDeterminant();
    }    
});

function GenerateTable() {
    var source = document.getElementById('mat-sz-input');
    var sz = parseInt(source.value);

    if (sz > 10) {
        alert('Vì lí do hiệu năng, hệ thống chỉ cho phép bạn tính định thức đến hạn mức là cấp 10!');
    } else {
        table_area.appendChild(MatrixTable(sz,sz));
        CURRENT_SQ_MAT_SIZE = sz;
        var matInputs = document.getElementsByClassName('input-num');

        for (i = 0; i < matInputs.length; i++) {
            setInputFilter(matInputs[i], function(value) {
                return /^\-?\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
            });
        }
    }

    if (CURRENT_SQ_MAT_SIZE > 0) {
        table_area.appendChild(eval_btn);
    }
}

function isTableDataValid() {
    var inputs = document.getElementsByClassName('input-num');
    var i;
    var numberOfErrors = 0;
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value == '' || isNaN(parseFloat(inputs[i].value))) {
            inputs[i].style.backgroundColor = 'rgba(255,0,0,0.6)';
            numberOfErrors += 1;       
        } else {
            inputs[i].style.backgroundColor = 'transparent';
        }
    }
    
    if (numberOfErrors > 0) {
        alert(`Dữ liệu đầu vào CHƯA HỢP LỆ! Bạn hãy tiến hành kiểm tra lại. Chú ý những ô đánh màu đỏ có nghĩa là dữ liệu nhập vào có vấn đề!`)
        return false;
    } else {
        return true;
    }
}

function FindDeterminant() {
    var mat = new SQUARED_MAT(CURRENT_SQ_MAT_SIZE);
    var inputs = document.getElementsByClassName('input-num');
    var i;
    var batchNum = [];
    for (i = 0; i < inputs.length + 1; i++) {
        if (i % CURRENT_SQ_MAT_SIZE == 0) {
            if (i > 0) {
                mat.AddDataToRow(i/CURRENT_SQ_MAT_SIZE,batchNum);
                batchNum = [];               
            }   
        }
        if (i < inputs.length) {
            batchNum.push(parseFloat(inputs[i].value));
        }
        

    }
    console.log(mat);

    document.getElementById('results').innerText = mat.EvalDeterminant();
}

var gener_btn = document.getElementById('generate-table');
gener_btn.addEventListener('click', () => {
    table_area.innerHTML = '';
    GenerateTable();
});






