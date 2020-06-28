<script>
    import {Line} from "vue-chartjs";
    export default {
        extends: Line,
        props: {
            label: {
                type: String,
                default: null
            },
            labels: {
                type: Array,
                default: null
            },
            data: {
                type: Array,
                default: null
            },
            xAxesLabel: {
                type: String,
                default: ""
            },
            yAxesLabel: {
                type: String,
                default: ""
            },
            legendLabel: {
                type: String,
                default: ""
            }
        },

        data: () => ({
            newData: [],
            labelsName: [],
        }),

        mounted() {
            var index;
            for (index = 0; index < this.labels.length; ++index) {
                this.newData.push({x: Number(this.labels[index]), y: Number(this.data[index])})
            }
            this.renderChart(
                {
                    datasets: [
                        {
                            label: this.label,
                            data: this.newData,
                            backgroundColor: "transparent",
                            borderColor: "rgba(1, 116, 188, 0.50)",
                            pointBackgroundColor: "rgba(171, 71, 188, 1)"
                        }
                    ]
                },
                {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            scaleLabel: {
                                labelString: this.xAxesLabel,
                                display: true
                            }
                        }],
                        yAxes: [{
                            type: 'linear',
                            scaleLabel: {
                                labelString: this.yAxesLabel,
                                display: true
                            }

                        }]
                    },
                    title: {
                      display: true,
                      text: this.legendLabel
                    },
                    legend: {
                        display: true,
                        text: this.legendLabel

                    }
                }
            );
        }
    };
</script>
