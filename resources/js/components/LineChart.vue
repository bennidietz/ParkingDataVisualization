
  <div>
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
    selectedPLot: {
      type: Number,
      default: null
    },
    hour: {
      type: Number,
      default: null
    }
  },
  mounted () {
    console.log(this.selectedPLot)
    if (this.selectedPLot) {
      console.log(this.selectedPLot)
      this.chartdata.backgroundColor[this.selectedPLot] = 'rgba(255, 99, 132, 1)'
    }
    this.renderChart(this.chartdata, this.options)
  }
}
</script>