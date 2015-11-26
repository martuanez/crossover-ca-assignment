angular.module('mBoard')
    .factory('PostsSvc', function ($http) {

        function getPosts(topicId, skip) {
            return $http.get('api/posts', {params: {topicId: topicId, skip: skip}});
        }

        function getPost(id) {
            return $http.get('api/posts/' + id);
        }

        function postPost(title, body, topicId) {
            return $http.postt('api/posts', {title: title, body: body, topicId: topicId});
        }

        function putPost(id, title, body) {
            return $http.put('api/posts/' + id, {title: title, body: body});
        }

        function deletePost(id) {
            return $http.delete('api/posts/' + id);
        }

        return {
            getPosts: getPosts,
            getPost: getPost,
            postPost: postPost,
            putPost: putPost,
            deletePost: deletePost
        };
    });
