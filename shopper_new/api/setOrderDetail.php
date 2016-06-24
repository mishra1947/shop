<?php

include_once 'config.php';
session_start();
$data = json_decode(file_get_contents('php://input'));

//print_r($data);die;
$item_name = "cloths";
$item_number = $data->item_number;
$userid = $data->user_id;
$comment = $data->comment;
/*get total payable amount*/
$select = new DB_CONN();
$records = [];
$totalAmount = 0;
if (!empty($userid)) {
    $response = $select->selectCart($userid);
    if ($response && mysql_num_rows($response) > 0) {
        while ($row = mysql_fetch_assoc($response)) {
            $totalPrice = $row['quantity'] * $row['product_price'];
            $a_r = array("totalPrice" => $totalPrice);
            $row_1 = array_replace($row, $a_r);
            $records[] = $row_1;
        }

        foreach ($records as $key => $value) {
            $totalAmount = $totalAmount + $value['totalPrice'];
        }
    }
}
$amount = $totalAmount+17+2;

$setOrderDetail = new DB_CONN();
if (!empty($userid)){
    $result = $setOrderDetail->setOrderDetail($userid, $item_number,$item_name,$amount,$comment);
    if($result){
        $_SESSION['price'] = $amount;
        echo 'order detailes are saved';
        
    }
}


