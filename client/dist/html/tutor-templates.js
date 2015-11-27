(function(module) {
try { module = angular.module("tutors.templates"); }
catch(err) { module = angular.module("tutors.templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("client/app/core/categories/templates/categories.tpl.html",
    "");
}]);
})();

(function(module) {
try { module = angular.module("tutors.templates"); }
catch(err) { module = angular.module("tutors.templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("client/app/core/latest/templates/template.tpl.html",
    "");
}]);
})();

(function(module) {
try { module = angular.module("tutors.templates"); }
catch(err) { module = angular.module("tutors.templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("client/app/core/thread/templates/template.tpl.html",
    "");
}]);
})();

(function(module) {
try { module = angular.module("tutors.templates"); }
catch(err) { module = angular.module("tutors.templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("client/app/core/topic/templates/template.tpl.html",
    "");
}]);
})();

(function(module) {
try { module = angular.module("tutors.templates"); }
catch(err) { module = angular.module("tutors.templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("client/app/common/components/header/templates/header.tpl.html",
    "<header>\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"pull-left branding\">\n" +
    "            <a href=\"/\" class=\"branding-link\">\n" +
    "                <span class=\"logo\">\n" +
    "                    <img src=\"app/common/components/header/images/header-logo.png\"/>\n" +
    "                </span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"pull-right nav open-sans-light\">\n" +
    "                <span class=\"action-item\">\n" +
    "                    <a href ng-click=\"openStudentModal()\">Find a Tutor</a>\n" +
    "                </span>\n" +
    "                <span class=\"action-item\">\n" +
    "                    <a ui-sref=\"tutor.signup.step1\">Become a Tutor</a>\n" +
    "                </span>\n" +
    "                <span class=\"action-item hide-sm\" ng-click=\"onLoginClick()\">\n" +
    "                    <a href=\"#\">Login</a>\n" +
    "                    <login show-login=\"showLogin\" ng-click=\"$event.stopPropagation();\"></login>\n" +
    "                </span>\n" +
    "                <span class=\"action-item hide-sm download pull-right\" ng-click=\"openStudentModal()\">\n" +
    "                    <a href class=\"download-btn\">Download</a>\n" +
    "                </span>\n" +
    "\n" +
    "                <span class=\"action-item show-sm\">\n" +
    "                    <a href class=\"text-primary\" ng-click=\"showChilds = !showChilds; showLogin = false\">\n" +
    "                        More\n" +
    "                    </a>\n" +
    "                    <span class=\"more-links\" ng-show=\"showChilds\" ng-click=\"$event.stopPropagatin()\">\n" +
    "                       <span class=\"action-item\" ng-click=\"onLoginClick()\">\n" +
    "                            <a href>Login</a>\n" +
    "                            <login show-login=\"showLogin\" ng-click=\"$event.stopPropagation();\"></login>\n" +
    "                        </span>\n" +
    "                        <span class=\"action-item\" ng-click=\"openStudentModal()\">\n" +
    "                            <a href class=\"download-btn\">Download</a>\n" +
    "                        </span>\n" +
    "                    </span>\n" +
    "                </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</header>");
}]);
})();

(function(module) {
try { module = angular.module("tutors.templates"); }
catch(err) { module = angular.module("tutors.templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("client/app/common/components/footer/templates/footer.tpl.html",
    "<footer>\n" +
    "    <h1>Footer!</h1>\n" +
    "</footer>");
}]);
})();
