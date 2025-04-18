<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "delivery_center_db"; // A single database for all users

// Start the session to get the logged-in user
session_start();
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0; // Assuming user_id is stored in the session

// Create a connection to the shared database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Now you can interact with the common table `delivery_details` filtered by `user_id`
?>
