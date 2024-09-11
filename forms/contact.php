<?php

use PhpEmailForm\PhpEmailForm;

// Configuration
$receivingEmail = 'muazfethi46@gmail.com';

// Load the PHP Email Form library
$phpEmailFormPath = '../assets/vendor/php-email-form/php-email-form.php';
if (file_exists($phpEmailFormPath)) {
    require_once $phpEmailFormPath;
} else {
    die('Unable to load the "PHP Email Form" Library!');
}

// Initialize the email form
$contact = new PhpEmailForm();

// Set the email properties
$contact->ajax = true;
$contact->to = $receivingEmail;
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];
$contact->subject = $_POST['subject'];
$contact->message = $_POST['message'];
$contact->invalid_to_email = 'Email to (receiving email address) is empty or invalid!';

// Validate honeypot field
if (!empty($_POST['first_name'])) {
    die('Spam detected.');
}

// Validate privacy acceptance
if ($_POST['privacy'] != 'accept') {
    die('Please, accept our terms of service and privacy policy.');
}

// Add messages
$contact->add_message($_POST['name'], 'From');
$contact->add_message($_POST['email'], 'Email');
$contact->add_message($_POST['message'], 'Message', 10);

// Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
/*
$contact->smtp = array(
  'host' => 'example.com',
  'username' => 'example',
  'password' => 'pass',
  'port' => '587'
);
*/

// Set CC and BCC
$contact->cc = array('muazfeth46@gmail.com', 'muazfethi46@example.com');
$contact->bcc = array('muazfethiahmed10@gmail.com', 'muazfethiahmed10@gmail.com');

// Add attachments (ensure the method exists)
if (method_exists($contact, 'add_attachment')) {
    $contact->add_attachment('resume', 20, array('pdf', 'doc', 'docx', 'rtf'));
}

// Send the email
echo $contact->send();

?>