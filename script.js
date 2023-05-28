var sortDirection = {
    column: '',
    order: ''
  };
  
  function filterResults() {
    var fromInput = document.getElementById('from');
    var toInput = document.getElementById('to');
    var fromDate = new Date(fromInput.value);
    var toDate = new Date(toInput.value);
  
    var table = document.getElementById('resultsTable');
    var rows = table.getElementsByTagName('tr');
  
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var dateCell = row.cells[0]; //kuupäev indexiga 0
  
      if (dateCell) {
        var dateText = dateCell.textContent;
        var rowDate = new Date(dateText);
  
        if (fromDate && rowDate < fromDate) {
          row.style.display = 'none';
        } else if (toDate && rowDate > toDate) {
          row.style.display = 'none';
        } else {
          row.style.display = '';
        }
      }
    }
  }
  
  function parseDate(dateString) {
    var parts = dateString.split('-'); 
    var day = parseInt(parts[2], 10); // Day is at index 2
    var month = parseInt(parts[1], 10); // Month is at index 1
    var year = parseInt(parts[0], 10); // Year is at index 0
    return new Date(year, month - 1, day);
  }
  

  function clearFilter() {
    var fromInput = document.getElementById('from');
    var toInput = document.getElementById('to');
    
    // Reset the date inputs
    fromInput.value = 'none';
    toInput.value = 'none';
    
    filterResults(); // Apply the filter with the cleared values
  }
  

  //võrldeb valitud veeru praeguse ja järgmiste ridade väärtusi, määrab sortimisjärjestuse (kasvab või kahanevalt) ja vahetab vajaduse korral ridu.
  function sortTable(column, order) {
    var table = document.getElementById('resultsTable');
    var rows = table.rows;
    var switching = true;
    var shouldSwitch = false;
    var switchCount = 0;
  
    while (switching) {
      switching = false;
      for (var i = 1; i < rows.length - 1; i++) {
        var currentRow = rows[i];
        var nextRow = rows[i + 1];
  
        var currentCell = currentRow.cells[column];
        var nextCell = nextRow.cells[column];
  
        var currentValue = currentCell.innerHTML.toLowerCase();
        var nextValue = nextCell.innerHTML.toLowerCase();
       
        //Kui sortimisjärjestus on kahanev, võrdleb see väärtust currentValue < nextValue
       //Kui currentValue on väiksem kui nextValue, tähendab see, et ridu tuleb kahaneva järjestuse saavutamiseks vahetada.

        if (order === 'asc' ? currentValue > nextValue : currentValue < nextValue) {
          shouldSwitch = true;
          break;
        }
      }
  
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchCount++;
      } else {
        //näitab, et kogu tabel on juba kasvavas järjekorras sorteeritud (terve tabel läbi käidud)
        if (switchCount === 0 && order === 'asc') {
          order = 'desc';
          switching = true;
        }
      }
    }
  
    updateSortIndicator(column, order);
  }
  
  
  function updateSortIndicator(column, order) {
    var headers = document.querySelectorAll('#resultsTable th span');
    for (var i = 0; i < headers.length; i++) {
      //eemaldab eelmisest sortimisest kõik sisu
      headers[i].innerHTML = '';
    }
  
    var currentHeader = document.querySelectorAll('#resultsTable th')[column];
    //Kui sortimise järjekord on tõusev (järjestus === 'asc' on true), 
    //valib see praeguse headeri <span> esimese elemendi, kasutades parameetrit 'span:nth-child(1)'.

    var arrow = currentHeader.querySelector(order === 'asc' ? 'span:nth-child(1)' : 'span:nth-child(2)');

    //Kui sortimisjärjekord on kahanev (järjestus === 'asc' on väär), 
    //määrab see noole <span> elemendi sisemise HTML-i väärtuseks '&#x25BC;' (allapoole kolmnurk) 
    arrow.innerHTML = order === 'asc' ? '&#x25B2;' : '&#x25BC;';
  
    //Kui alla kolmnurka klõsatakse, läheb funktsioon käima
    arrow.onclick = function() {
      var currentOrder = sortDirection.order === 'asc' ? 'desc' : 'asc';
      sortDirection.order = currentOrder;
      sortTable(column, currentOrder);
    };
  }

  function exportToCSV() {
  var table = document.getElementById('resultsTable');
  var rows = table.getElementsByTagName('tr');
  
  var csvContent = "data:text/csv;charset=utf-8,";
  
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var rowData = [];
    
    // Iterate over the cells of each row
    for (var j = 0; j < row.cells.length; j++) {
      rowData.push(row.cells[j].textContent);
    }
    
    csvContent += rowData.join(",") + "\n";
  }
  
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "results.csv");
  document.body.appendChild(link);
  
  link.click();
  
  document.body.removeChild(link);
}
filterResults(); // Käivitab algse filtreerimise

function logout(){
    window.location.href = "http://www.tlu.ee/~merette/tarkvaraarendusprojekt/logi_sisse.html";
}

function exportToExcel() {
  var table = document.getElementById('resultsTable');

  var workbook = XLSX.utils.book_new();

  var worksheet = XLSX.utils.table_to_sheet(table);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  var excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  saveAsExcelFile(excelFile, 'table.xlsx');
}

function saveAsExcelFile(data, filename) {
  var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  var url = URL.createObjectURL(blob);

  var a = document.createElement('a');
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

  
