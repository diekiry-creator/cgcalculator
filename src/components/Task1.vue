<template>
  <v-container height="100vh" width="auto">
    <h1>Task1</h1>

    <v-btn class="ma-2" tile color="success" dark @click="requestData">Рассчитать</v-btn>
    <v-btn class="ma-2" tile outlined color="success">Очистить</v-btn>

    <div class="error-message" v-if="showError">
      {{ errorMessage }}
    </div>
    <line-chart v-if="loaded"></line-chart>

  </v-container>
</template>

<script>
  import axios from 'axios'

  import LineChart from '@/components/LineChart'

  export default {
    name: 'Task1',
    components: {
          LineChart
        },

    data: () => ({
      loaded: true,
      showError: false,
      errorMessage: 'Please enter a package name'
    }),

    methods: {
    requestData () {
      this.loaded = false
      axios.post('http://192.168.1.159:8081/task/1/calculate',
      {
      "depth": [[0.0055, 0.005, 0.006],
      [0.0101, 0.0096, 0.0106],
      [0.0147, 0.0142, 0.0152],
      [0.0221, 0.0216, 0.0226],
      [0.0323, 0.0318, 0.0328],
      [0.0425, 0.042, 0.043] ],
      "humidity": [15.5, 17.7, 19.9, 22.1, 24.3, 26.5],
      "weignt": 0.1,
      "angular": 90,
      "amountMeasurements": 3,
      "numberExperiment": 6,
      "strenght": null
      })
      .then(response => {
        response.data
        this.loaded = true
      })
      .catch(err => {
        err.data
        this.showError = true
    })
   }
   }
  }
</script>
