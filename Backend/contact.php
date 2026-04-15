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

// Get data from 
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Check if email already exists
$stmt_check = $conn->prepare("SELECT gmail FROM contacts WHERE gmail = ?");
$stmt_check->bind_param("s", $email);
$stmt_check->execute();
$stmt_check->store_result();

if ($stmt_check->num_rows > 0) {
    echo "A user with this email is already registered";
    $stmt_check->close();
} else {
    $stmt_check->close();
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO contacts (gmail, message, name) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $message, $name);

    // Execute the statement
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}

$conn->close();
?>
