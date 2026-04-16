<?php
header('Content-Type: application/json');
require_once 'includes/db.php';

$sql = "SELECT id, gmail, message, name FROM contacts";
$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
    $conn->close();
    exit();
}

$contacts = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $contacts[] = $row;
    }
}

echo json_encode($contacts);

$conn->close();
?>
