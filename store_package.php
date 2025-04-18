<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php'; // ✅ Include centralized DB connection

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    die("Unauthorized access. Please log in first.");
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $recipient_name = $_POST['recipient_name'];
    $address = $_POST['address'];
    $status = $_POST['status'];
    $pickup_point = $_POST['pickup_point'];  // Capture the pickup point
    $delivery_date = $_POST['delivery_date'];
    $delivery_time = $_POST['delivery_time'];
    $user_id = $_SESSION['user_id'];

    // Use a prepared statement to avoid SQL injection
    $stmt = $conn->prepare("INSERT INTO packages (recipient_name, address, pickup_point, status, delivery_date, delivery_time, user_id)
                            VALUES (?, ?, ?, ?, ?, ?, ?)");

    // Bind parameters to the SQL query
    $stmt->bind_param("sssssss", $recipient_name, $address, $pickup_point, $status, $delivery_date, $delivery_time, $user_id);

    // Execute the query and check for success
    if ($stmt->execute()) {
        echo "✅ New package record created successfully!";
    } else {
        echo "❌ Error: " . $stmt->error;
    }

    // Close the statement
    $stmt->close();
}

// Close the database connection
$conn->close();
?>
