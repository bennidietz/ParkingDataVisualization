<h2>Chart view</h2>
<select name="parkingLots" id="parkingLots"></select>

<div id="plotArea">
    <div id="barPlotArea"></div>
    <div id="canvasBarPlot"></div>
    <div id="piePlotArea"></div>
</div>

<!--
<template>
  <div class="container">
    <line-chart
      v-if="parkingLots"
      :chartdata="[1,2,3,4,5,6]"/>
  </div>
</template>-->
<line-chart :chartdata="{labels: ['', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
}" :options="{}" :selectedPLot="3" :hour="hour"/>


<script type="text/javascript" src="js/testdata.js"></script>
