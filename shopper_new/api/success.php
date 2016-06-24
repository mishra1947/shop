<?php

include_once 'config.php';
session_start();
$setPaymentDetails = new DB_CONN();
$deleteCart = new DB_CONN();
$username = $_SESSION['username'];
$price = $_SESSION['price'];
$currency = 'USD';
//these all are returned from paypal.
$data = json_decode(file_get_contents('php://input'));
$payment_type = $data->paymentType;
$order_number = $data->order_number;

/* for debit credit card payment */
if ($payment_type !== "COD" || $payment_type === null || $payment_type === '') {
    $item_no = $_REQUEST['item_number'];
    $transaction_id = $_REQUEST['tx']; // Paypal transaction ID
    $item_price = $_REQUEST['amt']; // Paypal received amount
    $item_currency = $_REQUEST['cc']; // Paypal received currency type
    $payment_status = $_REQUEST['st']; // Paypal payment status type
//Rechecking the product price and currency details
    if ($item_price == $price && $item_currency == $currency && !empty($transaction_id)) {
        $payment_type = 'card payment';
        if (!empty($username)) {
            $response = $setPaymentDetails->setPaymentDetails($username, $item_no, $item_price, $item_currency, $payment_status, $transaction_id, $payment_type);
            if ($response) {
                $delete_response = $deleteCart->removeUserCart($username);
                if ($delete_response) {
                    $time = date("h:i:sa");
                } else {
                    echo 'error';
                }
            }
        } else {
            echo "Payment Failed";
        }
    }

    $title = 'Payment Receipt';
    include('../views/payment_reciept.inc');
} else if ($payment_type === "COD") {
    $item_no = $order_number;
    $item_price = $price;
    $item_currency = $currency;
    $payment_status = "cash on delivery";
    $transaction_id = 'not applicable';
    $payment_type = $payment_type;
    $response = $setPaymentDetails->setPaymentDetails($username, $item_no, $item_price, $item_currency, $payment_status, $transaction_id, $payment_type);
    if ($response) {
        $delete_response = $deleteCart->removeUserCart($username);
        if ($delete_response) {
            $time = date("h:i:sa");
            echo json_encode(array("status"=>"success", "message"=>"We received your order of $".$item_price." successfully. Your order number is ".$item_no."."));
        } else {
            echo json_encode(array("status"=>"failure", "message"=>"Please try again"));
        }
    }
}
?>