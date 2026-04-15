<?php
header("Access-Control-Allow-Origin: *");
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root"; // Or your database username
$password = "Zoro"; // Or your database password
$dbname = "rc_expo_clients";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if (!isset($_POST['name']) || !isset($_POST['surname']) || !isset($_POST['email']) || !isset($_POST['password'])) {
    die("Error: Form data not received correctly.");
}

$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['email'];
$password_plain = $_POST['password'];
$password_hashed = sha1($password_plain);
$ticket_type = 'Standard'; 


// Check if email already exists
$stmt_check = $conn->prepare("SELECT email FROM event_clients WHERE email = ?");
if ($stmt_check === false) {
    die("Error preparing statement: " . $conn->error);
}
$stmt_check->bind_param("s", $email);
$stmt_check->execute();
$stmt_check->store_result();

if ($stmt_check->num_rows > 0) {
    echo "A user with this email is already registered";
} else {
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
}

$stmt_check->close();
$conn->close();
?>
