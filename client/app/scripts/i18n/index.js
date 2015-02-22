angular
  .module('openbusApp')
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider
      .translations('en', en)
      .translations('it', it)
      .determinePreferredLanguage(function () {
        return getLocale();
      })
      .fallbackLanguage('en');
}]);