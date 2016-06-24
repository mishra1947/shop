<?php
include_once '../api/config.php';
session_start();
$userid = $_SESSION['username'];
$item_number = $_SERVER['QUERY_STRING'];
$orderDetails = new DB_CONN();
$response = $orderDetails->getOrderDetail($userid, $item_number);
if ($response && mysql_num_rows($response) > 0){
    $row = mysql_fetch_assoc($response);
}
$item_name = $row['item_name'];
$amount = $row['amount'];
$paypal_url='https://www.sandbox.paypal.com/cgi-bin/webscr'; // Test Paypal API URL
$paypal_id='mishrasriniwas2-facilitator@gmail.com'; // Business email ID

?>
<!document>
<head>
    
</head>
<style>
body
{
    font: bold 14px arial;
}
.product
{
    float: left;
    margin-right: 10px;
    border: 1px solid #cecece;
    padding: 10px;
    margin-right: 20px;
}
</style>
<div style="margin:50px">
    <h3>Pay with payPal</h3>
<!--    <h3><a href=" https://developer.paypal.com/" target="_blank"> https://developer.paypal.com/</a></h3>-->
</div>
<h4>Welcome, User</h4>

<div class="product">            
    <div class="image">
        <img src="http://shopper.com/themes/images/pageBanner.png" />
    </div>
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    <div class="name">
        <?php echo $item_name ?> Payment
    </div>
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;&nbsp;
    &nbsp;
    <div class="price">
        Price: $<?php echo $amount ?>
    </div>
    <div class="btn">
    <form action="<?php echo $paypal_url ?>" method="post" name="frmPayPal1">
    <input type="hidden" name="business" value="<?php echo $paypal_id ?>">
    <input type="hidden" name="cmd" value="_xclick">
    <input type="hidden" name="item_name" value="<?php echo $item_name ?>">
    <input type="hidden" name="item_number" value="<?php echo $item_number ?>">
    <input type="hidden" name="credits" value="510">
    <input type="hidden" name="userid" value="<?php echo $userid ?>">
    <input type="hidden" name="amount" value="<?php echo $amount ?>">
    <input type="hidden" name="cpp_header_image" value="http://shopper.com/themes/images/pageBanner.png">
    <input type="hidden" name="no_shipping" value="1">
    <input type="hidden" name="currency_code" value="USD">
    <input type="hidden" name="handling" value="0">
    <input type="hidden" name="cancel_return" value="http://demo.phpgang.com/payment_with_paypal/cancel.php">
    <input type="hidden" name="return" value="http://shopper.com/api/success.php">
    <input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
    <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">
    </form> 
    </div>
</div>

<?php
//$title = "PayPal Payment in PHP";
//$heading = "Welcome to PayPal Payment PHP example.";
//include('html.inc');
//?>
