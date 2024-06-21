<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ludo_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE game_state SET player1='visible', dice=0,player2='hidden' ,nbP1 =0,nbP2 = 0, centre = 'centre.gif' WHERE id = 1";

if ($conn->query($sql) === TRUE) {
    echo "Game reset successfully";
} else {
    echo "Error resetting game: " . $conn->error;
}

$sql1 = "UPDATE `pion` SET `valeur`='-1',`position`='HomeRouge' WHERE `id`='pion-red4'";
if ($conn->query($sql1) === TRUE) {
    echo "Game reset successfully";
} else {
    echo "Error resetting game: " . $conn->error;
}
$sql1 = "UPDATE `pion` SET `valeur`='-1',`position`='HomeRouge' WHERE `id`='pion-red3'";
if ($conn->query($sql1) === TRUE) {
    echo "Game reset successfully";
} else {
    echo "Error resetting game: " . $conn->error;
}
$sql1 = "UPDATE `pion` SET `valeur`='-1',`position`='HomeRouge' WHERE `id`='pion-red2'";
if ($conn->query($sql1) === TRUE) {
    echo "Game reset successfully";
} else {
    echo "Error resetting game: " . $conn->error;
}
$sql1 = "UPDATE `pion` SET `valeur`='-1',`position`='HomeRouge' WHERE `id`='pion-red1'";
if ($conn->query($sql1) === TRUE) {
    echo "Game reset successfully";
} else {
    echo "Error resetting game: " . $conn->error;
}
$sql1 = "UPDATE `pion` SET `valeur`='-1',`position`='HomeJaune' WHERE `id`='pion-jaune4'";
if ($conn->query($sql1) === TRUE) {
    echo "Game reset successfully";
} else {
    echo "Error resetting game: " . $conn->error;
}
$sql1 = "UPDATE `pion` SET `valeur`='-1',`position`='HomeJaune' WHERE `id`='pion-jaune3'";
if ($conn->query($sql1) === TRUE) {
    echo "Game reset successfully";
} else {
    echo "Error resetting game: " . $conn->error;
}
$sql1 = "UPDATE `pion` SET `valeur`='-1',`position`='HomeJaune' WHERE `id`='pion-jaune2'";
if ($conn->query($sql1) === TRUE) {
    echo "Game reset successfully";
} else {
    echo "Error resetting game: " . $conn->error;
}
$sql1 = "UPDATE `pion` SET `valeur`='-1',`position`='HomeJaune' WHERE `id`='pion-jaune1'";
if ($conn->query($sql1) === TRUE) {
    echo "Game reset successfully";
} else {
    echo "Error resetting game: " . $conn->error;
}


$conn->close();
?>
