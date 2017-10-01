(function() {
    PPTGenerator.directive('table', ['', function() {
        var controller = ['$scope', function($scope) {
            $scope.pageSize = 5;
            $scope.songFilter = '';
            $scope.datasource = [];

            $scope.watchCollection('datasource', getColumns);



            function getColumns() {

            }
            $scope.getData = function() {

                return $filter('filter')($scope.datasource, $scope.songFilter);

            };

            $scope.numberOfPages = function() {

                return Math.ceil($scope.getData().length / $scope.pageSize);

            };

            $scope.checkPages = function() {
                if ($scope.numberOfPages() > 0) {
                    $scope.currentPage = 0;
                } else {
                    $scope.currentPage = -1;
                }
            };

        }];
        return {
            restrict: 'E',
            scope: {
                columnmap: '@',
                datasource: '='
            },
            controller: controller,
            bindToController: true,
            templateUrl: 'app/views/table.html'
        };
    }]);
}());