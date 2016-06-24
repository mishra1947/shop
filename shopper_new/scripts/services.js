'use strict';

angular.module('shopingApp')
            /* for homepage */
        .service('homeFactory', ['$resource', 'baseURL', 'apiURL', function ($resource, baseURL, apiURL) {
               //returns a  Feature Products.
                this.getFeatureProducts = function () {
                    return $resource(baseURL + "featureProducts/:id", null, {'get': {method: 'GET'}});
                };

                
                //returns a  Latest Products.
                this.getLatestProducts = function () {
                    return $resource(baseURL + "latestProducts/:id", null, {'get': {method: 'GET'}});
                };
                
                this.getAllProducts = function() {
                    return $resource(baseURL+":type/:id", null,  {'get': {method: 'GET'}});
                };
                
                this.setCart = function(){
                    //return $resource(baseURL+"Cart", null,  {'save': {method: 'POST'}});
                    return $resource(apiURL+"cart.php", null,  {'save': {method: 'POST'}});
                };

            }])
        /* for registraion page */
        .service('registerFactory', ['$resource', 'apiURL', function($resource,apiURL){
                this.registerUserDetail = function(){
                    return $resource(apiURL+"registration.php", null, {'save':{method:'POST'}});
                };
                this.checkUser = function(){
                   return $resource(apiURL+"checkUsername.php", null, {'save':{method:'POST'}});
                };
                this.loginUser = function(){
                    return $resource(apiURL+"login.php", null, {'save':{method:'POST'}});
                };
                this.logOutUser = function(){
                   return $resource(apiURL+"logOut.php", null,  {'get': {method: 'GET'}}); 
                };
        }])
    /* for cart page */
        .factory('cartFactory',['$resource', 'baseURL', 'apiURL', function($resource,baseURL,apiURL){
                var cartFac = {};
                cartFac.getCartDetail = function(){
                    //return $resource(baseURL+"Cart", null,  {'query': {method: 'GET',isArray: true}});
                    return $resource(apiURL+"selectCart.php", null,  {'query': {method: 'GET',isArray: true}});
                };
                cartFac.updateCartDetail = function(){
                     return $resource(apiURL+"updateCart.php/", null,  {'update': {method: 'PUT'}});
                };
                cartFac.deleteCartDetail = function(){
                    return $resource(apiURL+"deleteCart.php/",null,{'delete':{method:'DELETE'}});
                };
                cartFac.codPayment = function(){
                    return $resource(apiURL+"success.php/", null,{'save': {method: 'POST'}});
                };
                return cartFac;
        }])
/* for checkout page */
        .service('checkoutFactory', ['$resource', 'apiURL' , function($resource,apiURL){
                this.setUserPersonalDetail = function(){
                    return $resource(apiURL+"setUserPersonalDetail.php/", null,{'save': {method: 'POST'}});
                };
                
                this.isAddressExist = function(){
                    return $resource(apiURL+"isAddressExist.php/", null,{'save': {method: 'POST'}});
                };
                this.updateUserPersonalDetail = function(){
                    return $resource(apiURL+"updateUserPersonalDetail.php/", null,{'update': {method: 'PUT'}});
                };
                this.setOrderDetail = function(){
                    return $resource(apiURL+"setOrderDetail.php/", null,{'save': {method: 'POST'}});
                };
        }])
  ;      