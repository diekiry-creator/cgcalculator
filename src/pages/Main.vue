<template>
  <v-container  height="inherit" width="auto">
    <v-row class="pl-12 pr-12" justify="center" align="center">
      <v-col height="100%" cols="auto" justify="center" align="center">
        <v-img
          :src="require('../assets/logo.png')"
          contain
          height="300"
          width="300"
        />
      </v-col>
      <v-col height="100%" width="100%" justify="center" align="center">
        <v-card class="pa-3" outlined>
          <p class="text-justify" style="font-weight: bold; font-size: 20pt;">Ceramic-Glass Calculator</p>
          <p class="text-justify" style="font-size: 15pt; color: gray;">Технический калькулятор, который включает набор онлайн-инструментов для автоматизации и упрощения расчетов параметров стекла и керамики.</p>
        </v-card>
      </v-col>
      </v-row>
    <v-row class="pl-12 pr-12" justify="center" align="center" style="background-color: #e0e0e0;">
      <v-col>
        <v-divider></v-divider>
        <p class="text-center" style="font-weight: bold; font-size: 20pt;">Начало работы с онлайн калькулятором</p>
        <p class="text-justify" style="font-size: 15pt;">Для начала работы требуется выбрать из списка необходимый раздел, находящийся в левой части экрана. Для каждого расчета необходимо вводить требуемые показатели и данные, такие как масса образцов, температура обжига, влажность и так далее. Большинство расчетов предполагает построение графиков. Каждый расчет снабжен дополнительными справочными материалами, а также иллюстративно подкреплен формулами.</p>
        <v-divider></v-divider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Main',

    data: () => ({
    //
    }),
  }
</script>
