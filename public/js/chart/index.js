days = []
parkingLots = []
chartNumber = 1
absoulte_height = $(document).height()

class DateInTime {
    constructor(day, month, year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }

    equals(compareDate) {
        return this.getDate() == compareDate.getDate() && this.getMonth() == compareDate.getMonth() && this.getFullYear() == compareDate.getFullYear()
    }
}

class ParkingChart {
    constructor(type, backgroundFill) {
        this.type = type
        this.backgroundFill = backgroundFill
    }
}

lineChart = new ParkingChart("line", false)
barChart = new ParkingChart("bar", true)

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
        for (i in this.data) {
            hoursData[new Date(i).getHours()].push(this.data[i])
        }
        for (i in hoursData) hoursData[i] = average(hoursData[i])
        return hoursData
    }
}

function findParkingLotByName(name) {
    for (index in parkingLots) {
        if (parkingLots[index].name == name) {
            return parkingLots[index]
        }
    }
    return null
}

function getDayChart(ctx, parkingLot, parkingChart, reversed) {
    hourlyData = parkingLot.getDataForHours()
    if (reversed) {
        for (i in hourlyData) {
            hourlyData[i] = parkingLot.capacity - hourlyData[i]
        }
    }
    var label = (reversed) ? 'Number of free parking lots' : 'Number of occupied parking lots'
    var backgroundColor = (reversed) ? 'rgba(0, 153, 76, 0.4)' : 'rgba(255, 159, 64, 0.4)'
    var borderColor = (reversed) ? 'rgba(0, 153, 76, 1)' : 'rgba(255, 159, 64, 1)'
    var grey = 'rgb(211,211,211)'
    console.log(hourlyData)
    return new Chart(ctx, {
        type: parkingChart.type,
        data: {
            labels: keys,
            datasets: [{
                data: Object.values(hourlyData),
                fill: parkingChart.backgroundFill,
                borderWidth: 1,
                borderColor: grey,
                pointRadius: function(context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    return index == 5 ? 5 : 2.5;
                },
                pointBorderColor: function(context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    return index == 5 ? 'red' : grey;
                },
                pointBackgroundColor: function(context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    return index == 5 ? 'red' : grey;
                }
            }]
        },
        options: {
            legend: {
                display: false
             },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: Math.round(parkingLot.capacity / 5 / 50) * 50,
                        max: parkingLot.capacity
                    },
                }]
            },
            title: {
                display: true,
                text: (reversed) ? 'Free parking' : 'Occupied parking',
                fontColor: borderColor,
                padding: 10,
                fontSize: 17
            },
            'onClick' : function (evt) {
                var activePoints = this.getElementsAtEvent(evt);
                if (activePoints[0]) {
                    var selectedIndex = activePoints[0]._index;
                    pieChart(parkingLot, selectedIndex)
                }
            }
        }
    });
}

function barPlotTimeLine(parkingLot, parkingChart, reverse=false) {
    var chartType = barChart
    var id = "day-chart" + chartNumber
    chartNumber++
    keys = []
    for (i = 0; i < 24; i++) keys.push(i + ":00 - " + (i+1) + ":00")
    $("#barPlotArea").append('<div class="header"><input type="radio" id="barChart' + chartNumber + '"checked><label for="barChart' + chartNumber + '">Bar Chart</label>' + 
    '<input type="radio" id="lineChart' + chartNumber + '"><label for="lineChart' + chartNumber + '">Line Chart</label></div>' + 
    '<div class="header right"><input type="checkbox" id="reverse' + chartNumber + '"><label for="reverse' + chartNumber + '">Reverse</label>');
    $("#canvasBarPlot").append('<canvas id="' + id + '"></canvas>');
    var ctx = document.getElementById(id).getContext('2d');
    var fixedChartNumber = chartNumber
    $("#" + id).css("max-width", "100%")
    $("#" + id).css("max-height", absoulte_height/5 + "px")
    $("#" + id).css("height", absoulte_height/5 + "px")
    var domChart = getDayChart(ctx, parkingLot, parkingChart, reverse)
    $("#barChart" + fixedChartNumber).click(function() {
        chartType = barChart
        $("#lineChart" + fixedChartNumber).prop("checked", false)
        $("#canvasBarPlot").empty()
        $("#canvasBarPlot").append('<canvas id="' + id + '"></canvas>');
        var ctx = document.getElementById(id).getContext('2d');
        domChart = getDayChart(ctx, parkingLot, chartType, reverse)
    })
    $("#lineChart" + fixedChartNumber).click(function() {
        chartType = lineChart
        $("#barChart" + fixedChartNumber).prop("checked", false)
        $("#canvasBarPlot").empty()
        $("#canvasBarPlot").append('<canvas id="' + id + '"></canvas>');
        var ctx = document.getElementById(id).getContext('2d');
        domChart = getDayChart(ctx, parkingLot, chartType, reverse)
    })
    $("#reverse" + fixedChartNumber).click(function() {
        reverse = this.checked
        $("#canvasBarPlot").empty()
        $("#canvasBarPlot").append('<canvas id="' + id + '"></canvas>');
        var ctx = document.getElementById(id).getContext('2d');
        domChart = getDayChart(ctx, parkingLot, chartType, reverse)
    })
}

function pieChart(parkingLot, hour) {
    $("#piePlotArea").empty()
    occupied = parkingLot.getDataForHours()[hour]
    capacity = 0
    for (i in basedata["0"]) {
        if(basedata["0"][i][1] == parkingLot.name) {
            capacity = basedata["0"][i][2]
        }
    }
    console.log("Occupied: " + occupied + " ; Capacity: " + capacity)
    var id = "pie-chart" + chartNumber
    chartNumber++
    $("#piePlotArea").append('<canvas id="' + id + '"></canvas>');
    new Chart(document.getElementById(id), {
        type: 'pie',
        data: {
          labels: ["Free", "Occupied"],
          datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#3cba9f", "#c45850"],
            data: [(capacity-occupied), occupied]
          }]
        },
        options: {
          title: {
            display: true,
            text: "Occupancy of " + parkingLot.name + " between " + hour + ":00 and " + (hour+1) + ":00",
            fontSize: 18
          }
        }
    });
}

window.onload = () => {
    for (i = 0; i < testdata["0"].length; i++) {
        element = testdata["0"][i]
        if (i == 0) {
            // header of the data
            for (j = 1; j < element.length; j++) {
                parkingLots.push(new ParkingLot(element[j]))
            }
        } else {
            date = moment(element[0]).toDate()
            days.push(date)
            for (j = 0; j < parkingLots.length; j++) {
                parkingLots[j].data[date] = element[j + 1]
            }
        }
    }
    for (index in parkingLots) {
        pName = parkingLots[index].name
        $("#parkingLots").append('<option value="' + pName + '">' + pName + '</option>')
    }
    barPlotTimeLine(parkingLots[0], barChart)
    $("#parkingLots").on("change", function() {
        $("#barPlotArea").empty()
        $("#canvasBarPlot").empty()
        $("#piePlotArea").empty()
        $("#piePlotArea").append("<h3>Please click on one of the bars to show a pie chart for that hour...</h3>")
        lotName = $(this).find('option:selected').attr("value")
        lot = findParkingLotByName(lotName)
        barPlotTimeLine(lot, barChart)
    })
};


options = {
legend: {
    display: false
    },
scales: {
    yAxes: [{
        ticks: {
            beginAtZero: true,
            stepSize: Math.round(10 / 5 / 50) * 50,
            max: 10
        },
    }]
},
title: {
    display: true,
    text: (reversed) ? 'Free parking' : 'Occupied parking',
    fontColor: 'rgba(0, 153, 76, 1)',
    padding: 10,
    fontSize: 17
},
'onClick' : function (evt) {
    var activePoints = this.getElementsAtEvent(evt);
    if (activePoints[0]) {
        var selectedIndex = activePoints[0]._index;
        pieChart(parkingLot, selectedIndex)
    }
}
}

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata, options)
  }
}
