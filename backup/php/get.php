<?php
header( "Content-Type: application/json" );
header( "Access-Control-Allow-Origin:*" );
date_default_timezone_set('Europe/Paris');

$file_name = "results.json";
$json = file_get_contents($file_name);

echo $json;

