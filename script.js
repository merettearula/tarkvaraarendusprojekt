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
      var dateCell = row.cells[0]; // Assuming the date column is at index 0
  
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
      headers[i].innerHTML = '';
    }
  
    var currentHeader = document.querySelectorAll('#resultsTable th')[column];
    var arrow = currentHeader.querySelector(order === 'asc' ? 'span:nth-child(1)' : 'span:nth-child(2)');
    arrow.innerHTML = order === 'asc' ? '&#x25B2;' : '&#x25BC;';
  
    // Toggle the order when the down arrow is clicked
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
  
  // Iterate over the table rows and cells to construct the CSV content
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var rowData = [];
    
    // Iterate over the cells of each row
    for (var j = 0; j < row.cells.length; j++) {
      rowData.push(row.cells[j].textContent);
    }
    
    csvContent += rowData.join(",") + "\n";
  }
  
  // Create a temporary link element to initiate the download
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "results.csv");
  document.body.appendChild(link);
  
  // Click the link to trigger the download
  link.click();
  
  // Cleanup: remove the temporary link element
  document.body.removeChild(link);
}
filterResults(); // Käivitab algse filtreerimise

function logout(){
    window.location.href = "http://www.tlu.ee/~merette/tarkvaraarendusprojekt/logi_sisse.html";
}

function exportToExcel() {
  var table = document.getElementById('resultsTable');

  // Create a new workbook
  var workbook = XLSX.utils.book_new();

  // Convert the table to a worksheet
  var worksheet = XLSX.utils.table_to_sheet(table);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate an Excel file
  var excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Save the file
  saveAsExcelFile(excelFile, 'table.xlsx');
}

function saveAsExcelFile(data, filename) {
  var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  var url = URL.createObjectURL(blob);

  // Create a download link
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Append the link to the document and trigger the download
  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

  
