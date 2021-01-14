require('./bootstrap');

global.$ = global.jQuery = require('jquery');
window.L = require('leaflet');
window.Rainbow = require('rainbowvis.js');
window.chart = require('chart.js');
window.moment = require('moment');

window.Vue = require('vue');

$(document).ready(function() {
  window.preferences = new Vue({
    el: '#preferences',
    data: {
      view: 'analyst',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      day: null,
      hour: null,
      visualizing: false,
      parkingLots: null,
      selectedParkingLot: null,
    },
    mounted() {
      this.resetDate();
      axios.get('/api/parking-lot').then(response => (this.parkingLots = response.data)).finally(() => init_map());
    },
    computed: {
      date: function() {
        if (this.day !== null && this.hour !== null) {
          let tmpHour = this.hour;

          if (tmpHour < 1) {
            tmpHour = 12 + ' AM';
          } else {
            if (tmpHour > 12) {
              tmpHour -= 12;
              tmpHour = tmpHour + ' PM';
            } else {
              if (tmpHour == 12) {
                tmpHour = tmpHour + ' PM';
              } else {
                tmpHour = tmpHour + ' AM';
              }
            }
          }

          return {
            day: this.days[this.day].substring(0, 3),
            hour: tmpHour,
          };
        } else {
          return {
            day: '',
            hour: '',
          }
        }
      }
    },
    methods: {
      resetDate: function() {
        if (!this.visualizing) {
          var date = new Date();
          this.day = date.getDay();
          this.hour = date.getHours();
        } else {
          this.day = 1;
          this.hour = -1;
        }
      },
      visualizeDates: function() {
        if (!this.visualizing) {
          this.visualizing = true;
          this.day = 1;
          this.hour = 0;

          this.runVisualization();
        } else {
          this.visualizing = false;
        }
      },
      runVisualization: function() {
        if (this.visualizing) {
          const interval = 500;

          if (this.hour < 23) {
            this.hour++;
          } else {
            if (this.day < 7) {
              this.hour = 0;
              this.day++;
            } else {
              this.visualizing = false;
            }
          }

          if (this.visualizing) {
            setTimeout('window.preferences.runVisualization()', interval);
          }
        }
      }
    }
  });
});
