angular.module('mBoard.topics')
    .controller('TopicsCtrl', function ($scope, CategoriesSvc, TopicsSvc, UtilsSvc) {
        $scope.topics = null;
        //Scope methods
        $scope.setCurrentCategory = setCurrentCategory;
        $scope.getFormattedDate = UtilsSvc.getFormattedDate;
        $scope.getUrlTitle = UtilsSvc.getUrlTitle;


        socket.on('new topic', function (msg) {
            var filteredTopics = $scope.topics.filter(function (topic) {
                return topic.objectId === msg.objectId;
            });

            if (filteredTopics.length === 0) {
                $scope.topics.push(msg);
                $scope.$apply();
            }
        });

        function setTopics(topics) {
            $scope.topics = topics.data;
        }

        function setCurrentCategory(category) {
            $scope.selectedCategory = category;
        }

        function init() {
            TopicsSvc.getTopics().success(setTopics);
        }

        init();
    });