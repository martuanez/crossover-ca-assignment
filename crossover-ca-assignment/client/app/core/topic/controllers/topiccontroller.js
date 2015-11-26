angular.module('mBoard.topic')
    .controller('TopicCtrl', function ($scope, toastr, AuthenticationSvc, TopicsSvc) {
        $scope.topic = {title: '', body: '', category: null};
        $scope.posts = null;
        $scope.isLoading = false;

        //Scope methods
        $scope.setCurrentCategory = setCurrentCategory;
        $scope.onCreateTopicClick = onCreateTopicClick;

        function setTopics(topics) {
            $scope.topics = topics.data;
        }

        function onCreateTopicClick() {
            if ($scope.topic.title && $scope.topic.body && $scope.topic.category) {
                $scope.isLoading = true;
                TopicsSvc.postTopic($scope.topic.title, $scope.topic.body, $scope.topic.category.objectId)
                    .success(function (response) {
                        $scope.isLoading = false;
                    });
            } else {
                if (!$scope.topic.title) {
                    toastr.error('Title is required');
                } else if (!$scope.topic.body) {
                    toastr.error('Body is required');
                }
                else if (!$scope.topic.category) {
                    toastr.error('Category is required');
                }
            }
        }

        function setCurrentCategory(category) {
            $scope.topic.category = category;
        }

        function init() {
            TopicsSvc.getTopics().success(setTopics);
        }

        init();
    });