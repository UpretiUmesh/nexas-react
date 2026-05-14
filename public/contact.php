<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    $data = $_POST;
}

function field_value($data, $key) {
    return trim((string)($data[$key] ?? ''));
}

$name = field_value($data, 'name');
$email = field_value($data, 'email');
$company = field_value($data, 'company');
$budget = field_value($data, 'budget');
$service = field_value($data, 'service');
$message = field_value($data, 'message');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Name, email, and message are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$to = 'contact@codevora.in';
$subject = 'New website inquiry from ' . $name;

$bodyLines = [
    'New contact form submission',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Company: ' . ($company !== '' ? $company : 'Not provided'),
    'Budget: ' . ($budget !== '' ? $budget : 'Not provided'),
    'Service: ' . ($service !== '' ? $service : 'Not provided'),
    '',
    'Message:',
    $message,
];

$body = implode("\n", $bodyLines);

$safeName = str_replace(["\r", "\n"], '', $name);
$safeEmail = str_replace(["\r", "\n"], '', $email);

$headers = [
    'From: Codevora Website <no-reply@codevora.in>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail server failed to send the message.']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
