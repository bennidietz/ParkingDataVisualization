<div class="slider__output">
  <div class="slider__output-day">@{{ date.day }}</div>
  <div class="slider__output-hour">@{{ date.hour }}</div>
</div>
<div class="slider__controls">
  <select id="day" class="slider__day" name="day" v-model="day" size="1">
    <option :value="index" v-for="(day, index) in days" v-if="index > 0">@{{ day }}</option>
  </select>
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
