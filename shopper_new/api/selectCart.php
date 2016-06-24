<?php

include_once 'config.php';
//session_start();
//print_r($_GET);
//$username = $_SESSION['username'];
$username = $_GET['username'];
$select = new DB_CONN();
$records = [];
if (!empty($username)) {
    $response = $select->selectCart($username);
    if ($response && mysql_num_rows($response) > 0) {
        while ($row = mysql_fetch_assoc($response)) {
            $totalPrice = $row['quantity'] * $row['product_price'];
            $a_r = array("totalPrice" => $totalPrice);
            $row_1 = array_replace($row, $a_r);
            $records[] = $row_1;
        }
        echo(json_encode($records, TRUE));
    } else {
        $records[] = 'nothing';
        $records[] = ('Nothing in your cart. Please add something.');
        echo json_encode($records);
    }
} else {
    $records[] = 'nothing';
    $records[] = ('Nothing in your cart. Please add something.');
    echo json_encode($records);
}