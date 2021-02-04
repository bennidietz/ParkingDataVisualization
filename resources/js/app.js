require('./bootstrap');

/*require('alpinejs');*/

global.$ = global.jQuery = require('jquery');
window.L = require('leaflet');
window.Rainbow = require('rainbowvis.js');
window.chart = require('chart.js');
window.moment = require('moment');

window.Vue = require('vue');
const chart = Vue.component("chart", () => import("./components/Chart.vue"));

$(document).ready(function() {
  window.preferences = new Vue({
    el: '#preferences',
    components: {
      'chart': chart,
    },
    data: {
      greenColor: 'rgba(84, 255, 69, 1)', //#54ff45
      greenColorLight: 'rgba(84, 255, 69, 0.1)',
      yellowColor: 'rgba(255, 208, 22, 1)',
      yellowColorLight: 'rgba(255, 208, 22, 0.1)',
      orangeColor: 'rgba(255, 128, 34, 1)',
      orangeColorLight: 'rgba(255, 128, 34, 0.1)',
      redColor: 'rgba(255, 69, 69, 1)',
      redColorLight: 'rgba(255, 69, 69, 0.1)',
      view: 'citizen',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      day: null,
      hour: null,
      visualizing: false,
      filters: {
        disabled: false,
        women: false,
        electric: false,
      },
      parkingLots: null,
      selectedParkingLot: null,
      popupMinimized: false,
      occupancy: null,
    },
    mounted() {
      this.resetDate();
      axios.get('/api/parking-lot')
      .then(response => (this.parkingLots = response.data))
      .finally(axios.get('/api/occupancy').then(response => (preferences.occupancy = response.data))
      .finally(() => preferences.init()));
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
      },
      filteredParkingLots: function() {
        if (this.parkingLots != null) {
          return this.parkingLots.filter(parkingLot => {
            return ((!this.filters.disabled || parseInt(parkingLot.capacity_disabled) > 0) && (!this.filters.women || parseInt(parkingLot.capacity_women) > 0) && (!this.filters.electric || parseInt(parkingLot.capacity_electric) > 0));
          })
        }

        return [];
      },
      optimizedOcupancies: function optimizedOcupancies() {
        var cpOccupancies = this.occupancy;
        for (var j in this.filteredParkingLots) {
        var lot = this.filteredParkingLots[j];
        var mo_th = this.disableHoursClosed(lot.opening_times_mo_to_th);
        var fr = this.disableHoursClosed(lot.opening_times_fr);
        var sa = this.disableHoursClosed(lot.opening_times_sa);
        var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday"]
        weekdays.forEach( d => {
          for (var h in cpOccupancies[d]) {
            if (h < mo_th[0] || h > mo_th[1]) {		
              cpOccupancies[d][h][lot.name] = -1
            }
          }
        });
        for (var h in cpOccupancies["Friday"]) {
          if (h < fr[0] || h > fr[1]) {		
            cpOccupancies["Friday"][h][lot.name] = -1
          }
          
        }
        for (var h in cpOccupancies["Saturday"]) {
          if (h < sa[0] || h > sa[1]) {		
            cpOccupancies["Saturday"][h][lot.name] = -1
          }
        }
        }
      return cpOccupancies;
      }
    },
    methods: {
      init: function() {
        init_map();
        this.$refs.chart.render(true);
      },
      disableHoursClosed: function(string) {
        var start = string.split(":")[0].match(/[0-9]+/g)
        if (start.length > 1) start = start[0]
        var end = string.split(":")[1].match(/[0-9]+/g)
        if (end.length > 1) end = end[0]
        if (end < start) end = 24
        return [Number(start), Number(end)]
      },
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
    },
    watch: {
      'view': function (newVal, oldVal) {
        if (this.parkingLots && this.occupancy) {
          this.$refs.chart.render(true);
          init_map();
        }
      },
      'selectedParkingLot': function (newVal, oldVal) {
        this.popupMinimized = false;

        if (this.parkingLots && this.occupancy) {
          this.$refs.chart.render(true);
          init_map();
        }
      },
      'day': function(newVal, oldVal) {
        if (this.parkingLots && this.occupancy && !this.visualizing) {
          this.$refs.chart.render(true);
          init_map();
        }
      },
      'hour': function(newVal, oldVal) {
        if (this.parkingLots && this.occupancy) {
          this.$refs.chart.render(false);
          init_map();
        }
      },
      'filters.disabled': function(newVal, oldVal) {
        if (this.parkingLots && this.occupancy) {
          init_map();
        }
      },
      'filters.women': function(newVal, oldVal) {
        if (this.parkingLots && this.occupancy) {
          init_map();
        }
      },
      'filters.electric': function(newVal, oldVal) {
        if (this.parkingLots && this.occupancy) {
          init_map();
        }
      }
    }
  });
});
