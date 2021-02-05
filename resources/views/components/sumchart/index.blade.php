<div v-show="selectedParkingLot != null">
    <sumchartoverweek ref="sumchartoverweek" :options="{}"  />
</div>
<div v-show="selectedParkingLot == null">
    <sumchartoverweekall ref="sumchartoverweekall" :options="{}"  />
</div>
<div v-show="selectedParkingLot != null">
    <sumchartoverhours ref="sumchartoverhours" :options="{}"  />
</div>
<div v-show="selectedParkingLot == null">
    <sumchartoverhoursall ref="sumchartoverhoursall" :options="{}"  />
</div>