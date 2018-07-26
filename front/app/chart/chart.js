(function() {
  'use strict';

  function config($stateProvider) {
    $stateProvider
      .state('root.chart', {
        url: '/chart',
        views: {
          '@': {
            templateUrl: 'app/chart/chart.tpl.html',
            controller: 'ChartCtrl as chart',
            resolve: {
            }
          }
        }
      });
  }

  function ChartCtrl() {
    /*jshint validthis:true */
    var chart = this;

    chart.fSelect='radar';
    chart.bSelect='bar';
    chart.oSelect='polarArea';

        
    var ctxFC = document.getElementById("frontChart").getContext('2d');
    var ctxFB = document.getElementById("backChart").getContext('2d');
    var ctxOC = document.getElementById("otherChart").getContext('2d');
    var configO = {
      type: 'radar',
      data: {
              labels: ["Scrum", "Git", "SSH", "Docker", "Modular Architectur", "MVC"],
              datasets: [{
                  label: 'Other Level',
                  data: [5, 6, 6, 7, 5, 8],
                  backgroundColor: [
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(54, 162, 235, 1)',
                      'rgba(255,99,132,1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 10
                    }
                }
              }
            
        };
    var configB = {
      type: 'radar',
      data: {
          labels: ["Node", "Express", "Mongoose", "Socket.IO", "StrongLoop", "Node-Restful"],
          datasets: [{
              label: 'Back-End Level',
              data: [6, 5, 7, 6, 5, 8],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255,99,132,1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: false,
          maintainAspectRatio: true,
          scale: {
              ticks: {
                  beginAtZero: true,
                  max: 10
              }
            }
      }
        };
    var configF ={
      type: chart.fSelect,
      data: {
          labels: ["HTML5", "CSS3", "JavaScript", "AngularJS", "Bootstrap", "gulp", "Ionic", "Jquery"],
          datasets: [{
              label: 'Front-End Level',
              data: [7, 8, 6, 7, 8, 5, 6, 7],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 0, 255, 0.2)',
                  'rgba(0, 255, 0, 0.2)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255,99,132,1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 0, 255, 1)',
                  'rgba(0, 255, 0, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: false,
          maintainAspectRatio: true,
          scale: {
              ticks: {
                  beginAtZero: true,
                  max: 10
              }
            }
      }
        };


    var otherChart = new Chart(ctxOC, configO);

    var backChart = new Chart(ctxFB, configB);

    var frontChart = new Chart(ctxFC, configF);


    chart.init = function(){
      chart.SelectChange('front');
      chart.SelectChange('back');
      chart.SelectChange('other');
    };

    chart.SelectChange = function(type){
      var tmp,ctx;
      if(type=="front"){
        tmp = jQuery.extend(true, {}, configF);
        ctx = ctxFC;
        frontChart.destroy();
        tmp.type = chart.fSelect;
        tmp.options = testModifOptions(tmp);
        frontChart = new Chart(ctx, tmp);
      }
      if(type=="back"){
        tmp = jQuery.extend(true, {}, configB);
        ctx = ctxFB;
        backChart.destroy();
        tmp.type = chart.bSelect;
        tmp.options = testModifOptions(tmp);
        backChart = new Chart(ctx, tmp);
      }
      if(type=="other"){
        tmp = jQuery.extend(true, {}, configO);
        ctx = ctxOC;
        otherChart.destroy();
        tmp.type = chart.oSelect;
        tmp.options = testModifOptions(tmp);
        otherChart = new Chart(ctx, tmp);
      }
    }

  }

  var testModifOptions = function(tmp){

    if((tmp.type=='bar')||(tmp.type=='line')){
      tmp.options ={
        responsive: false,
        maintainAspectRatio: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepValue: 1,
              min: 0,
              max: 10
            }
          }]
        }
      };
    }
    if((tmp.type=='area')||(tmp.type=='polarArea')){
      tmp.options ={
        responsive: false,
        maintainAspectRatio: true,
        scale: {
            ticks: {
                beginAtZero: true,
                max: 10
            }
          }
      };
    }
    if((tmp.type=='pie')||(tmp.type=='doughnut')||(tmp.type=='horizontalBar')){
      tmp.options ={
      };
    }
    return tmp.options;
  };


  angular.module('chart', [])
    .config(config)
    .controller('ChartCtrl', ChartCtrl);
})();
