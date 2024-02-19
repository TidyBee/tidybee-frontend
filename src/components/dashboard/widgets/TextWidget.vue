<template>
  <v-card class="rounded-rectangle" elevation="10">
    <div class="widget-title">
      {{ $t(`dashboard.widgets.text.title.${title}`) }}
    </div>

    <div v-if="types === 'Graph' && data">
      <v-progress-circular
        :model-value="data.valuePercentage"
        :size="110"
        :width="10"
        :color="data.status ? 'green' : 'red'"
        class="widget-graph"
      >
        <div class="grey-text">
          {{ data.value }}
        </div>
      </v-progress-circular>
    </div>

    <div
      v-else-if="types === 'Number' && data"
      :class="{ 'green-text': data.status, 'red-text': !data.status }"
      class="widget-text-center"
    >
      {{ data.value }}
    </div>

    <div
      :class="{ 'green-text': data.status, 'red-text': !data.status }"
      class="widget-text-bottom"
    >
      {{
        data && data.percentage
          ? data.percentage + $t("dashboard.widgets.text.percentage")
          : ""
      }}
    </div>
  </v-card>
</template>

<script>
export default {
  name: "TextWidget",
  props: {
    title: {
      type: String,
      required: true,
    },
    types: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style src="@/components/dashboard/widgets/css/TextWidget.css" scoped></style>
