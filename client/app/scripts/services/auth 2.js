'use strict';

/**
 * @ngdoc service
 * @name openbusApp.Auth
 * @description
 * # Auth
 * Service in the openbusApp.
 */
angular.module('openbusApp')
  .service('Auth', function ($http, $cookieStore, $q, User) {
    // AngularJS will instantiate a singleton by calling "new" on this function
  
    var currentUser = {};
  
    if($cookieStore.get('token')) {
      currentUser = User.me();
      console.log("[Auth] currentUser.hasOwnProperty('role'): " + currentUser.hasOwnProperty('role')); 
      console.log(currentUser);
    }
    
    var auth = {
      login: function(user, callback){
        var cb = callback || angular.noop
        var deferred = $q.defer();
        
        $http.post('/auth', {
          email: user.email,
          password: user.password
        })
        .success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.me();
          deferred.resolve(data);
          return cb();
        })
        .error(function(err){
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));
        
        return deferred.promise;
      },
      
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};  
      },
      
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },
      
      isLoggedInAsync: function(cb) {
        console.log("[Auth] currentUser.hasOwnProperty('$promise'): " + currentUser.hasOwnProperty('$promise')); 
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          console.log("No promise no role!!!");
          cb(false);
        }
      },
      
      getCurrentUser: function() {
        return currentUser;
      },
      
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      getToken: function() {
        return $cookieStore.get('token');
      }
    };
          
    return auth;
  });
