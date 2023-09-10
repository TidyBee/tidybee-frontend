<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="hasError">Error loading data</div>
    <div v-else>
      <slot :data="apiData"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      apiData: {},
      isLoading: false,
      hasError: false
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.isLoading = true;

      fetch(this.apiUrl)
        .then(response => response.json())
        .then(data => {
          this.apiData = data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          this.hasError = true;
          this.isLoading = false;
        });
    }
  }
}
</script>
  