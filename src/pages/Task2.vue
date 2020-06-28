<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container height="100vh" width="auto">
    <h1>{{query}}</h1>
    <v-divider></v-divider>
    <h2>Описание опыта</h2>
    <v-divider></v-divider>
    <h2>Данные для расчёта</h2>
    <v-text-field
            v-model="t0"
            type="number"
            :rules="[() => !!t0 || 'Это поле является обязательным']"
            label="Начальная температура образца, °C"
            required
    ></v-text-field>
    <v-text-field
            v-model="l0"
            type="number"
            :rules="[() => !!l0 || 'Это поле является обязательным']"
            label="Начальная длина образца, мм"
            required
    >
    </v-text-field>

    <v-data-table
            :headers="headers"
            :items="experiments"
            class="elevation-1"
            :locale="ru"
            :key="tableKey"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Добавить строку</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field type="number" v-model="editedItem.modelLength"
                                    label="Длина образца, мм"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field type="number" v-model="editedItem.temperature"
                                    label="Температура нагрева, °C"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Отмена</v-btn>
                <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
                small
                @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-btn class="ma-2" tile color="success" dark @click="requestData">Рассчитать</v-btn>

    <h1 v-if="loaded">Расчёты</h1>
    <v-simple-table v-if="loaded">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Температура нагрева, °C</th>
          <th class="text-left">Тепловое расширение, %</th>
          <th class="text-left">Средний температурный коэффициент <br>линейного расширения</th>
          <th class="text-left">Истинный температурный коэффициент <br>линейного расширения</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in postItem.temperature" :key="item.id">
          <td>{{ postItem.temperature[index] }}</td>
          <td>{{ postItem.dL[index] }}</td>
          <td>{{ postItem.am[index] }}</td>
          <td>{{ postItem.ar[index] }}</td>
        </tr>
        </tbody>
      </template>

    </v-simple-table>

    <v-divider></v-divider>

    <line-chart v-if="loaded"
                :label="label"
                :labels="postItem.temperature"
                :data="postItem.dL"
                :legendLabel="resultName"
                :xAxesLabel="hAxisTitle"
                :yAxesLabel="vAxisTitle"
    ></line-chart>

  </v-container>
</template>

<script>
  import axios from 'axios'

  import LineChart from '@/components/LineChart'

  export default {
    name: 'Task2',
    props: {
      query: {
        type: String,
        default: null
      },
    },
    components: {
      LineChart
    },

    data: () => ({
      chartData: null, // the chartData will be created once Chart is ready (needs google charts lib for this)
      loaded: false,
      resultName: "График зависимости теплового расширения от температуры наргева",
      label: "Тепловое расширение, %",
      hAxisTitle: "Температура нагрева, °C",
      vAxisTitle: "Тепловое расширение, %",
      t0: null,
      l0: null,
      headers: [
      { text: 'Температура нагрева, °C', value: 'temperature' },
      { text: 'Длина образца, мм', value: 'modelLength' }],
      postItem: {
        modelLength: [],
        temperature: [],
        am: [],
        ar: [],
        dL: [],
      },
      tableKey: 0,
      dialog: false,
      experiments: [],
      editedIndex: -1,
      editedItem: {
        modelLength: 0,
        temperature: 0
      },
      defaultItem: {
        modelLength: 0,
        temperature: 0
      }
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Добавить' : 'Редактировать'
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },
    methods: {

      taskTitle(id) {
        let item = this.items.find((item) => item.id == id)
        return item.title
      },

      update() {
        this.headers.push({text: 'Действия', value: 'actions'})
        this.tableRerender()
      },

      requestData() {
        this.postItem.modelLength = []
        this.postItem.temperature = []
        this.postItem.modelLength.push(Number(this.l0))
        this.postItem.temperature.push(Number(this.t0))
        for (let index in this.experiments) {
          this.postItem.modelLength.push(Number(this.experiments[index].modelLength))
          this.postItem.temperature.push(Number(this.experiments[index].temperature))
        }
        this.loaded = false
        axios.post('http://localhost:8082/task/2/calculate', this.postItem)
                .then(response => {
                  this.postItem.dL = response.data.dL
                  this.postItem.am = response.data.am
                  this.postItem.ar = response.data.ar
                  this.loaded = true
                })
                .catch(err => {
                  err.data
                })
      },

      editItem(item) {
        this.editedIndex = this.experiments.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.depth = Object.assign([], item.depth)
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.experiments.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.experiments.splice(index, 1)
      },

      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.experiments[this.editedIndex], this.editedItem)
        } else {
          this.experiments.push(this.editedItem)
        }
        this.close()
      },

      tableRerender() {
        this.tableKey += 1;
      }
    },
    mounted() {
      this.update()
    }
  }
</script>
