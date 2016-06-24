<?php
include_once 'config.php';
 $update = new DB_CONN();
$id = $_GET['id'];
$quantity = $_GET["quantity"];

$response = $update->updateCart($id, $quantity);
if($response){
    echo $response;
}
