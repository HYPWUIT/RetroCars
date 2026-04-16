<?php
require_once 'includes/init.php';

$result = $conn->query("SELECT id, name, surname, email FROM admins");

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode(['success' => true, 'data' => $users]);
?>