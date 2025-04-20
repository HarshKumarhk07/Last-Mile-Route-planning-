<?php
// update_package.php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $status = $_POST['status'];

    if (!isset($_SESSION['user_id'])) {
        die("Unauthorized access. Please log in first.");
    }
    $user_id = $_SESSION['user_id'];

    $conn = new mysqli("localhost", "root", "", "delivery_center_db");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("UPDATE packages SET status=? WHERE id=? AND user_id=?");
    $stmt->bind_param('sii', $status, $id, $user_id);
    if ($stmt->execute()) {
        echo "Package status updated successfully!";
    } else {
        echo "Error updating package: " . $stmt->error;
    }
    $stmt->close();

    $conn->close();
}
?>
