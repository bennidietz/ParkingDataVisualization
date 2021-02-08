<div>
  <canvas></canvas>
</div>

<script>

import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  methods: {
    render: function(animated) {
      var allData = []
      var capacity = 0;

      for (var i in preferences.filteredParkingLots) {
        var parkingLot = preferences.filteredParkingLots[i]
        var dataSet = Array.from({length: 6}, () => 0);
        for (var d in preferences.days.slice(1,7)) {
          const dayData = preferences.optimizedOcupancies[preferences.days.slice(1,7)[d]]
          if (parkingLot != null) {
            for (var hr in dayData) {
              capacity = Number(parkingLot.capacity);
              var occ = Number(dayData[hr][parkingLot.name])
              if (occ != -1) {
                var occupancy = ((capacity - occ) / capacity * 100).toFixed(2);
                dataSet[d] += Number(occupancy)
              }
            }
          }
        }
        for (var e in dataSet) {
          dataSet[e] = Math.round(dataSet[e] * 100 / 24) / 100 // we have data for 24 hours
        }
        allData.push(dataSet)
      }

      preferences.print("hier")
      preferences.print(allData)
      var chartdata = {
        datasets: []
      };
      

      var colors= ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
      'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
      'silver', 'teal', 'white', 'yellow'];

      for (var i in allData) {
        chartdata.datasets.push({
          radius: 1.5,
            data: allData[i],
            backgroundColor: colors[i],
            borderColor: colors[i],
            fill: false
          })
      }
      
      chartdata.labels = preferences.days.slice(1,7)

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
