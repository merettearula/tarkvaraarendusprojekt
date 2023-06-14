<?php
session_start();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Tagasiside</title>
    <style>
        .selected {
            outline: 3px solid #000000;
        }
    </style>
</head>
<body>
    <div id="main">
        <h2>Tagasiside</h2>
        <br>
        <form method="post" action="submit_feedback.php">
            <label for="overall_feedback" id="overall_feedback">Kas intervjuusimulaator aitas valmistuda intervjuuks? </label>
            <br>
            <div id="feedback_buttons">
                <input type="hidden" name="feedback" value="0"> <!-- Default feedback value -->
                <input type="button" name="like_feedback" id="like_feedback_button" value="&#128077" onclick="handleFeedback(1)">
                <input type="button" name="dislike_feedback" id="dislike_feedback_button" value="&#128078" onclick="handleFeedback(-1)">
            </div>
            <br>
            <label for="detail_feedback" id="feedback">Kui soovid jätta detailsemat tagasisidet:</label>
            <br>
            <textarea name="detail_feedback" id="detail_feedback" placeholder="Trüki siia"></textarea>
            <br>
            <label for="question" id="question">Kui soovid küsida meilt midagi:</label>
            <br>
            <input type="text" name="question" id="question" placeholder="Trüki siia">
            <br>
            <label for="email">Kui soovid oma küsimustele vastust, siis jäta oma e-maili aadress:</label>
            <br>
            <input type="email" name="email" id="email" placeholder="Sisesta e-mail">
            <br><br>
            <button class="submit_btn" type="submit">Saada tagasiside</button>
            <br>
        </form>
        <button class="submit_btn" onclick="window.location.href='../lopp'">Tagasi</button>
    </div>
    <?php if(isset($_SESSION['kasutaja_id'])){
        echo $_SESSION['kasutaja_id'];
    } ?>
    <script>
        function handleFeedback(value) {
            document.getElementsByName('feedback')[0].value = value;

            // Remove the 'selected' class from both buttons
            document.getElementById('like_feedback_button').classList.remove('selected');
            document.getElementById('dislike_feedback_button').classList.remove('selected');

            // Add the 'selected' class to the clicked button
            event.target.classList.add('selected');
        }
    </script>
</body>
</html>

