angular.module('mBoard.topics')
    .controller('TopicsCtrl', function ($scope, CategoriesSvc, TopicsSvc, AlphabetColorSvc) {
        $scope.topics = null;
        //Scope methods
        $scope.setCurrentCategory = setCurrentCategory;
        $scope.getFormattedDate = getFormattedDate;
        $scope.getColorClass = getColorClass;

        function getColorClass(word) {
            return AlphabetColorSvc.getColorClass(word[0]);
        }

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