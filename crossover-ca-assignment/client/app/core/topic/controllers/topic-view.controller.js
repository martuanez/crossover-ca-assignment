angular.module('mBoard.topic')
    .controller('TopicViewCtrl', function ($scope, toastr, AuthenticationSvc, TopicsSvc, PostsSvc, topic) {
        $scope.topic = null;
        $scope.posts = null;
        $scope.isLoading = false;

        //Scope methods
        $scope.setCurrentCategory = setCurrentCategory;
        $scope.onCreateTopicClick = onCreateTopicClick;

        function onCreateTopicClick() {
            if ($scope.topic.title && $scope.topic.body && $scope.topic.category) {
                $scope.isLoading = true;
                if ($scope.isEdit) {
                    TopicsSvc.putTopic($scope.topic.title, $scope.topic.body, $scope.topic.category.objectId)
                        .success(function (response) {
                            $scope.isLoading = false;
                        });
                } else {
                    TopicsSvc.postTopic($scope.topic.title, $scope.topic.body, $scope.topic.category.objectId)
                        .success(function (response) {
                            $scope.isLoading = false;
                        });
                }
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

        function onGetPostsSuccess(postsResponse) {
            $scope.posts = postsResponse.data;
        }

        function init() {
            $scope.topic = topic;
            PostsSvc.getPosts(topic.objectId).success(onGetPostsSuccess);
        }

        init();
    });