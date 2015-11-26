angular.module('mBoard.topics')
    .controller('TopicsCtrl', function ($scope, CategoriesSvc, TopicsSvc) {
        $scope.topics = null;
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