'use strict';

angular.module('shopingApp', ['ui.router','ngResource'])
.constant("baseURL","http://localhost:3000/")
//.constant("apiURL","http://localhost/shopper_new/api/")
.constant("apiURL","http://shopper.com/api/")
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'                        
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }

            })
            
            //route for catagory
            .state('app.women', {
                url:'women',
                views: {
                    'content@': {
                        templateUrl : 'views/products.html'                
                    }
                }
            })
            .state('app.men', {
                url:'men',
                views: {
                    'content@': {
                        templateUrl : 'views/products.html'                
                    }
                }
            })
            .state('app.sport', {
                url:'sport',
                views: {
                    'content@': {
                        templateUrl : 'views/products.html'                
                    }
                }
            })
            .state('app.hanbag', {
                url:'hanbag',
                views: {
                    'content@': {
                        templateUrl : 'views/products.html'                
                    }
                }
            })
            .state('app.bestSeller', {
                url:'bestSeller',
                views: {
                    'content@': {
                        templateUrl : 'views/products.html'                
                    }
                }
            })
            .state('app.topSeller', {
                url:'topseller',
                views: {
                    'content@': {
                        templateUrl : 'views/products.html'                
                    }
                }
            })
        
            // route for the cart page
            .state('app.cart', {
                url:'cart',
                views: {
                    'content@': {
                        templateUrl : 'views/cart.html',
                        controller  : 'CartController'                  
                    }
                }
            })
        
            // route for the checkout page
            .state('app.checkout', {
                url:'checkout',
                views: {
                    'content@': {
                        templateUrl : 'views/checkout.html',
                        controller  : 'CheckoutController'                  
                    }
                }
            })

            // route for the register page
            .state('app.register', {
                url: 'register',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'IndexController'
                    },
                    'content@': {
                        templateUrl : 'views/register.html',
                        controller  : 'RegisterController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.productDetail', {
                url: 'productDetail/:type/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/product_detail.html',
                        controller  : 'ProductDetailController'
                   }
                }
            })
            
            // route for the contactus page
            .state('app.contact', {
                url: 'contact',
                views: {
                    'content@': {
                        templateUrl : 'views/contact.html'
//                        controller  : 'ProductDetailController'
                   }
                }
            })
            
            // route for the contactus page
            .state('app.payment', {
                url: 'payment/:order_number',
                views: {
                    'content@': {
                        templateUrl : 'views/payment.html',
                        controller  : 'PaymentController'
                   }
                }
            });
//            .state('app.login', {
//                url: 'login',
//                views: {
//                    'header': {
//                        templateUrl : 'views/header.html',
//                        controller  : 'IndexController'
//                    }
//                }
//            })
            
    
        $urlRouterProvider.otherwise('/');
    })
;
