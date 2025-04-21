<?php
include 'db.php'; // Make sure the connection is correctly included

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];  // This is where the username is collected
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Check if the passwords match
    if ($password !== $confirm_password) {
        echo "<script>alert('❌ Passwords do not match'); window.location.href='signup.html';</script>";
        exit();
    }

    // Hash the password before storing it (using bcrypt for better security)
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Prepared statement to check if username already exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // If username already exists, show an error
    if ($result->num_rows > 0) {
        echo "<script>alert('❌ Username already taken. Please choose another username.'); window.location.href='signup.html';</script>";
        exit();
    }

    // Prepared statement to check if email already exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // If email already exists, show an error
    if ($result->num_rows > 0) {
        echo "<script>alert('❌ Email already registered'); window.location.href='signup.html';</script>";
        exit();
    }

    // If username and email do not exist, insert new user
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param('sss', $username, $email, $hashed_password);

    if ($stmt->execute()) {
        // Redirect to login page after successful signup
        echo "<script>alert('✔️ Registration successful!'); window.location.href='login.html';</script>";
    } else {
        echo "<script>alert('❌ Error registering user'); window.location.href='signup.html';</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
