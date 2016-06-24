<?php
include_once 'config.php';

session_start();
$username = $_SESSION['username'];
$setDetail = new DB_CONN();
$setComment = new DB_CONN();

$data = json_decode(file_get_contents('php://input'));
$firstName = $data->firstName;
$lastName = $data->lastName;
$email= $data->email;
$phone = $data->phone;
$fax = $data->fax;
$company = $data->company;
$companyID = $data->companyID;
$address1 = $data->address1;
$address2 = $data->address2;
$city = $data->city;
$postCode = $data->postCode;
$country = $data->country;
$state = $data->state;
$response = $setDetail->setPersonalDetail($username,$firstName,$lastName,$email,$phone,$fax,$company,$companyID,$address1,$address2,$city,$postCode,$country,$state);
echo $response;
