'use strict';

angular.module('shopingApp')
        /* Index controller */
        .controller('IndexController', ['$scope', 'homeFactory', 'registerFactory', '$state','$rootScope', function ($scope, homeFactory, registerFactory, $state,$rootScope) {
                $scope.showProducts = false;
                $scope.message = "Loading ...";
                homeFactory.getFeatureProducts().query(
                        function (response) {
                            $scope.fProducts = response;
                            $scope.showProducts = true;
                        },
                        function (response) {
                            $scope.message = "Error: Server not found";
                        });
                homeFactory.getLatestProducts().query(
                        function (response) {
                            $scope.lProducts = response;
                            $scope.showProducts = true;
                        },
                        function (response) {
                            $scope.message = "Error: Server not found";
                        });

                /* for logout user */
                
                $rootScope.username = $.jStorage.get('username');
                $rootScope.logout = false;
                if ($scope.username !== null) {
                    $rootScope.logout = true;
                }

                $scope.unsetUser = function () {
                    registerFactory.logOutUser().get()
                            .$promise.then(
                                    function (response) {
                                        if (response[0] === '1') {
                                            $.jStorage.deleteKey('username');
                                            $rootScope.logout = false;
                                            $state.reload();
                                        }
                                    });
                };
              /* get current year */
              $scope.currentYear =  new Date().getFullYear();
            }])

        /* cart controller */
        .controller('CartController', ['$scope', 'cartFactory', '$location', '$state', function ($scope, cartFactory, $location, $state) {
                $scope.show = true;
                $scope.numberOfProduct = 0;
                var username = $.jStorage.get('username');
                cartFactory.getCartDetail().query({username:username},
                        function (response) {
                            if (response[0] === 'nothing') {
                                $scope.show = false;
                                $scope.message = response[1];
                            } else {
                                $scope.cartDetails = response;
                                var cartValue = 0;
                                var numberOfProduct = 0;
                                angular.forEach($scope.cartDetails, function (value, key) {
                                    cartValue += parseFloat(value.totalPrice);
                                    numberOfProduct++;
                                });
                                $scope.cartValue = cartValue;
                                $scope.numberOfProduct = numberOfProduct;
                                $.jStorage.set('cart',$scope.numberOfProduct);
                            }
                        });
                $scope.url = $location;


                /* for slecting all products*/
                $scope.productSelection = {};
                $scope.isAll = false;
                $scope.selectAllProducts = function () {
                    if ($scope.isAll === false) {
                        angular.forEach($scope.cartDetails, function (row, index) {
                            $scope.productSelection[index] = true;
                        });
                        $scope.isAll = true;
                    } else {
                        angular.forEach($scope.cartDetails, function (row, index) {

                            $scope.productSelection[index] = false;
                        });
                        $scope.isAll = false;
                    }
                };

                /* for updating qunatity*/
                $scope.updateQuantity = function () {
                    angular.forEach($scope.cartDetails, function (row, index) {
                        if ($scope.productSelection[index]) {
                            var newQuantity = $("#qunatity-" + row.id).val();
                            cartFactory.updateCartDetail().update({id: row.id, quantity: newQuantity}, null)
                                    .$promise.then(
                                            function (response) {
                                                if (response[0] === "1") {
                                                    $state.reload();
                                                }
                                            });
                        }else{
                            alert("Please Select the product to update!");
                        }
                    });
                };


                /* delete products from cart*/
                /* Delete function */
                $scope.delete = function () {
                    angular.forEach($scope.cartDetails, function (row, index) {
                        if ($scope.productSelection[index]) {
                            cartFactory.deleteCartDetail().delete({id: row.id})
                                    .$promise.then(
                                            function (response) {
                                                if (response[0] === "1") {
                                                    $state.reload();
                                                }
                                            });
                            delete $scope.productSelection[index];
                        }else{
                            alert("Please Select the product to delete!");
                        }
                    });
                };

                //
                $scope.continueShoping = function () {
                    $location.path("/");
                };

            }])

        /* checkOut controller */
        .controller('CheckoutController', ['$scope', '$location', 'checkoutFactory', function ($scope, $location, checkoutFactory) {
                $scope.url = $location;
                $scope.userPersonalDetail = {firstName: '', lastName: '', email: '', phone: '',
                    fax: '', company: '', companyID: '', address1: '',
                    address2: '', city: '', postCode: '', country: '',
                    state: ''};
                /* for country */
                var countries = [{value: 'Afghanistan', label: 'Afghanistan'},
                    {value: 'Albania', label: 'Albania'},
                    {value: 'Algeria', label: 'Algeria'},
                    {value: 'American Samoa', label: 'American Samoa'},
                    {value: 'Andorra', label: 'Andorra'},
                    {value: 'Angola', label: 'Angola'}];
                $scope.countries = countries;
                
                /* for state */
                var states = [{value: 'Aberdeen', label: 'Aberdeen'},
                    {value: 'Aberdeenshire', label: 'Aberdeenshire'},
                    {value: 'Anglesey', label: 'Anglesey'},
                    {value: 'Angus', label: 'Angus'},
                    {value: 'Argyll and Bute', label: 'Argyll and Bute'}];
                $scope.states = states;

                $scope.numericPattern = /^\d+$/;
                $scope.invalidSelection = false;
                
                
                /* set details to database */
                $scope.submitPersonalDetail = function () {
                    if ($scope.userPersonalDetail.country === "") {
                        $scope.invalidSelection = true;
                        console.log('incorrect');
                    } else {
                        $scope.invalidSelection = false;
                        //console.log($scope.userPersonalDetail);
                        var username = localStorage.getItem('username');
                        
                        /* check is user loged in or not */
                        if (username !== null) {
                            
                            /* check if user address is exist. if exist then update address otherwise save new address */
                            checkoutFactory.isAddressExist().save(null, {username: username})
                                    .$promise.then(
                                            function (response) {
                                                console.log(response);
                                                if (response['data'] === 'exist') {
                                                    checkoutFactory.updateUserPersonalDetail().update({username: username},$scope.userPersonalDetail);
                                                     $scope.userPersonalDetail = {firstName: '', lastName: '', email: '', phone: '',
                                                        fax: '', company: '', companyID: '', address1: '',
                                                        address2: '', city: '', postCode: '', country: '',
                                                        state: ''};
                                                    $scope.PersonalDetail.$setPristine();
                                                } else if (response['data'] === 'not_exist') {
                                                    checkoutFactory.setUserPersonalDetail().save(null, $scope.userPersonalDetail);

                                                    $scope.userPersonalDetail = {firstName: '', lastName: '', email: '', phone: '',
                                                        fax: '', company: '', companyID: '', address1: '',
                                                        address2: '', city: '', postCode: '', country: '',
                                                        state: ''};
                                                    $scope.PersonalDetail.$setPristine();
                                                }
                                            });
                        } else if (username === null){
                            alert('please login first');
                            $location.path("/register");
                        }
                    }

                };

                /* for order detail */
              
                    $scope.comment = '';
                $scope.confirmOrder = function () {
                    //var username = localStorage.getItem('username');
                    var username = $.jStorage.get('username');
                    var cart = $.jStorage.get('cart')
                    if (username !== null) {
                        if ($scope.comment !== '') {
                            if(cart !==null){
                            var orderNumber = Math.floor((Math.random() * 10000) + 1);
                            var orderDetail = {item_number: orderNumber,user_id:username,  comment: $scope.comment};
                            checkoutFactory.setOrderDetail().save(null, orderDetail);
                            $scope.comment = '';
                            $location.path("payment/"+orderNumber);
                        }else{
                           alert('please Add something in your cart');
                           $location.path("/"); 
                        }
                        }else{
                            alert("Please comment before confirmation");
                        }
                    } else if (username === null) {
                        alert('please Add something in your cart');
                        $location.path("/");
                    }
                };
                
            }])

        /* register controller */
        .controller('RegisterController', ['$scope', 'registerFactory', '$location', '$state', '$rootScope', function ($scope, registerFactory, $location, $state, $rootScope) {
                $scope.userDetail = {username: "", email: "", Password: ""};
                $scope.login = {username: "", Password: ""};
                $scope.registerUser = function () {
                    registerFactory.registerUserDetail().save(null, $scope.userDetail)
                            .$promise.then(
                                    function (response) {
                                        console.log(response);
                                        if (response['data'] === 'failure') {
                                            $scope.message = response['msg'];
                                            $scope.existMessage = "";
                                        }else if (response['data'] === 'success'){
                                            $scope.message = response['msg'];
                                        }
                                    },
                                    function (response) {
                                        $scope.message = "Problem in registration. Please check your connection.";
                                    });
                    $scope.userDetail = {username: "", email: "", Password: ""};
                    $scope.registerForm.$setPristine();
                };
                // check if username exist
                $scope.checkUsername = function () {
                    var username = $scope.userDetail.username;
                    $scope.exist = false;
                    if (username !== '') {
                        registerFactory.checkUser().save(null, {username: username})
                                .$promise.then(
                                        function (response) {
                                            if (response['data'] === 'failure') {
                                                $scope.exist = true;
                                                $scope.existMessage = response['msg'];
                                            }
                                        });
                    }
                };
                //for signin
                $scope.signin = function () {
                    
                    registerFactory.loginUser().save(null, $scope.login)
                            .$promise.then(
                                    function (response) {
                                        console.log(response);
                                        if (response["signin"] === "success") {
                                            $.jStorage.set("username", response["username"]);
                                            $.jStorage.setTTL("username", 1440000);
                                            if (localStorage.getItem('currentProductPath') !== null) {
                                                $rootScope.logout = true;
                                                $rootScope.username = $.jStorage.get("username");
                                                $location.path(localStorage.getItem('currentProductPath'));
                                                window.location.reload();
                                            } else {
                                               $rootScope.logout = true;
                                               $rootScope.username = $.jStorage.get("username");
                                                $state.go("app");
                                                window.location.reload(); 
                                            }
                                            localStorage.removeItem('currentProductPath');
                                            return false;
                                        } else if (response["signin"] === "failure")
                                        {
                                            $scope.login_message = "username or password is incorrect";
                                            $scope.signupForm.$setPristine();
                                            $scope.login = {username: "", Password: ""};
                                        }
                                    },
                                    function (response) {
                                        console.log(response);
                                    });

                };
            }])

        /* productDetail controller */
        .controller('ProductDetailController', ['$scope', '$location', 'homeFactory', '$stateParams', '$state', function ($scope, $location, homeFactory, $stateParams, $state) {
                $scope.showDetail = false;
                $scope.message = "Loading ...";
                //for details of all products detail by id
                $scope.getAllProducts = homeFactory.getAllProducts().get({type: $stateParams.type, id: parseInt($stateParams.id, 10)})
                        .$promise.then(
                                function (response) {
                                    $scope.getAllProducts = response;
                                    $scope.showDetail = true;
                                },
                                function (response) {
                                    $scope.message = "Error: " + response.status + " " + response.statusText;
                                });

                $scope.url = $location;
                $scope.productType = $stateParams.type;
                $scope.getRelatedProdcuts = homeFactory.getAllProducts().query({type: $stateParams.type},
                        function (response) {
                            $scope.getRelatedProdcuts = response;
                            $scope.showDetail = true;
                            //console.log(response);
                        },
                        function (response) {
                            $scope.message = "Error: " + response.status + " " + response.statusText;
                        });

                /* save product to cart */
                $scope.saveCart = function (quantity, productDetail) {
                    var totalPrice = quantity * (productDetail.price);
                    var cartDetail = {'quantity': quantity, 'productDetail': productDetail, 'producType': $stateParams.type, 'totalPrice': totalPrice};
                    //console.log(cartDetail);
                    homeFactory.setCart().save(null, cartDetail)
                            .$promise.then(
                                    function (response) {
                                        if (response['status'] === "login") {
                                            //$location.path('/cart');
                                            $state.reload();
                                        } else if (response['status'] === "not_login") {
                                            localStorage.setItem("currentProductPath", $location.path());
                                            alert(response['msg']);
                                            $location.path('/register');
                                        }
                                    });
                };

            }])
        
        .controller("PaymentController", ['$scope', 'cartFactory','$stateParams', '$state', function($scope,cartFactory, $stateParams, $state){
                $scope.show = true;
                 var username = $.jStorage.get('username');
                cartFactory.getCartDetail().query({username:username},
                        function (response) {
                            if (response[0] === 'nothing') {
                                $scope.show = false;
                                $scope.message = response[1];
                            } else {
                                $scope.cartDetails = response;
                                var cartValue = 0;
                                var numberOfProduct = 0;
                                angular.forEach($scope.cartDetails, function (value, key) {
                                    cartValue += parseFloat(value.totalPrice);
                                    numberOfProduct++;
                                });
                                $scope.cartValue = cartValue;
                                $scope.numberOfProduct = numberOfProduct;
                            }
                        }); 
                      $scope.orderNumber = $stateParams.order_number;
                      
                      /* for cash on delivery */
                      $scope.COD = function(){
                                  cartFactory.codPayment().save(null,{order_number:$scope.orderNumber, paymentType: "COD"})
                                          .$promise.then(
                                              function (response){
                                                  $scope.show = true;
                                                 console.log(response); 
                                                 if(response['status']==='success'){
                                                     $scope.message = response['message'];
                                                     $scope.show = false;
                                                 } if(response['status']==='failure'){
                                                    alert(response['message']);
                                                 }
                                              });
                      };
        }])

        ;
