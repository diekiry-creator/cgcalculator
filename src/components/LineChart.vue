<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
  label: {
    type: Array,
    default: null
  },
  labels: {
    type: Array,
    default: null
  },
  data: {
    type: Array,
    default: null
  }
},

data: () => ({
  labelsName: [],
}),

  mounted() {
  var index;
  for (index = 1; index <= this.labels.length; ++index) {
    this.labelsName.push('Опыт ' + index)
  }
    this.renderChart(
      {
        labels: this.labelsName,
        datasets: [
          {
            label: this.label,
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
      }
    );
  }
};
</script>
