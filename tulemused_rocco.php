
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Tulemuste tabel</title>
  <link rel="stylesheet" type="text/css" href="style_test.css">
  <script src="https://unpkg.com/xlsx/dist/xlsx.full.min.js"></script>
</head>
<body>
  <h1>Tulemuste tabel</h1>

  <div id="filter">
    <label for="from">Alates:</label>
    <input type="date" id="from">
    <label for="to">Kuni:</label>
    <input type="date" id="to">
    <button onclick="filterResults()">Filtreeri</button>
    <button onclick="clearFilter()">Tühjenda</button>
    <button id="csvButton" onclick="exportToCSV()">Export CSV</button>
    <button id="excelButton" onclick="exportToExcel()">Export Excel</button>
    <button class="button clicked" id="statisticsButton" onclick="window.location.href='statistika.html'">Statistika</button>
    <button class="button" id="feedbackButton" onclick="window.location.href='tagasiside.html'">Tagasiside</button>
    <button id="logoutButton" onclick="logout()">Log Out</button>
  </div>

<table id="resultsTable">
  <thead>
      <tr>
        
        <th data-column="0" data-type="date">
          Kuupäev
          <span class="clickable" onclick="sortTable(0, 'asc')">&#x25B2;</span>
          <span onclick="sortTable(0, 'desc')">&#x25BC;</span>
        </th>
        <th data-column="1">Eesnimi <span class="clickable" onclick="sortTable(1, 'asc')">&#x25B2;</span><span onclick="sortTable(1, 'desc')">&#x25BC;</span></th>
        <th data-column="2">IP aadress <span class="clickable" onclick="sortTable(2, 'asc')">&#x25B2;</span><span onclick="sortTable(2, 'desc')">&#x25BC;</span></th>
        <th data-column="3">Õiged vastused <span class="clickable" onclick="sortTable(3, 'asc')">&#x25B2;</span><span onclick="sortTable(3, 'desc')">&#x25BC;</span></th>
        <th data-column="4">Valed vastused <span class="clickable" onclick="sortTable(4, 'asc')">&#x25B2;</span><span onclick="sortTable(4, 'desc')">&#x25BC;</span></th>
        <th data-column="5">Lõppskoor <span class="clickable" onclick="sortTable(5, 'asc')">&#x25B2;</span><span onclick="sortTable(5, 'desc')">&#x25BC;</span></th>
      </tr>
    </thead>
    <tbody>
    <?php
    require_once "../config.php";
    $conn = new mysqli($server_host, $server_user_name, $server_password, $dbname);
    $stmt = $conn->prepare("SELECT t.id, t.aeg_algus, t.soorituste_arv, t.vastamata, t.kasutaja_id, t.oigesti, t.valesti, t.vastamata_nr, t.oigesti_nr, t.valesti_nr,  k.nimi, k.haridus, k.amet, k.huvid FROM tulemus t INNER JOIN kasutaja k ON t.kasutaja_id = k.id");
    $conn->set_charset("utf8");
    echo $conn->error;
    $stmt->execute();
    $stmt->bind_result($id, $aeg_algus, $soorituste_arv, $vastamata, $kasutaja_id, $oigesti, $valesti, $vastamata_nr, $oigesti_nr, $valesti_nr, $nimi, $haridus, $amet, $huvid);

    while ($stmt->fetch()) {
      echo "<tr>";
      echo "<td>$aeg_algus</td>";
      echo "<td>$nimi</td>";
      echo "<td>$ip_aadress</td>";
      echo "<td>$oigesti</td>";
      echo "<td>$valesti</td>";
      echo "<td>Lõppskoor value</td>";
      echo "<td><button class='vaata-veel-btn' onclick='loadDetails(this)'>Vaata veel</button></td>";
      echo "</tr>";
      echo "<tr class='details-row' style='display: none;'>";
      echo "<td colspan='7'>";
      echo "<strong>Haridus:</strong> $haridus<br>";
      echo "<strong>Amet:</strong> $amet<br>";
      echo "<strong>Huvid:</strong> $huvid<br>";
      echo "<br><strong>Soorituste arv:</strong> $soorituste_arv<br>";
      echo "<strong>Õiged vastused:</strong> $oigesti<br>";
      echo "<strong>Õiged vastatud küsimused:</strong> $oigesti_nr<br>";
      echo "<br><strong>Valesti nr:</strong> $valesti_nr<br>";
      echo "<strong>Valesti:</strong> $valesti<br>";
      echo "<br><strong>Vastamata:</strong> $vastamata<br>";
      echo "<strong>Vastamata nr:</strong> $vastamata_nr<br>";
      echo "</td>";
      echo "</tr>";
    }

    $stmt->close();
    $conn->close();
  ?>
</tbody>
</table>

<script src="script.js"></script>
</body>
</html>

