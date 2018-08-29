(function() {
  'use strict';

  function modals($uibModal,$timeout) {
    var service = {
        showModal: function (scope, template, size, title, buttons, isstatic, options) {
            var modalInstance;
            var modalScope = scope.$new();

            options = options || {};
            options.disableOkCondition = options.disableOkCondition || 'false';
            options.okFn = options.okFn || function () {
                console.log("fade out  "+modalScope.result);
                modalInstance.close(modalScope.result);
                $timeout(function(){
                    $('.modal-open').removeClass("modal-open");
                    $('.modal').remove();
                    $('.modal-backdrop').remove();
                },100)
            };

            modalScope.ok = options.okFn;
            modalScope.cancel = function () {
                
                console.log("fade out  cancel");
                modalInstance.dismiss('cancel');
                $timeout(function(){
                    $('.modal-open').removeClass("modal-open");
                    $('.modal').remove();
                    $('.modal-backdrop').remove();
                },100)
            };

            var modalTemplate = '<div class="modal-header">'
                + '<h3 class="modal-title">' + title + '</h3>'
                + '</div>'
                + '<div class="modal-body">'
                + template
                + '</div>'

            if (angular.isArray(buttons)) {
                modalTemplate += '<div class="modal-footer">';
                for (var i = 0; i < buttons.length; ++i) {
                    if (buttons[i] == "ok") {
                        modalTemplate += '<button class="btn btn-white-blue" ng-click="ok()" ng-disabled="' + options.disableOkCondition + '">Valider</button>';
                    } else if (buttons[i] == "cancel") {
                        modalTemplate += '<button class="btn btn-blue-white" ng-click="cancel()">Annuler</button>';
                    } else if (buttons[i] == "no") {
                        modalTemplate += '<button class="btn btn-blue-white" ng-click="cancel()">Non</button>';
                    } else if (buttons[i] == "yes") {
                        modalTemplate += '<button class="btn btn-white-blue" ng-click="ok()">Oui</button>';
                    } else if (buttons[i] == "select") {
                        modalTemplate += '<button class="btn btn-white-blue" ng-click="ok()">Sélectionner</button>';
                    } else if (buttons[i] == "continue") {
                        modalTemplate += '<button class="btn btn-white-blue" ng-click="ok()">Continuer</button>';
                    } else if (buttons[i] == "close") {
                        modalTemplate += '<button class="btn btn-blue-white" ng-click="cancel()">Fermer</button>';
                    } else if (buttons[i] == "validate") {
                        modalTemplate += '<button class="btn btn-white-blue" ng-click="ok()">Ok</button>';
                    } else if (buttons[i] == "upload") {
                        modalTemplate += '<button class="btn btn-white-blue" ng-click="upload()">Valider</button>';
                    } else if (buttons[i] == "updateInfo") {
                        modalTemplate += '<button class="btn btn-white-blue" ng-click="ok()">Mettre a jour les informations</button>';
                    } else if (buttons[i] == "chooseTemplate") {
                        modalTemplate += '<button class="btn btn-white-blue" ng-click="ok()">Choisir ce template</button>';
                    }
                     else if (buttons[i] == "sendLater") {
                        modalTemplate += '<button class="btn btn-white-white" ng-click="cancel()">Plus tard</button>';
                    }
                    else if (buttons[i] == "understood") {
                        modalTemplate += '<button class="btn btn-white-blue" ng-click="ok()">J\'ai compris</button>';
                    }
                    

                }
                modalTemplate += '</div>';
            }

            if (isstatic) {
                modalInstance = $uibModal.open({
                    template: modalTemplate,
                    size: size,
                    scope: modalScope,
                    backdrop: 'static',
                    keyboard: false
                });
            }
            else {
                modalInstance = $uibModal.open({
                    template: modalTemplate,
                    size: size,
                    scope: modalScope
                });
            }

            return modalInstance;
        },
    
        showNotif : function(scope,type,title,content){
        
            var position_top_raccourci = $("#notif").offset().top;

            $(window).scroll(function () {
                if ($(this).scrollTop() > position_top_raccourci) {
                    $('#notif').addClass("fixnotif"); 
                } else {
                    $('#notif').removeClass("fixnotif");
                }
            });
            var notify = {
            type: type,
            title: title,
            content: content,
            timeout: 5000 //time in ms
            };
            return scope.$emit('notify', notify);
        }
    };
    return service;
  }
  angular.module('services.modal',[])
    .factory('modalService',modals);
})();
