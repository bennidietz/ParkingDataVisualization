
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

class ParkingLot {
    constructor(name, capacity=1000) {
        this.name = name;
        this.data = {};
        this.capacity = capacity
    }

    getDataForHours() {
        var hoursData = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 
                            11: [], 12: [], 13: [], 14: [], 15: [], 16: [], 17: [], 18: [], 19: [], 20: [],
                            21: [], 22: [], 23: [], 24: [] }
        var hour_counter = 0
        const average = arr => Math.round(arr.reduce( ( p, c ) => p + c, 0 ) / arr.length);
        for (let i in this.data) {
            hoursData[new Date(i).getHours()].push(this.data[i])
        }
        for (let i in hoursData) hoursData[i] = average(hoursData[i])
        return hoursData
    }

    getDataForHoursAsArray() {
      let output = []
      var hData = this.getDataForHours()
      for (let key in Object.keys(hData)) {
        if (!Number.isNaN(hData[key])) {
          output.push(hData[key])
        }
      }
      return output
    }
}

var parkingLots = []
var days = []

for (let i = 0; i < testdata["0"].length; i++) {
    let element = testdata["0"][i]
    if (i == 0) {
        // header of the data
        for (let j = 1; j < element.length; j++) {
            parkingLots.push(new ParkingLot(element[j]))
        }
    } else {
        let date = moment(element[0]).toDate()
        days.push(date)
        for (let j = 0; j < parkingLots.length; j++) {
            parkingLots[j].data[date] = element[j + 1]
        }
    }
}

var hourlyData = parkingLots[1].getDataForHoursAsArray()
var chartdata = {datasets: [{
            label: 'Fee parking places',
            fill: false,
            borderWidth: 1,
            radius: 4
        }]}
chartdata.labels = Array.from({length: Object.keys(hourlyData).length}, (v, k) => k + ":00 - " + (k+1) + ":00")

export default {
  extends: Bar,
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  methods: {
    dayColor: function(color) {
      var output = []
      for (var i = 0; i <= 24; i++) {
        if (i == preferences.hour) {
          output.push('rgba(255,130,0,1)')
        } else {
          output.push(color)
        }
      }
      return output
    }, render: function(animated) {
      const parkingLot = (preferences.selectedParkingLot) ? preferences.parkingLots[preferences.selectedParkingLot] : null
      console.log(parkingLot)
      const dayData = preferences.occupancy[preferences.days[preferences.day]]
      console.log(dayData)
      var data = []
      if (parkingLot) {
        for (var hr in dayData) {
          data.push(dayData[hr][parkingLot.name])
        }
      } else {
        //TODO: average
      }
      chartdata.datasets[0].data = data
      console.log(preferences.hour)
      if (preferences.hour) {
          chartdata.datasets[0].backgroundColor = this.dayColor('rgba(255, 255, 255, 1)')
          //chartdata.datasets[0].backgroundColor[preferences.hour] = 'rgba(255, 255, 255, 1)'
          //chartdata.datasets[0].pointBorderColor = selectedColor
      }
      this.renderChart(chartdata, this.options)
    }
  }

}
</script>
