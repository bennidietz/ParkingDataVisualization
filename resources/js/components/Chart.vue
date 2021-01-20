
  <div>
    <div id="plotArea">
        <div id="barPlotArea"></div>
        <div id="canvasBarPlot"></div>
        <div id="piePlotArea"></div>
    </div>
    <canvas></canvas>
  </div>


<script>
import { Bar } from 'vue-chartjs'

var chartdata = {datasets: [{
    fill: false,
    borderWidth: 1,
    radius: 4
}]}
chartdata.labels = Array.from({length: 24}, (v, k) => k + ":00 - " + (k+1) + ":00")

export default {
  extends: Bar,
  methods: {
    dayColor: function(data, capacity, color, secondColor) {
      console.log(data)
      console.log(capacity)
      var output = []
      for (var i = 0; i < 24; i++) {
        if (preferences.hour && i == preferences.hour) {
          output.push(secondColor)
        } else {
          output.push(color)
        }
      }
      return output
    },
    getAverageOccupancies: function(reversed) {
      var output = []
      const dayData = preferences.occupancy[preferences.days[preferences.day]]
      for (var h in dayData) {
        var occupancyHour = 0
        for (var p in preferences.parkingLots) {
          var d = dayData[h][preferences.parkingLots[p].name]
          occupancyHour += d
        }
        if (reversed) {
          var c = this.getAllCapacities()
          occupancyHour = c - occupancyHour
        }
        output.push(occupancyHour)
      }
      return output
    }, getAllCapacities: function() {
      var output = 0
      for (var p in preferences.parkingLots) {
        var c = Number(preferences.parkingLots[p].capacity)
        output += c
      }
      return output
    }, render: function(animated) {
      var reversed = preferences.view != "citizen"
      const parkingLot = (preferences.selectedParkingLot != null) ? preferences.parkingLots[preferences.selectedParkingLot] : null
      const dayData = preferences.occupancy[preferences.days[preferences.day]]
      var data = []
      var capacity = 0
      if (parkingLot != null) {
        for (var hr in dayData) {
          capacity = Number(parkingLot.capacity)
          if (reversed) {
            data.push(capacity - dayData[hr][parkingLot.name])
          } else {
             data.push(dayData[hr][parkingLot.name])
          }
        }
      } else {
        data = this.getAverageOccupancies(reversed)
        capacity = this.getAllCapacities()
      }
      chartdata.datasets[0].data = data
      chartdata.datasets[0].backgroundColor = this.dayColor(data, capacity, preferences.redColorLight, preferences.redColor)
      chartdata.datasets[0].borderColor = this.dayColor(data, capacity, preferences.redColorLight, preferences.redColor)
      var options = {}
      if (!animated) {
          options["animation"] = { duration: 0 }
      }
      options["scales"] = {}
      options["scales"]["yAxes"] = [{
        ticks: {
            min: 0,
            beginAtZero: true,
            max: capacity
        }
      }]
      options["onClick"] = function (e) {
        preferences.hour = this.getElementsAtEvent(e)[0]._index + 1
      }
      chartdata.datasets[0]["label"] = (reversed) ? 'Occupied parking places' : 'Free parking places'
      renderChart(chartdata, options)
    }
  }

}
</script>
