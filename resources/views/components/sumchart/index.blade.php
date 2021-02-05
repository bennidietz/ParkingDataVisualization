<div v-show="selectedParkingLot != null && view == 'analyst'">
    <sumchartoverweek ref="sumchartoverweek" :options="{}"  />
</div>
<div v-show="selectedParkingLot == null && view == 'analyst'">
    <sumchartoverweekall ref="sumchartoverweekall" :options="{}"  />
</div>
<div v-show="selectedParkingLot != null && view == 'analyst'">
    <sumchartoverhours ref="sumchartoverhours" :options="{}"  />
</div>
<div v-show="selectedParkingLot == null && view == 'analyst'">
    <sumchartoverhoursall ref="sumchartoverhoursall" :options="{}"  />
</div>