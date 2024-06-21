<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ludo_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$dice_value = $_POST['dice_value'];
$etat_centre = $_POST['centre_etat'];
$nbP1_etat = $_POST['nbP1_sortie'];
$nbP2_etat = $_POST['nbP2_sortie'];
$red_positionsStr = $_POST['red_positions'];
$yellow_positionsStr = $_POST['yellow_positions'];
$etat_player1 = (string) $_POST['player1_etat'];
$etat_player2 = (string) $_POST['player2_etat'];

// Préparation de la requête avec des placeholders
$sql = "UPDATE game_state SET 
    dice=?, 
    player1=?, 
    player2=?, 
    nbP1=?, 
    nbP2=?, 
    centre=? 
WHERE id=1";

// Préparation de la déclaration
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    die("Error preparing statement: " . $conn->error);
}

// Liaison des variables aux placeholders
$stmt->bind_param("issiis", $dice_value, $etat_player1, $etat_player2, $nbP1_etat, $nbP2_etat, $etat_centre);

// Exécution de la déclaration
if ($stmt->execute() === TRUE) {
    echo "Game reset successfully";
} else {
    echo "Error resetting game: " . $stmt->error;
}

// Fonction pour mettre à jour les pions
function updatePions($conn, $positionsStr) {
    $positions = explode('|', $positionsStr);
    $stmt = $conn->prepare("UPDATE pion SET valeur=?, position=? WHERE id=?");

    if ($stmt === false) {
        die("Error preparing statement: " . $conn->error);
    }

    foreach ($positions as $elementStr) {
        list($id, $parentID, $value) = explode(',', $elementStr);

        // Debugging output
        echo "Updating pion with ID: $id, Parent ID: $parentID, Value: $value<br>";

        $stmt->bind_param("iss", $value, $parentID, $id);

        if ($stmt->execute() === TRUE) {
            echo "Record updated successfully for ID: $id<br>";
        } else {
            echo "Error updating record for ID: $id - " . $stmt->error . "<br>";
        }
    }

    $stmt->close();
}


function updatePions2($conn, $positionsStr) {
    $positions = explode('|', $positionsStr);
    $stmt = $conn->prepare("UPDATE pion SET position=?, valeur=? WHERE id=?");

    if ($stmt === false) {
        die("Error preparing statement: " . $conn->error);
    }

    foreach ($positions as $elementStr) {
        list($id, $parentID, $value) = explode(',', $elementStr);

        // Debugging output
        echo "Updating pion with ID: $id, Parent ID: $parentID, Value: $value<br>";

        $stmt->bind_param("sis", $value, $parentID, $id);

        if ($stmt->execute() === TRUE) {
            echo "Record updated successfully for ID: $id<br>";
        } else {
            echo "Error updating record for ID: $id - " . $stmt->error . "<br>";
        }
    }

    $stmt->close();
}





// Mettre à jour les pions rouges
updatePions2($conn, $red_positionsStr);

// Mettre à jour les pions jaunes
updatePions2($conn, $yellow_positionsStr);

$conn->close();
?>
