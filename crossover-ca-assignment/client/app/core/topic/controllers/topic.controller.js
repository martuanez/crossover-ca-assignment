angular.module('mBoard.topic')
    .controller('TopicCtrl', function ($scope, $state, toastr, AuthenticationSvc, TopicsSvc, UtilsSvc, topic) {
        $scope.topic = {title: '', body: '', category: null};
        $scope.posts = null;
        $scope.isLoading = false;

        //Scope methods
        $scope.setCurrentCategory = setCurrentCategory;
        $scope.onCreateTopicClick = onCreateTopicClick;

        function onCreateTopicClick() {
            if ($scope.topic.title && $scope.topic.body && $scope.topic.category) {
                $scope.isLoading = true;
                if ($scope.isEdit) {
                    TopicsSvc.putTopic($scope.topic.objectId, $scope.topic.title, $scope.topic.body, $scope.topic.category.objectId)
                        .success(onSubmitSuccesa);
                } else {
                    TopicsSvc.postTopic($scope.topic.title, $scope.topic.body, $scope.topic.category.objectId)
                        .success(onSubmitSuccesa);
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

        function onSubmitSuccesa(response) {
            var topic = response.data;
            $scope.isLoading = false;
            $state.go('topic.view', {urlTitle: UtilsSvc.getUrlTitle(topic.title), id: topic.objectId});
        }

        function setCurrentCategory(category) {
            $scope.topic.category = category;
        }

        function init() {
            $scope.isEdit = !!topic;
            $scope.topic = topic || $scope.topic;
        }

        init();
    });