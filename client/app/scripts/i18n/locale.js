function getLocale() {
  // try {
  //   return navigator.language.substr(0,2); // TODO: navigator.userLanguage for IE?
  // } catch(e) {
  //   return 'en';
  // }
    
  return 'it';
}

// Get Angular standard localization from angular-i18n
$.getScript("/bower_components/angular-i18n/angular-locale_" + getLocale() + ".js");
moment.locale(getLocale());

// This is also used in Express!
try {
  var locale = {
    language: getLocale()
  };
  module.exports = locale;
} catch(e) { }