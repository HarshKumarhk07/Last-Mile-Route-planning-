<?php
// view_packages.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php'; // Include the database connection file

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    die("Unauthorized access. Please log in first.");
}

// Get the logged-in user's ID from the session
$user_id = $_SESSION['user_id'];

// Query to fetch the packages for the logged-in user
$sql = "SELECT * FROM packages WHERE user_id = ?";
$stmt = $conn->prepare($sql);

// Bind the user_id parameter to the query
$stmt->bind_param("i", $user_id);

// Execute the query
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Check if there are any packages
if ($result->num_rows > 0) {
    // Display the packages
    while ($row = $result->fetch_assoc()) {
        echo "<div class='package'>";
        echo "<p><strong>Recipient Name:</strong> " . htmlspecialchars($row['recipient_name']) . "</p>";
        echo "<p><strong>Address:</strong> " . htmlspecialchars($row['address']) . "</p>";
        echo "<p><strong>Pickup Point:</strong> " . htmlspecialchars($row['pickup_point']) . "</p>";
        echo "<p><strong>Status:</strong> " . htmlspecialchars($row['status']) . "</p>";
        echo "<p><strong>Delivery Date:</strong> " . htmlspecialchars($row['delivery_date']) . "</p>";
        echo "<p><strong>Delivery Time:</strong> " . htmlspecialchars($row['delivery_time']) . "</p>";
        echo "</div><hr>";
    }
} else {
    echo "No packages found.";
}

// Close the statement
$stmt->close();

// Close the database connection
$conn->close();
?>
