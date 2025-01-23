<template>
  <v-container fluid>
    <v-row justify="center" class="mt-12">
    {{ 'title' }}
    </v-row>
    <v-row justify="center" class="card">
      <v-card class="d-flex justify-center align-center" height="350" width="350" color="#DAE0F2">
        <span class="text-h2">Card {{ n }}</span>
      </v-card>
      <v-card class="d-flex justify-center align-center" height="350" width="350" color="#DAE0F2">
        <span class="text-h2">Card {{ n }}</span>
      </v-card>
      <v-card class="d-flex justify-center align-center" height="350" width="350" color="#DAE0F2">
        <span class="text-h2">Card {{ n }}</span>
      </v-card>
    </v-row>
    <v-row justify="center" class="buttonrow">
      <v-btn variant="outlined">
        Button 1
      </v-btn>
      <v-btn variant="outlined" center>
        Button 2
      </v-btn>
      <v-btn variant="outlined">
        Button 3
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "confPage",
  data() {
    return {
      settings: process.env.VUE_APP_WEBSOCKET_SETTINGS,
      length: 4,
      window: 0,
    };
  },
};
</script>

<style scoped>

.card{
  gap: 3%;
  margin-top: 12px;
}

.buttonrow{
  margin-top: 50px !important;
  gap: 23%;
}

</style>
