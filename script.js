var sortDirection = {
    column: '',
    order: ''
  };
  
  function filterResults() {
    var fromInput = document.getElementById('from');
    var toInput = document.getElementById('to');
    var fromDate = parseDate(fromInput.value);
    var toDate = parseDate(toInput.value);
    
    var table = document.getElementById('resultsTable');
    var rows = table.getElementsByTagName('tr');
    
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var dateText = row.cells[4].textContent;
      var rowDate = parseDate(dateText);
    
      if (fromDate && rowDate < fromDate) {
        row.style.display = 'none';
      } else if (toDate && rowDate > toDate) {
        row.style.display = 'none';
      } else {
        row.style.display = '';
      }
    }
  }
  
  function parseDate(dateString) {
    var parts = dateString.split('.');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);
    return new Date(year, month - 1, day);
  }
  
  

  function clearFilter() {
    var fromInput = document.getElementById('from');
    var toInput = document.getElementById('to');
    
    // Reset the date inputs
    fromInput.value = '2023-01-01';
    toInput.value = '2023-12-31';
    
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
  
