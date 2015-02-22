function getLocale() {
  try {    
    return "it";//navigator.language.substr(0,2); // TODO: navigator.userLanguage for IE?
  } catch(e) {
    return 'en';
  }
}

// This is also used in Express!
try {
  var locale = {
    language: getLocale()
  };
  module.exports = locale;
} catch(e) { }