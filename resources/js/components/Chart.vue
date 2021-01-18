
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
            backgroundColor: 'rgba(255, 165, 0, 1)',
            borderColor: 'rgba(255, 165, 0, 1)',
            borderWidth: 1,
            radius: 4
        }]}
chartdata.labels = Array.from({length: Object.keys(hourlyData).length}, (v, k) => k + ":00 - " + (k+1) + ":00")
chartdata.datasets[0].data = hourlyData

export default {
  extends: Bar,
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    selectedparkinglot: {
      type: Number,
      default: null
    },
    hour: {
      type: Number,
      default: null
    }
  },
  methods: {
    render: function(animated) {
      console.log(preferences.day)
      if (this.hour && this.hour < chartdata.datasets[0].backgroundColor.length) {
        let log = this.selectedparkinglot
          var selectedColor = function(context) {
              var index = context.dataIndex;
              return index == log ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 165, 0, 1)';
          }
          chartdata.datasets[0].pointBackgroundColor = selectedColor
          chartdata.datasets[0].pointBorderColor = selectedColor
      }
      this.renderChart(chartdata, this.options)
      }
  }

}
</script>
