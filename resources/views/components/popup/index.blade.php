
<button type="button" @click="popupMinimized=!popupMinimized" class="popupBtn">_</button>
<button type="button" class="popupBtn" @click="selectedParkingLot = null">X</button>
<div :class="{'h-hidden': popupMinimized}">
    <chart id="chart" ref="chart" :options="{}"  />
</div>