<?php
$servername = getenv('DB_HOST') ?: "localhost";
$username = getenv('DB_USER') ?: "root";
$password = getenv('DB_PASSWORD') ?: "";
$dbname = getenv('DB_NAME') ?: "delivery_center_db";

// Using standard PHP sessions. Note: In Vercel serverless, sessions might not persist reliably across requests 
// unless using a persistent store (all servers are stateless). 
// For a college project, this might pass if traffic is low/single instance, but usually requires a redis/database for sessions.
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Ensure proper character encoding
$conn->set_charset("utf8");
?>
