<template>
    <v-container height="100vh" width="auto">
        <h1>{{query}}</h1>
        <v-divider></v-divider>
        <div id="chart1">
            <GChart
                    type="LineChart"
                    :data="chartData"
                    :options="chartOptions"
                    @ready="onChartReady"
                    ref="gChart"
            />
        </div>
    </v-container>
</template>

<script>
    import {GChart} from "vue-google-charts";

    export default {
        name: 'Task3',
        props: {
            query: {
                type: String,
                default: null
            },
        },
        components: {
            GChart
        },
        data() {
            return {
                chartData: null, // the chartData will be created once Chart is ready (needs google charts lib for this)
                chartOptions: {
                    title: 'Line intervals, default',
                    hAxis: {
                        title: 'Time'
                    },
                    vAxis: {
                        title: 'Popularity'
                    }
                }
            };
        },

        methods: {
            onChartReady(chart, google) {
                // now we have google lib loaded. Let create data table based using it.
                this.createDataTable(chart, google);

            },
            createDataTable(chart, google) {
                var data = new google.visualization.DataTable();
                data.addColumn('number', 'X');
                data.addColumn('number', 'Dogs');
                data.addRows([
                    [0, 0],
                    [1, 10],
                    [2, 23],
                    [3, 17],
                    [4, 18],
                    [5, 9],
                    [14, 42],
                    [15, 47],
                    [16, 44],
                    [17, 48],
                    [18, 52],
                    [19, 54],
                    [20, 42],
                    [21, 55],
                    [22, 56],
                    [23, 57],
                    [24, 60],
                    [25, 50],
                    [26, 52],
                    [27, 51],
                    [28, 49],
                    [29, 53],
                    [30, 55],
                    [41, 65],
                    [42, 63],
                    [43, 66],
                    [44, 67],
                    [45, 69],
                    [46, 69],
                    [47, 70],
                    [48, 72],
                    [49, 68],
                    [50, 66],
                    [51, 65],
                    [52, 67]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1,
                    {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    }
                ]);

                //this.chartData = data;
                chart.draw(view, this.chartOptions);
            }
        }
    }
</script>
