<?php
include 'db.php'; // already starts session and connects to database

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $query = mysqli_real_escape_string($conn, $_POST['query']);
    $user_id = $_SESSION['user_id']; // from db.php session

    $sql = "INSERT INTO messages (user_id, name, email, query) VALUES ('$user_id', '$name', '$email', '$query')";

    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('Message sent successfully'); window.location.href='contactus.html';</script>";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>
