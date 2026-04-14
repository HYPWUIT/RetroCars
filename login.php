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
$email = $_POST['email'];
// Note: No password check is performed as there is no password column in the database.
// This is insecure and should be fixed by adding a password column to the event_clients table.

// Prepare and bind
$stmt = $conn->prepare("SELECT * FROM event_clients WHERE email = ?");
$stmt->bind_param("s", $email);

// Execute the statement
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User exists
    echo "Login successful";
} else {
    // User does not exist
    echo "Invalid email or password";
}

$stmt->close();
$conn->close();
?>
