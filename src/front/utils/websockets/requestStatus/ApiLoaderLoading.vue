<template>
  <div class="full-height d-flex justify-center align-center">
    <div class="widget-title">{{ $t('dashboard.widgets.' + widgetName) }}</div>
    <v-progress-circular indeterminate :size="80" :width="12"></v-progress-circular>
  </div>
</template>

<script>

export default {
  name: "ApiLoaderLoading",
  props: {
    widgetName: {
      type: String,
      required: true,
    },
  }
};
</script>

<style scoped> </style>