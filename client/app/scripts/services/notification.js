'use strict';

/**
 * @ngdoc service
 * @name openbusApp.notification
 * @description
 * # notification
 * Service in the openbusApp.
 */
angular.module('openbusApp')
  .service('Notification', function ($rootScope) {
    
    $rootScope.alerts = [];
      
    $rootScope.getAlertsBadge = function() {
      var alertsBadge = {
        num: $rootScope.alerts.length,
        icon: '',
        type: ''
      };
      
      ['success','danger', 'warning', 'info'].some(function(type) {  
        var alerts = $rootScope.alerts.filter(function(al) {
          return al.type === type;
        });

        switch (type) {
        case 'success':
          alertsBadge.icon = 'check';
          if ($rootScope.alerts.filter(function(al){return al.type==='danger'}).length > 0) {
            alertsBadge.icon = 'exclamation-circle';
          } else if ($rootScope.alerts.filter(function(al){return al.type==='warning'}).length > 0) {
            alertsBadge.icon = 'warning';
          }
          break;
        case 'danger':
          alertsBadge.icon = 'exclamation-circle';
          break;
        case 'warning':
          alertsBadge.icon = 'warning';
          break;
        case 'info': 
          alertsBadge.icon = 'info-circle';
        }
        
        alertsBadge.type = type;
        
        return alerts.length > 0;
      });

      return alertsBadge;
    };
    
    // $rootScope.isTypeShown = function(type) {
    //   return $rootScope.showAlertType === type;
    // };
    //
    // $rootScope.showAlerts = function(type) {
    //   if ($rootScope.showAlertType !== type) {
    //     $rootScope.showAlertType = type;
    //   } else {
    //     $rootScope.showAlertType = "";
    //   }
    // };
    //
    // $rootScope.$on("clearAlertType", function(){
    //   $scope.showAlertType = "";
    // });
    
    var notification = {
      init: function() {
        $rootScope.alerts = [];
        // $rootScope.$broadcast("clearAlertType");
      },
      add: function(type, message){
        $rootScope.alerts.push({type: type, message: message});
      }
    };
    
    $rootScope.closeAlert = function(alertInst) {
      var index = $rootScope.alerts.indexOf(alertInst);
      $rootScope.alerts.splice(index, 1);
    };
    
    $rootScope.markAllAlertsAsRead = function() {
      notification.init();
    };
    
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if(!next.params.hasAlerts) {
         notification.init();
      }
    });
    
    return notification;
  });
