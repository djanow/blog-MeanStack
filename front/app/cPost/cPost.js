(function() {
  'use strict';

  function config($stateProvider) {
    $stateProvider
      .state('root.cpost', {
        url: '/cpost',
        views: {
          '@': {
            templateUrl: 'app/cPost/cPost.tpl.html',
            controller: 'CPostCtrl as cPost',
            resolve: {
              data: function(DataService){
                return DataService.get('data.json');
              }
            }
          }
        }
      });
  }

  function CPostCtrl(data,$scope,$http,Upload,$timeout,modalService) {
    /*jshint validthis:true */
    var cPost = this;
    this.data = data.data;
    /*
    var content="<p> hellow</p>";
    var title = "modal";
    modalService.showModal($scope, content, 'md', title, ['cancel', 'ok'], true).result
                    .then(function () {
                        console.log("Ok");
                    })
                    .catch(function () { });*/
    $scope.tinymceOptions = {
      selector: 'textarea',
      height: 500,
      theme: 'modern',
      plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern ',
      toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
      image_advtab: true,
      templates: [
        { title: 'Test template 1', content: 'Test 1' },
        { title: 'Test template 2', content: 'Test 2' }
      ],
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i'
      ]
      };
/*
    $scope.upload = function (dataUrl, name) {
        var newPost = {
          subject : cPost.data.subject,
          content : cPost.data.content,
          author : cPost.data.islog.user._id,
          img : Upload.dataUrltoBlob($scope.croppedDataUrl,cPost.data.subject)
        };
        Upload.upload({
            method: 'POST',
            url: 'http://localhost:3000/api/post',
            headers: {
              "Authorization": cPost.data.islog.token
            },
            data: newPost,
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }
    */
    $scope.$on('islogin', function(event, msg) {
      cPost.data.islog = msg;
    });

    $scope.file_changed = function(element) {

      $scope.$apply(function(scope) {
        
          var photofile = element.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
             // handle onload
            var uri = event.target.result;


          };
          cPost.data.img = reader.readAsDataURL(photofile);
            var src = document.getElementById("img");
            src.src = cPost.data.img;
      });
    };

    cPost.submit = function() {
      if ($scope.form.$valid) {

        var newPost = {
          subject : cPost.data.subject,
          content : cPost.data.content,
          description : cPost.data.description,
          author : cPost.data.islog.user._id,
          profilepic: cPost.data.islog.user.profilepic,
          img : $scope.croppedDataUrl
        }
        console.log(JSON.stringify(newPost));
        var query = {
          method: 'POST',
          url: 'http://localhost:3000/api/post',
          headers: {
            "Authorization": cPost.data.islog.token
          },
          data: newPost
        
         }
         

        $http(query).then(function(res){
          if(!res.data.success)
            alert(res.data.msg);
          else
            alert(res.data.msg);
            cPost.data = res.data.data;
        });
      } else {
        console.log('invalid');
      }
    };
  }




  angular.module('cPost', [])
    .config(config)
    .controller('CPostCtrl', CPostCtrl);
})();
