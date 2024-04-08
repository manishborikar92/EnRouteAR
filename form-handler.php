<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Validate form data (you can add more validation as needed)
    if (empty($name) || empty($email) || empty($message)) {
        // Handle empty fields
        echo "Please fill in all fields.";
    } else {
        // Send email (replace this with your actual email handling code)
        $to = "theodinproject0622@gmail.com";
        $subject = "Message from EnRouteAR Contact Form";
        $body = "Name: $name\nEmail: $email\n\n$message";

        // Use PHP's mail() function to send email
        if (mail($to, $subject, $body)) {
            // Email sent successfully
            echo "Your message has been sent successfully. We will get back to you shortly.";
        } else {
            // Email sending failed
            echo "Oops! Something went wrong. Please try again later.";
        }
    }
} else {
    // If form is not submitted, redirect back to the form page (you can customize the URL)
    header("Location: index.html");
}
?>