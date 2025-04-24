<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = "localhost";
$username = "root";
$password = "";
$database = "delivery_center_db";

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$message = "";
$token = isset($_GET['token']) ? $_GET['token'] : '';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $new_password = $_POST['new_password'];
    $confirm_password = $_POST['confirm_password'];
    $token = $_POST['token'];

    if ($new_password === $confirm_password) {
        // Check if token exists and is not expired
        $stmt = $conn->prepare("SELECT id FROM users WHERE reset_token = ? AND token_expiry > NOW()");
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $user_id = $row['id'];

            // Update password and clear reset token
            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
            $update = $conn->prepare("UPDATE users SET password = ?, reset_token = NULL, token_expiry = NULL WHERE id = ?");
            $update->bind_param("si", $hashed_password, $user_id);
            
            if ($update->execute()) {
                $message = "<p class='text-green-500'>Password successfully updated! <a href='login.php' class='text-blue-500 hover:underline'>Click here to login</a></p>";
            } else {
                $message = "<p class='text-red-500'>Error updating password.</p>";
            }
        } else {
            $message = "<p class='text-red-500'>Invalid or expired token.</p>";
        }
    } else {
        $message = "<p class='text-red-500'>Passwords do not match.</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Set New Password</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 class="text-2xl font-bold mb-6 text-center">Set New Password</h1>
        
        <?php echo $message; ?>

        <?php if (!$message || strpos($message, 'do not match') !== false || strpos($message, 'Invalid or expired token') !== false): ?>
        <form method="POST" action="set_new_password.php" class="space-y-4">
            <input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">
            
            <div>
                <label for="new_password" class="block text-sm font-medium text-gray-700">New Password</label>
                <input type="password" id="new_password" name="new_password" required 
                       autocomplete="new-password"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
                <label for="confirm_password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" id="confirm_password" name="confirm_password" required 
                       autocomplete="new-password"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <button type="submit" 
                    class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Set New Password
            </button>
        </form>
        <?php endif; ?>
    </div>
</body>
</html>
