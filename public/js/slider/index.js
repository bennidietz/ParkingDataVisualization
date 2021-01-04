//days in a week
var now = new Date();
var weekShort = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
var weekLong = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

var sliderDays = d3
    .sliderBottom()
    .min(0)
    .max(6)
    .step(1)
    .width(300)
    .tickValues([0,1,2,3,4,5,6])
    .tickFormat(function (d) {
        return weekShort[d];
    })
    .default(englishDayToGerman(now.getDay()))
    .handle(
        d3
            .symbol()
            .type(d3.symbolCircle)
            .size(200)()
    )
    .on('onchange', val => {
        d3.select('p#value-Days').text(weekLong[val]);
    });

var gDays = d3
    .select('div#slider-Days')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

gDays.call(sliderDays);

d3.select('p#value-Days').text(weekLong[sliderDays.value()]);

function englishDayToGerman(dayNumber) {
    dayNumber--;
    if(dayNumber<0) {
        dayNumber = 7;
    }
    return dayNumber;
}

// hours in a day
var hours = d3.range(0, 24).map(function(d) {
    if(d<10){
        return "0"+d+":00"
    } else {
        return d+":00"
    }
});
var sliderHours = d3
    .sliderBottom()
    .min(0)
    .max(23)
    .step(1)
    .width(300)
    .tickValues(d3.range(24))
    .default(now.getHours())
    .handle(
        d3
            .symbol()
            .type(d3.symbolCircle)
            .size(200)()
    )
    .on('onchange', val => {
        d3.select('p#value-Hours').text(hours[val]);
    });

var gHours = d3
    .select('div#slider-Hours')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

gHours.call(sliderHours);

d3.select('p#value-Hours').text(hours[sliderHours.value()]);

