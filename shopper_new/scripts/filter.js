'use strict';

angular.module('shopingApp')
        .filter('searchFilter',function(){
            return function(input){
              return input ? '\u2713' : '\u2718';
            };
        });

