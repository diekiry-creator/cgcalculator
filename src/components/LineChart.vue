<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
  labels: {
    type: Array,
    default: null
  },
  data: {
    type: Array,
    default: null
  }
},

  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: "Data 1",
            data: this.data,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "My Data"
        }
      }
    );
  }
};
</script>
