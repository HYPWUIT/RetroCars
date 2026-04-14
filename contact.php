<?php
// Database connection details
$servername = "localhost";
$username = "root"; // Or your database username
$password = ""; // Or your database password
$dbname = "rc_expo_clients";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from form
$email = $_POST['email'];
$message = $_POST['message'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO contacts (gmail, message) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $message);

// Execute the statement
if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
