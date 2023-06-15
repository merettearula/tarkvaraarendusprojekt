<?php function sign_in($kasutajanimi, $parool) {
    $login_error = null;
    require_once "../../config.php";
    $conn = new mysqli($server_host, $server_user_name, $server_password, $dbname);
    $conn->set_charset("utf8");
    $stmt = $conn->prepare("SELECT id, parool FROM admin WHERE kasutajanimi = ?");
    echo $conn->error;
    $stmt->bind_param("s", $kasutajanimi);
    $stmt->bind_result($id_from_db, $password_from_db);
    $stmt->execute();
    if ($stmt->fetch()) {
		/*peab ümber tegema!*/ 
        if ($parool == $password_from_db) {
            /*$_SESSION["kasutaja_id"] = $id_from_db;*/
            $stmt->close();
            $conn->close();
            header("Location: ../statistika/statistika_test.php");
            exit();
        } else {
            $login_error = "Kasutajatunnus või salasõna oli vale!";
			echo $parool;
			echo $password_from_db;
			echo  $kasutajanimi;
        }
    } else {
        $login_error = "Kasutajatunnus või salasõna oli vale!";
    }

    $stmt->close();
    $conn->close();

    return $login_error;
}
?>