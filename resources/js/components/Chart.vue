
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
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  methods: {
    dayColor: function(color, secondColor) {
      var output = []
      for (var i = 0; i <= 24; i++) {
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
      var reversed = preferences.view == "citizen"
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
      if (reversed) {
        chartdata.datasets[0].backgroundColor = this.dayColor(preferences.redColorLight, preferences.redColor)
        chartdata.datasets[0].borderColor = this.dayColor(preferences.redColorLight, preferences.redColor)
      } else {
        chartdata.datasets[0].backgroundColor = this.dayColor(preferences.aspectColorLight, preferences.aspectColor)
        chartdata.datasets[0].borderColor = this.dayColor(preferences.aspectColorLight, preferences.aspectColor)
      }
      if (!animated) {
          this.options["animation"] = { duration: 0 }
      }
      this.options["yAxes"] = [{
        ticks: {
            min: 0,
            stepSize: 20
        }
      }]
      this.options["onClick"] = function (e) {
        preferences.hour = this.getElementsAtEvent(e)[0]._index
      }
      chartdata.datasets[0]["label"] = (reversed) ? 'Occupied parking places' : 'Free parking places'
      this.options.yAxes[0].ticks["max"] = capacity
      preferences.view
      this.renderChart(chartdata, this.options)
    }
  }

}
</script>
