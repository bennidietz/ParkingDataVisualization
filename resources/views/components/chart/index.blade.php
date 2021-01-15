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
            label: 'Fee parking places',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgba(255, 165, 0, 1)',
            borderColor: 'rgba(255, 165, 0, 0.5)',
            radius: 4,
            borderWidth: 1
        }]
}" :options="{}" :selectedPLot="3" :hour="hour"/>


<script type="text/javascript" src="js/testdata.js"></script>
