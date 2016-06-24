<?php
define("db_server", "localhost");
define("db_user", "root");
define("db_pass", "india@123");
define("db_name", "shoper");

class DB_CONN
{
  function __construct() {
      $conn = mysql_connect(db_server,db_user,db_pass) or die('localhost connection problem'.mysql_error());
      mysql_select_db(db_name, $conn);
  }  
  
  function insertUser($uname,$email,$pass){
      $result = mysql_query("INSERT shoper_registration(username,email,password) VALUES('$uname','$email','$pass')");
      return $result;
  }
  
  function selectUser($in_username,$in_pass){
      $result = mysql_query("SELECT username,email FROM shoper_registration WHERE username ='".$in_username."' AND password ='$in_pass'");
      return $result; 
  }
  
  function insertCart($username,$quantity, $producType,$product_id,$product_image,$product_title,$product_category,$product_price,$product_brand,$product_code,$product_reward_points,$product_availability,$totalPrice){
      $result = mysql_query("INSERT shoper_cart(username, quantity, producType,product_id,product_image,product_title,product_category,product_price,product_brand,product_code,product_reward_points,product_availability,totalPrice) VALUES('$username','$quantity', '$producType','$product_id','$product_image','$product_title','$product_category','$product_price','$product_brand','$product_code','$product_reward_points','$product_availability','$totalPrice')");
      return $result;
  }
  
  function selectCart($username){
      $result = mysql_query("SELECT * FROM shoper_cart WHERE username='" . $username . "'");
      return $result;
  }
  
  function deleteCart($id){
      $result = mysql_query("DELETE FROM shoper_cart WHERE id = $id");
      return $result;
  }
  function updateCart($id,$quantity){
      $result = mysql_query("UPDATE shoper_cart SET quantity = $quantity WHERE id = $id");
      return $result;
  }
  function checkUser($username){
      $result =mysql_query ("SELECT email,username FROM shoper_registration WHERE username = '" . $username . "'");
      return $result;
  }
  function setPersonalDetail($username,$firstName,$lastName,$email,$phone,$fax,$company,$companyID,$address1,$address2,$city,$postCode,$country,$state){
      $result = mysql_query("INSERT shoper_user_address_detail(username,firstName,lastName,email,phone,fax,company,companyID,address1,address2,city,postCode,country,state)"
              . " VALUES('$username','$firstName','$lastName','$email','$phone','$fax','$company','$companyID','$address1','$address2','$city',$postCode,'$country','$state')");
      return $result;
  }
  function checkAddress($username){
      $result =mysql_query ("SELECT username FROM shoper_user_address_detail WHERE username = '" . $username . "'");
      return $result;
  }
  function updatePersonalDetail($username,$firstName,$lastName,$email,$phone,$fax,$company,$companyID,$address1,$address2,$city,$postCode,$country,$state){
      $result = mysql_query("UPDATE shoper_user_address_detail SET firstName = '" . $firstName . "',lastName = '" . $lastName . "',email = '" . $email . "',phone = '$phone' ,fax = '" . $fax . "',company = '" . $company . "',companyID = '" . $companyID . "',address1 = '" . $address1 . "',address2 = '" . $address2 . "',city = '" . $city . "',postCode =  $postCode ,country = '" . $country . "',state = '" . $state . "' WHERE username = '" . $username . "'");
      return $result;
  }
  function setOrderDetail($userid, $item_number,$item_name,$amount,$comment){
      $result = mysql_query("INSERT INTO shoper_user_orders(userid, item_number, item_name, amount, comment) VALUES ('$userid','$item_number','$item_name', '$amount', '$comment')");
      return $result;
  }
  function getOrderDetail($userid,$item_number){
      $result = mysql_query("SELECT * FROM shoper_user_orders WHERE  userid = '" .$userid . "' AND item_number = $item_number");
      return $result;
  }
  function setPaymentDetails($username,$item_no,$item_price,$item_currency,$payment_status,$transaction_id, $payment_type){
      $result = mysql_query("INSERT INTO shoper_payment_details(username, item_number, amount, currency, payment_status, transaction_id, payment_type) VALUES ('$username','$item_no','$item_price','$item_currency','$payment_status','$transaction_id','$payment_type')");
      return $result;
  }
  /* delete catr after payment */
  function removeUserCart($username){
      $result = mysql_query("DELETE FROM shoper_cart WHERE username = '". $username. "'");
      return $result;
  }
}

