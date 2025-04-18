<?php
// delete_package.php
error_reporting(E_ALL);
ini_set('display_errors', 1);
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $conn = new mysqli("localhost", "root", "", "delivery_center_db");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "DELETE FROM packages WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo "Package deleted successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
