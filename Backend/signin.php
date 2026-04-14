<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

// Check if form data is received
if (!isset($_POST['name']) || !isset($_POST['surname']) || !isset($_POST['email']) || !isset($_POST['password'])) {
    die("Error: Form data not received correctly.");
}

// Get data from form
$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['email'];
$password_plain = $_POST['password'];
$password_hashed = sha1($password_plain);
$ticket_type = 'Standard'; // Default ticket type

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO event_clients (name, surname, email, password, ticket_type) VALUES (?, ?, ?, ?, ?)");
if ($stmt === false) {
    die("Error preparing statement: " . $conn->error);
}

$stmt->bind_param("sssss", $name, $surname, $email, $password_hashed, $ticket_type);

// Execute the statement
if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error executing statement: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
