<template>
  <v-container height="100vh" width="auto">
    <h1>{{query}}</h1>
  </v-container>
</template>

<script>
  export default {
    name: 'Task3',
    props: {
    query: {
      type: String,
      default: null
    },
  },
    data: () => ({
    //
    }),
  }
</script>
