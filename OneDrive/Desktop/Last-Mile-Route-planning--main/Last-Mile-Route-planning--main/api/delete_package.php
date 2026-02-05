<?php
// delete_package.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Only start session if it hasn't been started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

include 'db.php';

if (!isset($_SESSION['user_id'])) {
    die("Unauthorized access. Please log in first.");
}
$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['package_id'])) {
    $package_id = $_POST['package_id'];
    // Only delete if the package belongs to the logged-in user
    $stmt = $conn->prepare("DELETE FROM packages WHERE id = ? AND user_id = ?");
    $stmt->bind_param('ii', $package_id, $user_id);
    if ($stmt->execute()) {
        echo "Package deleted successfully!";
    } else {
        echo "Error deleting package: " . $stmt->error;
    }
    $stmt->close();
}
$conn->close();
?>
