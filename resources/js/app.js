require('./bootstrap');

global.$ = global.jQuery = require('jquery');
window.L = require('leaflet');
window.chart = require('chart.js');
window.moment = require('moment');

window.Vue = require('vue');

$(document).ready(function() {
  window.preferences = new Vue({
    el: '#preferences',
    data: {
      view: 'analyst',
      day: null,
      hour: null,
      parkingLots: null,
      selectedParkingLot: null,
    },
  });
});
