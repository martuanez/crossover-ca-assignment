angular.module('mBoard.topic')
    .controller('TopicCtrl', function ($scope, CategoriesSvc, TopicsSvc) {
        $scope.topic = null;
        $scope.posts = null;

        //Scope methods
        $scope.setCurrentCategory = setCurrentCategory;

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