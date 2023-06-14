<?php
session_start();

$overallFeedback = $_POST['feedback']; // Like: 1, Dislike: -1
$detailFeedback = $_POST['detail_feedback'];
$question = $_POST['question'];
$email = $_POST['email'];

require_once "../../config.php";

echo $_SESSION['kasutaja_id'];

$connection = mysqli_connect($server_host, $server_user_name, $server_password, $dbname);

if (!$connection) {
    die("Database connection failed: " . mysqli_connect_error());
}



$sql = "INSERT INTO tagasiside (tagasiside, email, nupp, kysimus, kasutaja_id) 
        VALUES ('$detailFeedback', '$email', '$overallFeedback', '$question', '".$_SESSION['kasutaja_id']."')";

if (mysqli_query($connection, $sql)) {
    echo "Feedback submitted successfully.";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
}

mysqli_close($connection);
?>