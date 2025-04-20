<?php
include 'db.php'; // Ensure your database connection is included

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email']; // Get the email from form submission
    $password = $_POST['password']; // Get the password from form submission

    // Prepared statement to check if the user exists by email
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if user exists and validate password
    if ($row = $result->fetch_assoc()) {
        // Use password_verify() to check if the password matches the hashed password in the database
        if (password_verify($password, $row['password'])) {
            // If valid, store session variables and redirect to homepage/dashboard
            session_start();
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email'];

            // Redirect to the homepage/dashboard or any other page
            header('Location: homepage.html');
            exit();
        } else {
            // Invalid password
            echo "<script>alert('❌ Invalid password'); window.location.href='login.html';</script>";
        }
    } else {
        // User not found
        echo "<script>alert('❌ User not found'); window.location.href='login.html';</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
