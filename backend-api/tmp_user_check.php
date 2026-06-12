<?php
$mysqli = new mysqli('127.0.0.1', 'root', '', 'e_inventory');
if ($mysqli->connect_error) {
    echo 'CONNECT_ERR: ' . $mysqli->connect_error . PHP_EOL;
    exit(1);
}

$res = $mysqli->query('SELECT id, username, password, email, role FROM users LIMIT 5');
if (!$res) {
    echo 'QUERY_ERR: ' . $mysqli->error . PHP_EOL;
    exit(1);
}

while ($row = $res->fetch_assoc()) {
    echo json_encode($row) . PHP_EOL;
}
