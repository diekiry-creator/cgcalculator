<template>
  <v-container height="100vh" width="auto">
    <h1>{{query}}</h1>

    <v-text-field
           v-model="postItem.weignt"
           type="number"
           :rules="[() => !!postItem.weignt || 'This field is required']"
           label="Вес"
           required
         ></v-text-field>
    <v-autocomplete
           ref="postItem.angular"
           v-model="postItem.angular"
           :rules="[() => !!postItem.angular || 'This field is required']"
           :items="angulars"
           label="Угол"
           required
         ></v-autocomplete>

         <v-data-table
           :headers="headers"
           :items="experiments"
           sort-by="calories"
           class="elevation-1"
         >
           <template v-slot:top>
             <v-toolbar flat color="white">
               <v-toolbar-title>My CRUD</v-toolbar-title>
               <v-divider
                 class="mx-4"
                 inset
                 vertical
               ></v-divider>
               <v-spacer></v-spacer>
               <v-dialog v-model="dialog" max-width="500px">
                 <template v-slot:activator="{ on }">
                   <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                 </template>
                 <v-card>
                   <v-card-title>
                     <span class="headline">{{ formTitle }}</span>
                   </v-card-title>

                   <v-card-text>
                     <v-container>
                       <v-row>
                         <v-col cols="12" sm="6" md="4">
                           <v-text-field type="number" v-model="editedItem.humidity" label="Влажность"></v-text-field>
                         </v-col>
                         <v-col cols="12" sm="6" md="4">
                           <v-text-field type="number" v-model="editedItem.depth1" label="Глубина 1"></v-text-field>
                         </v-col>
                         <v-col cols="12" sm="6" md="4">
                           <v-text-field type="number" v-model="editedItem.depth2" label="Глубина 2"></v-text-field>
                         </v-col>
                         <v-col cols="12" sm="6" md="4">
                           <v-text-field type="number" v-model="editedItem.depth3" label="Глубина 3"></v-text-field>
                         </v-col>
                       </v-row>
                     </v-container>
                   </v-card-text>

                   <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                     <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
           <template v-slot:no-data>
             <v-btn color="primary" @click="initialize">Reset</v-btn>
           </template>
         </v-data-table>

    <v-btn class="ma-2" tile color="success" dark @click="requestData">Рассчитать</v-btn>
    <v-btn class="ma-2" tile outlined color="success">Очистить</v-btn>

    <h1 v-if="loaded">Расчеты</h1>
    <v-text-field v-if="loaded" v-model="postItem.strenght" label="Пластическая прочность"></v-text-field>
    <line-chart v-if="loaded" :labels="postItem.humidity" :data="postItem.strenght"></line-chart>

  </v-container>
</template>

<script>
  import axios from 'axios'

  import LineChart from '@/components/LineChart'

  export default {
    name: 'Task1',
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
      loaded: false,

      postItem: {
        depth: [],
        humidity: [],
        weignt: null,
        angular: null,
        strenght: [],
      },
      //
      angulars: ['30','45', '60', '90'],
      //
      dialog: false,
      headers: [
      {
        text: 'Влажность',
        align: 'start',
        sortable: false,
        value: 'humidity',
      },
      { text: 'Глубина 1', value: 'depth1' },
      { text: 'Глубина 2', value: 'depth2' },
      { text: 'Глубина 3', value: 'depth3' },
      { text: 'Действия', value: 'actions', sortable: false }
    ],
    experiments: [],
    editedIndex: -1,
    editedItem: {
      humidity: 0,
      depth1: 0,
      depth2: 0,
      depth3: 0,
    },
    defaultItem: {
      humidity: 0,
      depth1: 0,
      depth2: 0,
      depth3: 0,
    }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      taskTitle(id) {
        let item  = this.items.find((item) => item.id == id)
        return item.title

    },
    requestData () {
      this.loaded = false
      axios.post('http://192.168.1.159:8082/task/1/calculate', this.postItem)
      .then(response => {
        this.postItem.strenght = response.data.strenght
        this.loaded = true
      })
      .catch(err => {
        err.data
    })
   },

   initialize () {
      this.experiments = []
      },

   editItem (item) {
  this.editedIndex = this.experiments.indexOf(item)
  this.editedItem = Object.assign({}, item)
  this.dialog = true
},

deleteItem (item) {
  const index = this.experiments.indexOf(item)
  confirm('Are you sure you want to delete this item?') && this.experiments.splice(index, 1)
},

close () {
  this.dialog = false
  this.$nextTick(() => {
    this.editedItem = Object.assign({}, this.defaultItem)
    this.editedIndex = -1
  })
},

save () {
  if (this.editedIndex > -1) {
    Object.assign(this.experiments[this.editedIndex], this.editedItem)
  } else {
    this.experiments.push(this.editedItem)

    const depth = []
    depth.push(this.editedItem.depth1)
    depth.push(this.editedItem.depth2)
    depth.push(this.editedItem.depth3)
    this.postItem.humidity.push(this.editedItem.humidity)
    this.postItem.depth.push(depth)
  }
  this.close()
},
   }
  }
</script>
