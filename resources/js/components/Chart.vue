<div>
  <canvas></canvas>
</div>

<script>

import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  methods: {
    dayColor: function(reversed, data, capacity) {
      console.log(data)
      console.log(capacity)
      var output = [];
      // preferences.redColorLight, preferences.redColor
      if (reversed) {
        for (var i = 0; i < 24; i++) {
          var isSelected = preferences.hour != null && i == preferences.hour;
          output.push((isSelected) ? preferences.orangeColor : preferences.orangeColorLight);
        }
      } else {
        for (var i = 0; i < 24; i++) {
          var free_ratio = data[i] / capacity
          var isSelected = preferences.hour != null && i == preferences.hour;
          if (free_ratio < 0.15) {
            output.push((isSelected) ? preferences.redColor : preferences.redColorLight);
          } else if (free_ratio < 0.3) {
            output.push((isSelected) ? preferences.orangeColor : preferences.orangeColorLight);
          } else if (free_ratio < 0.45) {
            output.push((isSelected) ? preferences.yellowColor : preferences.yellowColorLight);
          } else {
            output.push((isSelected) ? preferences.greenColor : preferences.greenColorLight);
          }
        }
      }
      return output;
    },
    getAverageOccupancies: function(reversed) {
      var output = [];
      const dayData = preferences.optimizedOcupancies[preferences.days[preferences.day]];

      for (var h in dayData) {
        var occupancyHour = 0;

        for (var p in preferences.parkingLots) {
          var d = dayData[h][preferences.parkingLots[p].name];
          occupancyHour += d;
        }

        if (reversed) {
          var c = this.getAllCapacities();
          occupancyHour = c - occupancyHour;
        }

        output.push(occupancyHour);
      }

      return output;
    }, getAllCapacities: function() {
      var output = 0;

      for (var p in preferences.parkingLots) {
        var c = Number(preferences.parkingLots[p].capacity);
        output += c;
      }

      return output;
    }, render: function(animated) {
      var reversed = preferences.view != "citizen";
      const parkingLot = (preferences.selectedParkingLot != null) ? preferences.parkingLots[preferences.selectedParkingLot] : null;
      const dayData = preferences.optimizedOcupancies[preferences.days[preferences.day]];
      var data = [];
      var capacity = 0;

      if (parkingLot != null) {
        for (var hr in dayData) {
          capacity = Number(parkingLot.capacity);
          if (reversed) {
            var occ = dayData[hr][parkingLot.name]
            if (occ != -1) {
              var occupancy = ((capacity - occ) / capacity * 100).toFixed(2);
              data.push(occupancy);
            } else {
              data.push(-1)
            }
          } else {
             data.push(dayData[hr][parkingLot.name]);
          }
        }
      } else {
        data = this.getAverageOccupancies(reversed);
        capacity = this.getAllCapacities();
      }

      var chartdata = {
        datasets: [
          {
            fill: false,
            borderWidth: 1,
            radius: 4
          }
        ]
      };

      chartdata.labels = Array.from({length: 24}, (v, k) => ((k > 12) ? (k-12) + " PM" : k + " AM") + " - " + ((k+1 > 12) ? (k+1-12) + " PM" : (k+1) + " AM"));

      chartdata.datasets[0].data = data;
      chartdata.datasets[0].backgroundColor = this.dayColor(reversed, data, capacity);
      chartdata.datasets[0].borderColor = this.dayColor(reversed, data, capacity);

      var options = {
        title: {
          display: true,
          text: (reversed) ?  preferences.days[preferences.day] + ": Occupancy of parking spaces" : preferences.days[preferences.day] + ": Free parking spaces",
          fontSize: 14,
          fontColor: 'orange',
          padding: 20
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              beginAtZero: true,
              max: (reversed) ? 100 : capacity,
              fontSize: 10
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 10
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return (reversed) ? "Occupancy: " + tooltipItem.yLabel  + " %" : tooltipItem.yLabel + " free parking spaces"
            }
          }
        }
      };

      options["onClick"] = function (e) {
        if (this.getElementsAtEvent(e)[0] != undefined) {
          preferences.hour = this.getElementsAtEvent(e)[0]._index;
        }
      }

      if (!animated) {
        options["animation"] = { duration: 0 };
      }      

      chartdata.datasets[0]["label"] = (reversed) ? 'Occupied parking places in %' : 'Free parking places';
      this.renderChart(chartdata, options);
    }
  }
}

</script>
