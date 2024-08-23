<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = 'muazfethi46@gmail.com';
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    if (!empty($name) && !empty($email) && !empty($subject) && !empty($message)) {
        $headers = "From: $name <$email>\r\n";
        
        if (mail($to, $subject, $message, $headers)) {
            echo 'Email sent successfully!';
        } else {
            echo 'Failed to send email.';
        }
    } else {
        echo 'All fields are required.';
    }
}
?>