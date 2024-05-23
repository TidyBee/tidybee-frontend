<template>
  <v-card class="rounded-rectangle" elevation="10">
    <ApiLoader :api-url="tidyHubApi" :widget-name="widgetTitle" :is-text-widget="true" class="full-height">
      <template #default="{ data }">
        <div v-if="data" class="full-height">
          <v-container fluid class="full-height">
            <v-row>
              <v-span
                v-if="data && data.title"
                class="widget-title"
                :data-cy="`textwidget-title`"
              >
                {{ $t(`dashboard.widgets.text.title.${data.title}`) }}
              </v-span>
            </v-row>

            <v-row
              v-if="data && data.types === 'Graph' && data.data"
              class="widget-graph-center"
            >
              <v-span>
                <v-progress-circular
                  v-if="data.data.valuePercentage && data.data.status !== undefined"
                  :model-value="data.data.valuePercentage"
                  :size="100"
                  :width="10"
                  :color="data.data.status ? 'green' : 'red'"
                  class="widget-graph"
                  :data-cy="`textwidget-graph`"
                >
                  <v-row
                    class="grey-text"
                    align="center"
                    :data-cy="`textwidget-graph-value`"
                  >
                    {{ data.data.value }}
                  </v-row>
                </v-progress-circular>
              </v-span>
            </v-row>

            <v-row
              v-else-if="data && data.types === 'Number' && data.data"
              class="widget-text-center"
            >
              <v-span
                :class="{ 'green-text': data.data.status, 'red-text': !data.data.status }"
                :data-cy="`textwidget-number`"
              >
                {{ data.data.value }}
              </v-span>
            </v-row>

            <v-row
              :class="{ 'green-text': data && data.data.status, 'red-text': data && !data.data.status }"
            >
              <v-span
                v-if="data && data.data && data.data.percentage"
                class="widget-text-bottom"
                :data-cy="`textwidget-text-bottom`"
              >
                {{ data.data.percentage + $t("dashboard.widgets.text.percentage") }}
              </v-span>
            </v-row>
          </v-container>
        </div>
        <HelpButton :small="true" :text="`dashboard.widgets.text.help.` + data.title" />
      </template>
    </ApiLoader>
  </v-card>
</template>

<script>
import ApiLoader from "@/components/communication/ApiLoader.vue";
import HelpButton from "@/components/widgets/HelpButton.vue";

export default {
  name: "TextWidget",
  components: {
    ApiLoader,
    HelpButton
  },
  props: {
    widgetTitle: {
      type: String,
      required: true,
    },
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
};
</script>

<style src="@/../css/components/dashboard/TextWidget.css" scoped></style>
