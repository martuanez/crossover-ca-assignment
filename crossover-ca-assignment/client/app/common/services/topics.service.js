angular.module('mBoard')
    .factory('TopicsSvc', function ($http) {

        function getTopics(categoryId, skip) {
            return $http.get('api/topics', {params: {categoryId: categoryId, skip: skip}});
        }

        function getTopic(id) {
            return $http.get('api/topics/' + id);
        }

        function postTopic(title, body, categoryId) {
            return $http.post('api/topics', {title: title, body: body, categoryId: categoryId});
        }

        function putTopic(id, title, body, categoryId) {
            return $http.put('api/topics/' + id, {title: title, body: body, categoryId: categoryId});
        }

        function deleteTopic(id) {
            return $http.delete('api/topics/' + id);
        }

        return {
            getTopics: getTopics,
            getTopic: getTopic,
            postTopic: postTopic,
            putTopic: putTopic,
            deleteTopic: deleteTopic
        };
    });
