<?php

//Database connection parameters
$servername = "localhost";
$username = "root";
$password = "Zoro";
$dbname = "rc_expo_clients";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>