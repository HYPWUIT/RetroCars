<?php
session_start();

require_once "includes/db.php";

$public_pages = ['login.php'];
$current_page = basename($_SERVER['PHP_SELF']);

if (!isset($_SESSION['admin_id']) && !in_array($current_page, $public_pages)) {
    header('Location: login/login.php');
    exit;
}
?>
