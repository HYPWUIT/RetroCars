<?php
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
$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['email'];
$ticket_type = 'Standard'; // Default ticket type

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO event_clients (name, surname, email, ticket_type) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $surname, $email, $ticket_type);

// Execute the statement
if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
