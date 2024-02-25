<template>
  <ApiLoader :api-url="tidyHubApi" class="full-height">
    <template #default="{ data }">
      <v-card class="rounded-rectangle" elevation="10">
        <v-container fluid>
          <v-row>
            <v-span class="widget-title">
              {{ $t(`dashboard.widgets.text.title.${data.title}`) }}
            </v-span>
          </v-row>

          <v-row v-if="data.types === 'Graph' && data.data" class="widget-graph-center">
            <v-span>
              <v-progress-circular
                :model-value="data.data.valuePercentage"
                :size="110"
                :width="10"
                :color="data.data.status ? 'green' : 'red'"
                class="widget-graph"
              >
                <v-row class="grey-text" align="center">
                  {{ data.data.value }}
                </v-row>
              </v-progress-circular>
            </v-span>
          </v-row>

          <v-row v-else-if="data.types === 'Number' && data.data" class="widget-text-center">
            <v-span :class="{ 'green-text': data.data.status, 'red-text': !data.data.status }">
              {{ data.data.value }}
            </v-span>
          </v-row>

          <v-row :class="{ 'green-text': data.data.status, 'red-text': !data.data.status }">
            <v-span class="widget-text-bottom">
              {{
                data.data && data.data.percentage
                  ? data.data.percentage + $t("dashboard.widgets.text.percentage")
                  : ""
              }}
            </v-span>
          </v-row>
        </v-container>
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
