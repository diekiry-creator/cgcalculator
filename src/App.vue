<template>
  <v-app>
  <div class="d-flex align-stretch">
  <v-navigation-drawer height="100vh" width="auto" permanent>
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
             :to="'task' + item.id"
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

export default {
  name: 'App',
  components: {

  },

  data: () => ({
    items: [
      { id: '1', title: 'Task 1' },
      { id: '2', title: 'Task 2' },
      { id: '3', title: 'Task 3' },
    ],
    right: null,
  }),
};
</script>
