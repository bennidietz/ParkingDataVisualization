<div class="popup__box" :class="{'active': selectedParkingLot != null}">
  <div class="popup__controls">
    <div class="popup__control-button fas" :class="{'fa-window-minimize': !popupMinimized, 'fa-window-maximize': popupMinimized}" @click="popupMinimized = !popupMinimized"></div>
    <div class="popup__control-button fas fa-times" @click="selectedParkingLot = null"></div>
  </div>
  <div class="popup__content" :class="{'h-hidden': popupMinimized}">
    <chart id="chart" ref="chart" style="width: 400px; max-width: 100%;" />
  </div>
</div>
