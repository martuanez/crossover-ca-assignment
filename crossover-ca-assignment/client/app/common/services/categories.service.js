angular.module('mBoard')
    .factory('CategoriesSvc', function ($http) {

        function getCategories() {
            return $http.get('api/categories');
        }

        function getCategory(id) {
            return $http.get('api/categories/' + id);
        }

        function postCategory(name, latestThreads) {
            return $http.postt('api/categories', {name: name, latestThreads: latestThreads});
        }

        function putCategory(id, name) {
            return $http.put('api/categories/' + id, {name: name});
        }

        function deleteCategory(id) {
            return $http.delete('api/categories/' + id);
        }

        return {
            getCategories: getCategories,
            getCategory: getCategory,
            postCategory: postCategory,
            putCategory: putCategory,
            deleteCategory: deleteCategory

        };
    });
