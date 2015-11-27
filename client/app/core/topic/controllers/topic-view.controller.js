angular.module('mBoard.topic')
    .controller('TopicViewCtrl', function ($scope, toastr, AuthenticationSvc, TopicsSvc, PostsSvc, UtilsSvc, topic) {
        $scope.topic = null;
        $scope.posts = [];
        $scope.isLoading = false;
        $scope.showReplyForm = false;
        $scope.replyBody = '';

        //Scope methods
        $scope.setCurrentCategory = setCurrentCategory;
        $scope.onCreateTopicClick = onCreateTopicClick;
        $scope.getFormattedDate = UtilsSvc.getFormattedDate;
        $scope.getPrettyDate = getPrettyDate;
        $scope.onReplyClick = onReplyClick;
        $scope.onPostReplyClick = onPostReplyClick;


        socket.on('new post', function (msg) {
            var filteredPosts = $scope.posts.filter(function (post) {
                return post.objectId === msg.objectId;
            });

            if (filteredPosts.length === 0) {
                $scope.posts.push(msg);
                $scope.$apply();
            }
        });

        function getPrettyDate(date) {
            return moment(date).format("MMM D YYYY");
        }

        function onReplyClick() {
            $scope.showReplyForm = true;
        }

        function onPostReplyClick() {
            if ($scope.replyBody) {
                PostsSvc.postPost($scope.replyBody, $scope.topic.objectId)
                    .success(function (response) {
                        $scope.replyBody = '';
                        $scope.posts.push(response.data);
                    });
                $scope.showReplyForm = true;
            }
        }

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