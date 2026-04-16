<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$servername = "localhost";
$username = "root"; 
$password = "Zoro"; 
$dbname = "rc_expo_clients";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (!isset($_POST['email']) || !isset($_POST['password'])) {
    http_response_code(400);
    echo "Error: Email and password are required.";
    exit;
}

$email = $_POST['email'];
$password_plain = $_POST['password'];
$password_hashed = sha1($password_plain);

$stmt = $conn->prepare("SELECT * FROM event_clients WHERE email = ? AND password = ?");
$stmt->bind_param("ss", $email, $password_hashed);

$stmt->execute();
$result = $stmt->get_result();

if ($result === false) {
    // This can happen if the mysqlnd driver is not installed.
    http_response_code(500);
    echo "Error getting result from database.";
    exit;
}

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo "Login successful:" . $user['name'];
} else {
    // User does not exist
    echo "Invalid email or password";
}

$stmt->close();
$conn->close();
?>
