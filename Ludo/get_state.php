<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ludo_db";

// Création de la connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fonction pour récupérer l'état du jeu
function getGameState($conn) {
    $sql = "SELECT dice, player1, player2, nbP1, nbP2, centre FROM game_state WHERE id=1";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // Récupération de la première ligne de résultats
        return $result->fetch_assoc();
    } else {
        return null;
    }
}

// Fonction pour récupérer les positions des pions
function getPions($conn, $color) {
    $sql = "SELECT id, position, valeur FROM pion WHERE color=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $color);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $pions = [];
    while ($row = $result->fetch_assoc()) {
        $pions[] = $row;
    }
    $stmt->close();
    return $pions;
}

// Récupération de l'état du jeu et des positions des pions
$gameState = getGameState($conn);
$redPions = getPions($conn, 'red');
$yellowPions = getPions($conn, 'yellow');

// Fermeture de la connexion à la base de données
$conn->close();

// Mise en forme des données à retourner sous forme JSON
$data = [
    'gameState' => $gameState,
    'redPions' => $redPions,
    'yellowPions' => $yellowPions
];

// Envoi des données JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
