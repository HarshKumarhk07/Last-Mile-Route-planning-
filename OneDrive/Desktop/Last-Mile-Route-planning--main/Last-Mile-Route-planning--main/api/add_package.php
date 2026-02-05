<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    if (!isset($_SESSION['user_id'])) {
        die("Unauthorized access. Please log in first.");
    }
    $user_id = $_SESSION['user_id']; // Logged-in user's ID
    $recipient_name = $_POST['recipient_name'];
    $pickup_point = $_POST['pickup_point'];  // Added pickup_point field
    $address = $_POST['address']; // Added status field
    $delivery_date = $_POST['delivery_date'];  // Added delivery_date field
    $delivery_time = $_POST['delivery_time'];  // Added delivery_time field

    // Connect to the database
    $conn = new mysqli("localhost", "root", "", "delivery_center_db");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Use a prepared statement for secure insertion
    $stmt = $conn->prepare("INSERT INTO packages (recipient_name, pickup_point, address, delivery_date, delivery_time, user_id) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssi", $recipient_name, $pickup_point, $address, $delivery_date, $delivery_time, $user_id);

    if ($stmt->execute()) {
        echo "Package added successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>