
  <div>
    <div id="plotArea">
        <div id="barPlotArea"></div>
        <div id="canvasBarPlot"></div>
        <div id="piePlotArea"></div>
    </div>
    <canvas></canvas>
  </div>


<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    selectedparkinglot: {
      type: Number,
      default: null
    },
    hour: {
      type: Number,
      default: null
    }
  },
  mounted () {

    if (this.selectedparkinglot && this.selectedparkinglot < this.chartdata.datasets[0].backgroundColor.length) {
      this.chartdata.datasets[0].backgroundColor[this.selectedparkinglot] = 'rgba(255, 255, 255, 1)';
    }

    this.renderChart(this.chartdata, this.options)
  }
}
</script>
