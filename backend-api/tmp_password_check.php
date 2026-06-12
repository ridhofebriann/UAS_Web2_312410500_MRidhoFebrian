<?php
$hash = '$2y$10$sIlhbVIpyTJf0GkLTDPbr.2U5Zzl6.VCwUYvR8.4xXy7mXzKTJwVi';
$password = 'admin123';
var_dump(password_verify($password, $hash));
