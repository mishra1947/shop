<?php
include_once 'config.php';
session_start();
$username = $_SESSION['username'];
$insert = new DB_CONN();
$data = json_decode(file_get_contents('php://input'));
//print_r($data);die;
$quantity = $data->quantity;
$productDetail = $data->productDetail;
$producType = $data->producType;
$totalPrice = $data->totalPrice;
$product_id = $productDetail->id;
$product_image = $productDetail->image;
$product_title = $productDetail->title;
$product_category = $productDetail->category;
$product_price = $productDetail->price;
$product_brand = $productDetail->Brand;
$product_code = $productDetail->product_code;
$product_reward_points = $productDetail->reward_points;
$product_availability = $productDetail->Availability;
if(!empty($username)){
$response = $insert->insertCart($username,$quantity, $producType,$product_id,$product_image,$product_title,$product_category,$product_price,$product_brand,$product_code,$product_reward_points,$product_availability,$totalPrice);
echo json_encode(array('status'=>'login'));
}else {
    echo json_encode(array('status'=>'not_login','msg'=>'Please Login first'));
}