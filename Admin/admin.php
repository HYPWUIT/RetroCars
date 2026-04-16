<?php

$valid_user = 'ilie';
$valid_pass = 'admin';


$user_provided = isset($_SERVER['PHP_AUTH_USER']);
$pass_provided = isset($_SERVER['PHP_AUTH_PW']);

if (!$user_provided || !$pass_provided || ($_SERVER['PHP_AUTH_USER'] != $valid_user) || ($_SERVER['PHP_AUTH_PW'] != $valid_pass)) {

    header('WWW-Authenticate: Basic realm="Admin Area"');
    header('HTTP/1.0 401 Unauthorized');
    
    echo '<h1>Access Denied</h1><p>You must enter a valid username and password to access this area.</p>';
    exit;
}

include 'admin.html';
?>
