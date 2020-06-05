<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          1,
          1.5,
          3,
          4,
          8.8,
          10,
          11
        ],
        datasets: [
          {
            label: "Data 1",
            data: [
             { x: 0, y: 300 },
             { x: 1, y: 223 },
             { x: 2, y: 450 },
             { x: 3, y: 750 },
             { x: 4, y: 888 }
            ],
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
