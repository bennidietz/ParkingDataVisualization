<div>
  <canvas></canvas>
</div>

<script>

import { Bar, Line } from 'vue-chartjs';

export default {
  extends: Line,
  methods: {
    render: function(animated) {
      var allData = []
      var capacity = 0;

      for (var i in preferences.filteredParkingLots) {
        var parkingLot = preferences.filteredParkingLots[i]
        var dataSet = Array.from({length: 24}, () => 0);
        for (var d in preferences.days) {
          const dayData = preferences.optimizedOcupancies[preferences.days[d]]
          if (parkingLot != null) {
            for (var hr in dayData) {
              capacity = Number(parkingLot.capacity);
              var occ = Number(dayData[hr][parkingLot.name])
              if (occ != -1) {
                var occupancy = ((capacity - occ) / capacity * 100).toFixed(2);
                dataSet[hr] += Number(occupancy)
              }
            }
          }
        }
        for (var k in dataSet) {
          dataSet[k] = Math.round(dataSet[k]/6 * 100) / 100
          if (dataSet[k] == 0) dataSet[k] = null
        }
        allData.push(dataSet)
      }

      preferences.print(allData)

      var chartdata = {
        datasets: []
      };

      var colors= ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
      'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
      'silver', 'teal', 'white', 'yellow'];

      for (var i in allData) {
        chartdata.datasets.push({
            fill: false,
            borderWidth: 1,
            radius: 1.5,
            data: allData[i],
            backgroundColor: colors[i],
            borderColor: colors[i],
          })
      }

      chartdata.labels = Array.from({length: 24}, (v, k) => ((k > 12) ? (k-12) + " PM" : k + " AM") + " - " + ((k+1 > 12) ? (k+1-12) + " PM" : (k+1) + " AM"));

      var options = {
        title: {
          display: true,
          text: ["Average weekly", "(Mo-Sa)"],
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
          display: false,
          usePointStyle: true
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return "Occupancy: " + tooltipItem.yLabel  + " %"
            },
            title: function(tooltipItem, data) {
              return preferences.filteredParkingLots[tooltipItem[0]["datasetIndex"]].name
            }
          }
        },
        hover: {
          mode: 'dataset'
        }
      };

      options["onClick"] = function (e) {
        if (this.getElementsAtEvent(e)[0] != undefined) {
          preferences.selectedParkingLot = this.getElementsAtEvent(e)[0]._index;
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
