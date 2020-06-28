<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container height="100vh" width="auto">
        <h1>{{query}}</h1>
        <v-divider></v-divider>
        <h2>Описание опыта</h2>
        <p class="text-justify">Структурно-механические и реологические свойства формовочных масс можно характеризовать
            пластической прочностью структуры,
            представляющей собой предельное напряжение сдвига, которое может выдерживать формовочная масса при
            статическом нагружении.</p>
        <p class="text-justify">Пластичность глин и каолинов обуславливается способностью частичек при взаимодействий с
            водой образовывать гидратные оболочки (адсорбционный слой) с ориентацией молекул воды, что придает глине
            высокую вязкость.
            По мере удаления от поверхности твердой частицы молекулы воды теряют ориентацию, образуя за молекулярным
            (адсорбционным) слоем слой рыхло связанной, а затем и свободной воды, свойства которой неизменны.
            Количество воды необходимое для создания адсорбционного слоя с небольшим избытком свободной воды
            соответствует значению оптимальной влажности формовочной массы, которую определяют по предельному напряжению
            сдвига.
            Пластическую прочность (предельное напряжение сдвига) Pk рассчитывают по общей вертикальной нагрузке F на
            конус равной отношению суммарных усилий вдоль поверхности конуса к площади его боковой поверхности(S = πrl),
            погруженной в массу. </p>
        <p>Величина предельного напряжения сдвига равна:</p>
        <v-img
                :aspect-ratio="16/9"
                :width="132"
                :height="53"
                src="../assets/task1.png"></v-img>
        <p class="text-justify">где: Pk - предельное напряжение сдвига, Па;
            <br>m -масса корпуса со штангой и добавочным грузом, кг;
            <br>a - ускорение свободного падения, м/с2;
            <br>h - глубина погружения конуса, м;
            <br>Ka - константа конуса, зависящая только от угла при вершине(на данной странице используется константы
            конуса предложенные П.А.Ребиндером). </p>
        <p class="text-justify">Величина предельного напряжения сдвига напрямую зависит от влажности массы.
            Ниже представлен график зависимости предельного напряжения сдвига от абсолютной влажности массы. </p>
        <v-img
                :aspect-ratio="16/9"
                :width="400"
                :height="300"
                src="../assets/task1g.png"></v-img>
        <v-divider></v-divider>
        <h2>Данные для расчёта</h2>
        <v-text-field
                v-model="postItem.weignt"
                type="number"
                :rules="[() => !!postItem.weignt || 'Это поле является обязательным']"
                label="Масса корпуса со штангой и добавочным грузом, кг"
                required
        ></v-text-field>
        <v-autocomplete
                ref="postItem.angular"
                v-model="postItem.angular"
                :rules="[() => !!postItem.angular || 'Это поле является обязательным']"
                :items="angulars"
                label="Угол при вершине конуса, градусы"
                required
        ></v-autocomplete>
        <v-text-field
                v-model="depthNum"
                type="number"
                :rules="[() => !!depthNum || 'Это поле является обязательным']"
                label="Количетсво погружений конуса"
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

                    <v-btn
                            @click="depthNumUpdate"
                            color="primary"
                            dark class="mb-2"
                    >
                        Обновить количество глубин
                        <br>погружения в таблице
                    </v-btn>
                    <v-spacer></v-spacer>
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
                                            <v-text-field type="number" v-model="editedItem.humidity"
                                                          label="Влажность, %"></v-text-field>
                                        </v-col>
                                        <v-row v-for="(depth, index) in editedItem.depth" :key="depth.id">
                                            <v-col cols="12">
                                                <v-text-field type="number" v-model="editedItem.depth[index]"
                                                              :label="'Глубина ' + (index + 1) + ', м'"></v-text-field>
                                            </v-col>
                                        </v-row>
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
                    <th class="text-left">Влажность, %</th>
                    <th class="text-left">Пластическая прочность</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in postItem.strenght" :key="item.id">
                    <td>{{ postItem.humidity[index] }}</td>
                    <td>{{ postItem.strenght[index] }}</td>
                </tr>
                </tbody>
            </template>

        </v-simple-table>

        <v-divider></v-divider>

        <line-chart v-if="loaded"
                    :label="label"
                    :labels="postItem.humidity"
                    :data="postItem.strenght"
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
            chartData: null, // the chartData will be created once Chart is ready (needs google charts lib for this)
            loaded: false,
            resultName: "График зависимости предельного напряжения сдвига от влажности",
            label: "Предельное напряжение сдвига, Па",
            hAxisTitle: "Влажность, %",
            vAxisTitle: "Предельное напряжение сдвига, Па",
            depthNum: 3,
            postItem: {
                depth: [],
                humidity: [],
                weignt: null,
                angular: null,
                strenght: [],
            },
            tableKey: 0,
            angulars: ['30', '45', '60', '90'],
            dialog: false,
            experiments: [],
            editedIndex: -1,
            editedItem: {
                humidity: 0,
                depth: [],
            },
            defaultItem: {
                humidity: 0,
                depth: [],
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

            depthNumUpdate() {
                this.headers = []
                this.editedItem.depth = []
                this.defaultItem.depth = []
                this.headers.push({text: 'Влажность', align: 'start', sortable: false, value: 'humidity'})
                for (let index = 0; index < this.depthNum; index++) {
                    this.editedItem.depth.push(0)
                    this.defaultItem.depth.push(0)
                    this.headers.push({text: 'Глубина ' + (index + 1), value: 'depth[' + index + ']'})
                }
                this.headers.push({text: 'Действия', value: 'actions'})
                this.tableRerender()
            },

            requestData() {
                this.postItem.depth = []
                this.postItem.humidity = []
                for (let index in this.experiments) {
                    this.postItem.humidity.push(Number(this.experiments[index].humidity))
                    this.postItem.depth.push(this.experiments[index].depth)
                }
                this.loaded = false
                axios.post('http://localhost:8082/task/1/calculate', this.postItem)
                    .then(response => {
                        this.postItem.strenght = response.data.strenght
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
                    this.editedItem.depth = Object.assign([], this.defaultItem.depth)
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
            this.depthNumUpdate()
        }
    }
</script>
