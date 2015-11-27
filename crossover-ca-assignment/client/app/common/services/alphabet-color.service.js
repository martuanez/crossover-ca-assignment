angular.module('mBoard')
    .factory('AlphabetColorSvc', function ($http) {

        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        var alphabetObj = {};

        function getColorClass(letter) {
            return alphabetObj[letter.toLowerCase()];
        }

        function getClassByIndex(index) {
            var result = 'color-1';
            if (index % 4 === 0) {
                result = 'color-4';
            }
            else if (index % 3 === 0) {
                result = 'color-3';
            }
            else if (index % 2 === 0) {
                result = 'color-2';
            }
            return result;
        }

        function buildAlphabetObject() {
            alphabet.forEach(function (letter, index) {
                alphabetObj[letter] = getClassByIndex(index);
            });
        }

        function init() {
            buildAlphabetObject();
        }
        init();

        return {
            getColorClass: getColorClass
        };
    });
