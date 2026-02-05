<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"];

    // Check if user exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 1) {
        // Generate token
        $token = bin2hex(random_bytes(16));
        $expiry = date("Y-m-d H:i:s", strtotime('+1 hour'));

        // Store token in DB
        $update = $conn->prepare("UPDATE users SET reset_token = ?, token_expiry = ? WHERE email = ?");
        $update->bind_param("sss", $token, $expiry, $email);
        $update->execute();

        // Simulate email (display link)
        echo "<div style='padding:20px; font-family: Arial;'>";
        echo "<h2>Reset Link (Simulated Email)</h2>";
        echo "<p><a href='/api/set_new_password.php?token=$token'>Click here to reset your password</a></p>";
        echo "<p>Token valid for 1 hour.</p>";
        echo "</div>";
    } else {
        echo "<p style='color:red;'>No user found with that email address.</p>";
    }
}
?>