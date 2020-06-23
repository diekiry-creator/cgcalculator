<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-app>
        <div style="height:100%; width:auto" class="d-flex align-stretch">
            <v-navigation-drawer height="100%" width="auto" permanent>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title d-flex align-center">
                            <v-icon color="black">mdi-calculator</v-icon>
                            CGCalculator
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Расчет параметров керамики и стекла
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>
                <v-list dense nav>
                    <v-list-item link to="/">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Главная</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item
                            v-for="item in items"
                            :key="item.id"
                            link
                            :to="'task' + item.id + '?q=' + item.title"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <router-view/>

        </div>
    </v-app>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'App',
        components: {},
        data: () => ({
            items: [],
            right: null,
            loaded: true,
            showError: false,
            errorMessage: 'Please enter a package name'
        }),

        methods: {
            requestData() {
                this.loaded = false
                axios.get('http://localhost:8082/task')
                    .then(response => {
                        this.items = response.data
                        this.loaded = true
                    })
                    .catch(err => {
                        err.data
                        this.showError = true
                    })
            }
        },
        mounted() {
            this.requestData()
        }
    };
</script>
