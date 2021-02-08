<div>
  <canvas></canvas>
</div>

<script>

import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  methods: {
    dayColor: function(data) {
      var output = [];
      for (var i = 0; i < 6; i++) {
        var occ_ratio = Number(data[i])
        var isSelected = preferences.day == i+1;
        if (occ_ratio > 85) {
          output.push((isSelected) ? preferences.redColor : preferences.redColorLight);
        } else if (occ_ratio > 70) {
          output.push((isSelected) ? preferences.orangeColor : preferences.orangeColorLight);
        } else if (occ_ratio > 55) {
          output.push((isSelected) ? preferences.yellowColor : preferences.yellowColorLight);
        } else {
          output.push((isSelected) ? preferences.greenColor : preferences.greenColorLight);
        }
      }
      return output;
    },
    render: function(animated) {
      const parkingLot = (preferences.selectedParkingLot != null) ? preferences.parkingLots[preferences.selectedParkingLot] : null;
      var data = Array.from({length: 6}, () => 0);
      var capacity = 0;

      for (var d in preferences.days.slice(1,7)) {
        const dayData = preferences.optimizedOcupancies[preferences.days.slice(1,7)[d]]
        if (parkingLot != null) {
          for (var hr in dayData) {
            capacity = Number(parkingLot.capacity);
            var occ = Number(dayData[hr][parkingLot.name])
            if (occ != -1) {
              var occupancy = ((capacity - occ) / capacity * 100).toFixed(2);
              data[d] += Number(occupancy)
            }
          }
        }
      }

      for (var e in data) data[e] = Math.round(data[e] / 24 * 100) / 100 // we have data for 24 hours
      console.log(data)
      var chartdata = {
        datasets: [
          {
            fill: false,
            borderWidth: 1,
            radius: 4
          }
        ]
      };

      chartdata.labels = preferences.days.slice(1,7)

      chartdata.datasets[0].data = data;
      chartdata.datasets[0].backgroundColor = this.dayColor(data, capacity);
      chartdata.datasets[0].borderColor = this.dayColor(data, capacity);
      var options = {
        title: {
          display: true,
          text: ["Average daily occupancies", "(24 hours)"],
          fontSize: 14,
          fontColor: 'orange',
          padding: 20
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              beginAtZero: true,
              max: 100,
              fontSize: 10,
              fontColor: 'rgb(192,192,192)'
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 10,
              fontColor: 'rgb(192,192,192)'
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return "Occupancy: " + tooltipItem.yLabel  + " %"
            }
          }
        }
      };

      options["onClick"] = function (e) {
        if (this.getElementsAtEvent(e)[0] != undefined) {
          preferences.day = this.getElementsAtEvent(e)[0]._index + 1;
        }
      }

      if (!animated) {
        options["animation"] = { duration: 0 };
      }
      
      this.renderChart(chartdata, options);
    }
  }
}

</script>
