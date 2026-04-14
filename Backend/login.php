<?php
header("Access-Control-Allow-Origin: *");
// Database connection details
$servername = "localhost";
$username = "root"; // Or your database username
$password = "Zoro"; // Or your database password
$dbname = "rc_expo_clients";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from form
$email = $_POST['email'];
$password_plain = $_POST['password'];
$password_hashed = sha1($password_plain);

// Prepare and bind
$stmt = $conn->prepare("SELECT * FROM event_clients WHERE email = ? AND password = ?");
$stmt->bind_param("ss", $email, $password_hashed);

// Execute the statement
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
