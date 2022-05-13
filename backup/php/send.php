<?php
header( "Content-Type: application/json" );
header( "Access-Control-Allow-Origin:*" );
date_default_timezone_set('Europe/Paris');

if (!isset($_POST["point"])) {
    return;
}

$data[] = floatval($_POST['point']);
$file_name = 'results.json';

$inp = file_get_contents($file_name);
$tempArray = json_decode($inp);

$tempArray[] = $data;
$jsonData = json_encode($tempArray);

file_put_contents($file_name, $jsonData);