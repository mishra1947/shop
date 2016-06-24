'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

                $scope.tab = 1;
                $scope.filtText = '';
                $scope.showDetails = false;
                
                $scope.showMenu = false;
                $scope.message = "Loading ...";
                $scope.dishes = [];
                menuFactory.getDishes()
                        .then(
                                function (response) {
                                    $scope.dishes = response.data;
                                     $scope.showMenu = true;
                                },
                                function (response){
                                    $scope.message = "Error: "+response.status + " " + response.statusText;
                                }
                        );
                console.log($scope.dishes);

                $scope.select = function (setTab) {
                    $scope.tab = setTab;

                    if (setTab === 2) {
                        $scope.filtText = "appetizer";
                    } else if (setTab === 3) {
                        $scope.filtText = "mains";
                    } else if (setTab === 4) {
                        $scope.filtText = "dessert";
                    } else {
                        $scope.filtText = "";
                    }
                };

                $scope.isSelected = function (checkTab) {
                    return ($scope.tab === checkTab);
                };

                $scope.toggleDetails = function () {
                    $scope.showDetails = !$scope.showDetails;
                };
            }])

        .controller('ContactController', ['$scope', function ($scope) {

                $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};

                var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];

                $scope.channels = channels;
                $scope.invalidChannelSelection = false;

            }])

        .controller('FeedbackController', ['$scope', function ($scope) {

                $scope.sendFeedback = function () {

                    console.log($scope.feedback);

                    if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                        $scope.invalidChannelSelection = true;
                        console.log('incorrect');
                    } else {
                        $scope.invalidChannelSelection = false;
                        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
                        $scope.feedback.mychannel = "";
                        $scope.feedbackForm.$setPristine();
                        console.log($scope.feedback);
                    }
                };
            }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {

                $scope.dish = {};
                $scope.showDish = false;
                $scope.message="Loading ...";
                menuFactory.getDish(parseInt($stateParams.id, 10))
                        .then(
                                function (response) {
                                    $scope.dish = response.data;
                                    $scope.showDish = true;
                                },
                                function(response){
                                  $scope.message=  "Error: "+response.status + " " + response.statusText; 
                                }
                        );

            }])

        .controller('DishCommentController', ['$scope','$http','baseURL', function ($scope,$http,baseURL) {

                $scope.feedback = {date: "", Name: "", rating: "", comment: ""};
                $scope.feedback.rating = 5;

                $scope.submitComment = function () {
                    console.log($scope.feedback);
                    $scope.feedback.date = new Date().toISOString();
                    var data = {
                        rating: $scope.feedback.rating,
                        comment: $scope.feedback.comment,
                        author: $scope.feedback.Name,
                        date: $scope.feedback.date
                    };
                    $scope.dish.comments.push(data);
//                    $http.post(baseURL+"feedback", data)
//                            .then(function(response){
//                                console.log(response);
//                            },
//                            function(response){
//                                console.log(response);
//                            });
                    $scope.feedback = {date: "", Name: "", rating: '', comment: ""};

                    $scope.commentForm.$setPristine();
                    console.log($scope.feedback);
                    $scope.feedback.rating = 5;

                };
            }])

        // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
                //for featured dish
                $scope.dish = {};
                $scope.showDish = false;
                $scope.message="Loading ...";
                $scope.promotion = [];
                $scope.executiveChef = {};

                menuFactory.getDish(0)
                        .then(
                                function (response) {
                                    $scope.dish = response.data;
                                    $scope.showDish = true;
                                 },
                                function(response) {
                                    $scope.message = "Error: "+response.status + " " + response.statusText;
                                }
                        );
                menuFactory.getPromotion(0)
                        .then(
                                function (response) {
                                    $scope.promotion = response.data;
                                }
                        );

                corporateFactory.getLeader(3)
                        .then(
                                function (response) {
                                    $scope.executiveChef = response.data;
                                }
                        );
            }])

        .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

                $scope.corporateLeaders = [];
                corporateFactory.getLeaders()
                        .then(
                                function (response) {
                                    $scope.corporateLeaders = response.data;
                                }
                        );
            }])


        ;
