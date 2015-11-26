angular.module('mBoard.topic')
    .controller('TopicCtrl', function ($scope, AuthenticationSvc, TopicsSvc) {
        $scope.topic = { title:'', body:'', category: null };
        $scope.posts = null;

        //Scope methods
        $scope.setCurrentCategory = setCurrentCategory;
        $scope.onCreateTopicClick = onCreateTopicClick;

        function setTopics(topics) {
            $scope.topics = topics.data;
        }

        function onCreateTopicClick() {
            TopicsSvc.postTopic($scope.topic.title, $scope.topic.body, $scope.topic.category.id)
                .success(function(response){
                    debugger;
                });
        }

        function setCurrentCategory(category) {
            $scope.topic.category = category;
        }

        function init() {
            TopicsSvc.getTopics().success(setTopics);
        }

        init();
    });