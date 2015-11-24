angular.module('mBoard')
    .factory('ThreadsSvc', function ($http) {

        function getThreads(categoryId, skip) {
            return $http.get('api/threads', {params: {categoryId: categoryId, skip: skip}});
        }

        function getThread(id) {
            return $http.get('api/threads/' + id);
        }

        function postThread(title, body, categoryId) {
            return $http.postt('api/threads', {title: title, body: body, categoryId: categoryId});
        }

        function putThread(id, title, body, categoryId) {
            return $http.put('api/threads/' + id, {title: title, body: body, categoryId: categoryId});
        }

        function deleteThread(id) {
            return $http.delete('api/threads/' + id);
        }

        return {
            getThreads: getThreads,
            getThread: getThread,
            postThread: postThread,
            putThread: putThread,
            deleteThread: deleteThread
        };
    });
