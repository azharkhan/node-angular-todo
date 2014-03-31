var todoApp = angular.module('todoApp', []);

todoApp.controller('MainCtrl', function($scope, $http) {
    $scope.formData = {};

    // when landing on a page, get and show all todos
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

   // when submitting the form, send the text to the API
   $scope.createTodo = function () {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};    // clear the form so that user can enter another ToDo
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
   };

   $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
   };
});
