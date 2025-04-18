<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    $user_id = $_SESSION['user_id']; // Logged-in user's ID
    $recipient_name = $_POST['recipient_name'];
    $pickup_point = $_POST['pickup_point'];  // Added pickup_point field
    $address = $_POST['address']; // Added status field
    $delivery_date = $_POST['delivery_date'];  // Added delivery_date field
    $delivery_time = $_POST['delivery_time'];  // Added delivery_time field

    // Database connection
    $conn = new mysqli("localhost", "root", "", "delivery_center_db");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert data into the database
    $sql = "INSERT INTO packages (recipient_name, pickup_point, address, delivery_date, delivery_time, user_id) 
            VALUES ('$recipient_name', '$pickup_point', '$address', '$delivery_date', '$delivery_time', '$user_id')";

    if ($conn->query($sql) === TRUE) {
        echo "Package added successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>