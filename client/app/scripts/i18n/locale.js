function getLocale() {
  try {
    return navigator.language.substr(0,2); // TODO: navigator.userLanguage for IE?
  } catch(e) {
    return 'en';
  }
}

// Get Angular standard localization from angular-i18n
$.getScript("/bower_components/angular-i18n/angular-locale_" + getLocale() + ".js");

// Get moment standard localization
if (getLocale() !== 'en') {
  try {
    $.getScript("/bower_components/moment/locale/" + getLocale() + ".js");
    moment.locale(getLocale());
  } catch (e) { }
}

// This is also used in Express!
try {
  var locale = {
    language: getLocale()
  };
  module.exports = locale;
} catch(e) { }