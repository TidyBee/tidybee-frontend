<template>
  <div class="full-height d-flex flex-column justify-center align-center red-bg">
    <div class="widget-title widget-fail-title text-left">
      {{ $t('dashboard.widgets.' + widgetName) }}
    </div>
    <br>
      <strong>
        {{ "Erreur lors de la récupération des informations" }}
      </strong>
    <br>
  </div>
</template>

<script>

export default {
  name: "ApiLoaderError",
  props: {
    widgetName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style src="" />