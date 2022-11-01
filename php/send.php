<?php
$pass = $_POST['password'];
$email = $_POST['email'];
$pass = htmlspecialchars($pass);
$email = htmlspecialchars($email);
$pass = urldecode($pass);
$email = urldecode($email);
$pass = trim($pass);
$email = trim($email);

mail(".$email.", "Сгенерированный пароль", "Пароль:".$pass.". E-mail: ".$email ,"From: murad.losangeles@gmail.com \r\n");
