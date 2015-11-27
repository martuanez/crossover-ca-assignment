angular.module('mBoard.topics')
    .controller('TopicsCtrl', function ($scope, CategoriesSvc, TopicsSvc, UtilsSvc) {
        $scope.topics = null;
        //Scope methods
        $scope.setCurrentCategory = setCurrentCategory;
        $scope.getFormattedDate = getFormattedDate;
        $scope.getUrlTitle = UtilsSvc.getUrlTitle;

        function getFormattedDate(date) {
            return moment(date).fromNow(true);
        }

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