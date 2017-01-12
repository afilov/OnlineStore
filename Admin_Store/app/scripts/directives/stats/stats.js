'use strict';

app.directive('stats',function() {
        return {
            templateUrl:'app/scripts/directives/stats/stats.html',
            restrict:'E',
            replace:true,
            scope: {
                'model': '=',
                'comments': '@',
                'number': '@',
                'name': '@',
                'colour': '@',
                'details':'@',
                'type':'@',
                'goto':'@'
            }

        }
    });
