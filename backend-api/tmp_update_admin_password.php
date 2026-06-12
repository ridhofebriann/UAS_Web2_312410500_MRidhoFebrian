<?php
$mysqli = new mysqli('127.0.0.1', 'root', '', 'e_inventory');
if ($mysqli->connect_error) {
    echo 'CONNECT_ERR: ' . $mysqli->connect_error . PHP_EOL;
    exit(1);
}
$passwordHash = password_hash('admin123', PASSWORD_DEFAULT);
$sql = "UPDATE users SET password = '" . $mysqli->real_escape_string($passwordHash) . "' WHERE username = 'admin'";
if ($mysqli->query($sql)) {
    echo 'UPDATED: ' . $mysqli->affected_rows . ' row(s)'. PHP_EOL;
} else {
    echo 'QUERY_ERR: ' . $mysqli->error . PHP_EOL;
}
