<template>
  <v-main class="bg-grey-lighten-3">
    <GridComponent ref="gridRef" :tidy-hub-api="tidyHubApi" />
    <AddButton @click="addToGrid()" />
  </v-main>
</template>

<script>
import AddButton from "@/components/AddButton.vue";
import GridComponent from "@/components/GridComponent.vue";
// import PostButton from "@/components/widgets/PostButton.vue";

export default {
  name: "MainPage",
  components: {
    GridComponent,
    AddButton,
    // PostButton,
  },
  data() {
    return {
      tidyHubApi: process.env.VUE_APP_HUB,
    };
  },
  methods: {
    addToGrid() {
      this.$refs.gridRef.addWidget();
    },
  },
};
</script>

<style src="@/css/MainPage.css" scoped></style>
