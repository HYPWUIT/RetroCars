<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root"; 
$password = "Zoro"; 
$dbname = "rc_expo_clients";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password_plain = $_POST['password'];
$password_hashed = sha1($password_plain);

$stmt = $conn->prepare("SELECT * FROM event_clients WHERE email = ? AND password = ?");
$stmt->bind_param("ss", $email, $password_hashed);

$stmt->execute();
$result = $stmt->get_result();

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
