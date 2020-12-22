days = []
parkingLots = []
chartNumber = 1

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

class ParkingLot {
    constructor(name) {
        this.name = name;
        this.data = {};
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

function barPlotTimeLine(parkingLot) {
    hourlyData = parkingLot.getDataForHours()
    var id = "bar-chart" + chartNumber
    chartNumber++
    keys = []
    for (i = 0; i < 24; i++) keys.push(i + ":00 - " + (i+1) + ":00")
    $("#barPlotArea").append('<canvas id="' + id + '"></canvas>');
    var ctx = document.getElementById(id).getContext('2d');
    $("#" + id).css("max-width", "1000px")
    var barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: keys,
            datasets: [{
                label: 'Number of parking lots occupied',
                data: Object.values(hourlyData),
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: true,
                text: "Occupancy of " + parkingLot.name,
                fontSize: 18
            },
            'onClick' : function (evt) {
                var activePoints = barChart.getElementsAtEvent(evt);
                if (activePoints[0]) {
                    var selectedIndex = activePoints[0]._index;
                    pieChart(parkingLot, selectedIndex)
                }
            }
        }
    });
      
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
    barPlotTimeLine(parkingLots[0])
    $("#piePlotArea").append("<h3>Please click on one of the bars to show a pie chart for that hour...</h3>")
    $("#parkingLots").on("change", function() {
        $("#barPlotArea").empty()
        $("#piePlotArea").empty()
        $("#piePlotArea").append("<h3>Please click on one of the bars to show a pie chart for that hour...</h3>")
        lotName = $(this).find('option:selected').attr("value")
        lot = findParkingLotByName(lotName)
        barPlotTimeLine(lot)
    })
};