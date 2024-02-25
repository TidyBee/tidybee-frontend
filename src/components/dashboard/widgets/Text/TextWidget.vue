<template>
  <ApiLoader :api-url="tidyHubApi" class="full-height">
    <template #default="{ data }">
      <v-card class="rounded-rectangle" elevation="10">
        <div class="widget-title">
          {{ $t(`dashboard.widgets.text.title.${data.title}`) }}
        </div>

        <div v-if="data.types === 'Graph' && data.data">
          <v-progress-circular
            :model-value="data.data.valuePercentage"
            :size="110"
            :width="10"
            :color="data.data.status ? 'green' : 'red'"
            class="widget-graph"
          >
            <div class="grey-text">
              {{ data.data.value }}
            </div>
          </v-progress-circular>
        </div>
        <div
          v-else-if="data.types === 'Number' && data.data"
          :class="{ 'green-text': data.data.status, 'red-text': !data.data.status }"
          class="widget-text-center"
        >
          {{ data.data.value }}
        </div>

        <div
          :class="{ 'green-text': data.data.status, 'red-text': !data.data.status }"
          class="widget-text-bottom"
        >
          {{
            data.data && data.data.percentage
              ? data.data.percentage + $t("dashboard.widgets.text.percentage")
              : ""
          }}
        </div>
      </v-card>
    </template>
  </ApiLoader>
</template>

<script>
import ApiLoader from "@/components/ApiLoader.vue";

export default {
  name: "TextWidget",
  components: {
    ApiLoader,
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
};
</script>

<style src="@/components/dashboard/widgets/Text/css/TextWidget.css" scoped></style>
