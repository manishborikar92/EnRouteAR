<?php
// Specify the recipient email address
$recipient_email = "your_email@example.com";

// Check if form data is submitted via GET method
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Get form data from query parameters
    $name = $_GET["name"];
    $email = $_GET["email"];
    $message = $_GET["message"];

    // Validate form data (you can add more validation as needed)
    if (empty($name) || empty($email) || empty($message)) {
        // Handle empty fields
        echo "Please fill in all fields.";
    } else {
        // Send email
        $subject = "Message from EnRouteAR Contact Form";
        $body = "Name: $name\nEmail: $email\n\n$message";

        // Send email using PHP's mail() function
        if (mail($recipient_email, $subject, $body)) {
            // Email sent successfully
            echo "Your message has been sent successfully. We will get back to you shortly.";
        } else {
            // Email sending failed
            echo "Oops! Something went wrong. Please try again later.";
        }
    }
} else {
    // If form data is not submitted via GET method, display an error message
    echo "Form submission method not allowed.";
}
?>
