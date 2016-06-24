<?php
include_once 'config.php';
$delete = new DB_CONN(); 
$id= $_GET['id'];
$response = $delete->deleteCart($id);
echo $response;
 
