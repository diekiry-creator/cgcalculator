<template lang="html">
    <v-container height="100vh" width="auto">
        <h1>{{query}}</h1>
        <v-divider></v-divider>
        <div class="component-wrapper">
            <GChart
                    type="LineChart"
                    :data="chartData"
                    :options="chartOptions"
            />
        </div>
    </v-container>
</template>

<script>
    import { GChart } from 'vue-google-charts'
    export default {
        name: 'Task4',
        props: {
            query: {
                type: String,
                default: null
            }},
        data: () => ({
            // Array will be automatically processed with visualization.arrayToDataTable function
            chartData: [
                ['Age', 'Salary'],
                ['18',  567],
                ['20',  612],
                ['25',  800],
                ['30',  980],
                ['40',  1410],
                ['50',  2350]
            ],
            chartOptions: {
                chart: {
                    title: 'Company Performance',
                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                }
            }
        }),
        components: {
            GChart
        },
        methods: {
        }
    }
</script>