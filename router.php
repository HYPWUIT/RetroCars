<?php
// router.php

// Get the requested URI and parse it
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Define the path to the document root
$root = __DIR__;
$requested_file = $root . $uri;

// Check if the requested file is a directory, if so, look for an index file
if (is_dir($requested_file)) {
    // You can add logic here to serve index.html or index.php from a directory
    // For now, we'll just fall back to the main index.html
    include_once $root . '/index.html';
    return;
}

// If the file exists and it's not a directory, serve it.
// This handles .php, .css, .js, image files, etc.
if (file_exists($requested_file)) {
    // The 'return false' tells the PHP built-in server to serve the request as-is.
    return false;
}

// If the file doesn't exist, it might be a client-side route.
// Serve the main index.html and let the client-side router handle it.
include_once $root . '/index.html';

?>