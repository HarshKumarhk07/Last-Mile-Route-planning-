<?php
include 'db.php'; // Ensure your database connection is included

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate email
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('❌ Invalid email format'); window.location.href='/login.html';</script>";
        exit();
    }

    // Sanitize and validate password (e.g., at least 6 characters, allow A-Z, a-z, 0-9, and special characters)
    $password = trim($_POST['password']);
    if (!preg_match('/^[\w@#\-!$%^&*()+=]{4,}$/', $password)) {
        echo "<script>alert('❌ Invalid password format. Password must be at least 6 characters and contain valid characters.'); window.location.href='/login.html';</script>";
        exit();
    }

    // Prepared statement to check if the user exists by email
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if user exists and validate password
    if ($row = $result->fetch_assoc()) {
        // Use password_verify() to check if the password matches the hashed password in the database
        if (password_verify($password, $row['password'])) {
            // Start session and store user data
            session_start();
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email'];

            // Redirect to the homepage/dashboard or any other page
            header('Location: /homepage.html');
            exit();
        } else {
            echo "<script>alert('❌ Invalid password'); window.location.href='/login.html';</script>";
        }
    } else {
        echo "<script>alert('❌ User not found'); window.location.href='/login.html';</script>";
    }

    $stmt->close();
    $conn->close();
}
?>