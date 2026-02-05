<?php
// update_package.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Only start session if it hasn't been started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['user_id'])) {
        die("Unauthorized access. Please log in first.");
    }

    // Validate inputs
    if (!isset($_POST['id']) || !isset($_POST['status'])) {
        die("Missing required parameters");
    }

    $id = intval($_POST['id']);
    $status = $_POST['status'];
    $user_id = $_SESSION['user_id'];

    // Validate status
    $allowed_statuses = ['Pending', 'In Transit', 'Delivered'];
    if (!in_array($status, $allowed_statuses)) {
        die("Invalid status. Must be one of: " . implode(", ", $allowed_statuses));
    }

    // Update the package status
    $stmt = $conn->prepare("UPDATE packages SET status = ? WHERE id = ? AND user_id = ?");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param('sii', $status, $id, $user_id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo "Package status updated successfully!";
        } else {
            echo "No package found with that ID for this user.";
        }
    } else {
        echo "Error updating package: " . $stmt->error;
    }
    
    $stmt->close();
    $conn->close();
} else {
    die("Invalid request method");
}
?>
