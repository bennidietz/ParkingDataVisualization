<div class="slider__output">
  <div class="slider__output-day">@{{ date.day }}</div>
  <div class="slider__output-hour">@{{ date.hour }}</div>
</div>
<div class="slider__controls">
  <div class="slider__days">
    <div class="slider__day" :class="{'active': day == index}" v-for="(tmpDay, index) in days" v-if="index > 0" @click="day = index">@{{ tmpDay.substring(0, 2) }}</div>
  </div>
  <input id="hour" class="slider__hour" name="hour" v-model="hour" type="range" min="0" max="23" step="1" />
  <div class="slider__buttons">
    <div class="slider__button h-clickable h-transition-fast" @click="resetDate()">
      <div class="slider__button-icon fa" :class="{'fa-calendar-day': !visualizing, 'fa-undo': visualizing}"></div>
      <div class="slider__button-label">@{{ !visualizing ? 'Set Now' : 'Reset' }}</div>
    </div>
    <div class="slider__button h-clickable h-transition-fast" @click="visualizeDates()">
      <div class="slider__button-icon fa" :class="{'fa-play': !visualizing, 'fa-stop': visualizing}"></div>
      <div class="slider__button-label">@{{ !visualizing ? 'Visualize' : 'Stop' }}</div>
    </div>
  </div>
</div>
