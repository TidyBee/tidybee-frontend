<template>
  <v-card class="rounded-rectangle" elevation="10">
    {{ 'tests' }}
    <ApiLoader :api-url="tidyHubApi" :widget-name="widgetTitle" :is-text-widget="true" class="full-height">
      <template #default="{ data }">
        <div v-if="data" class="full-height">
          <v-container fluid class="full-height">
            <v-row>
              {{ data }}
              <!-- <v-span
                v-if="data"
                class="widget-title"
                :data-cy="`textwidget-title`"
              >
              {{ $t(`dashboard.widgets.text.title.${parseJsonDataTitle(data)}`) }}
              </v-span> -->
            </v-row>

            <!-- <v-row
              v-if="data && parseJsonDataTypes(data) === 'Graph'"
              class="widget-graph-center"
            >
              <v-span>
                <v-progress-circular
                  v-if="parseJsonDataValue(data) !== undefined && parseJsonDataStatus(data) !== undefined"
                  :model-value="parseJsonDataValue(data)"
                  :size="100"
                  :width="10"
                  :color="parseJsonDataStatus(data) ? 'green' : 'red'"
                  class="widget-graph"
                  :data-cy="`textwidget-graph`"
                >
                  <v-row
                    class="grey-text"
                    align="center"
                    :data-cy="`textwidget-graph-value`"
                  >
                    {{ parseJsonDataValue(data) }}
                  </v-row>
                </v-progress-circular>
              </v-span>
            </v-row>

            <v-row
              v-if="data && parseJsonDataTypes(data) === 'Number'"
              class="widget-text-center"
            >
              <v-span
                :class="{ 'green-text': parseJsonDataStatus(data), 'red-text': !parseJsonDataStatus(data) }"
                :data-cy="`textwidget-number`"
              >
                {{ parseJsonDataValue(data) }}
              </v-span>
            </v-row>

            <v-row
              v-if="data && parseJsonDataPercentage(data) !== undefined"
              :class="{ 'green-text': parseJsonDataStatus, 'red-text': !parseJsonDataStatus }"
            >
              <v-span
                class="widget-text-bottom"
                :data-cy="`textwidget-text-bottom`"
              >
                {{ parseJsonDataPercentage(data) + $t("dashboard.widgets.text.percentage") }}
              </v-span>
            </v-row> -->
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
  methods: {
    parseJsonDataTitle(data) {
      try {
        let parsedData = JSON.parse(data);
        return parsedData.title || "";
      } catch (error) {
        console.error("Erreur lors du parsing JSON :", error);
        return null;
      }
    },
    parseJsonDataTypes(data) {
      try {
        let parsedData = JSON.parse(data);
        return parsedData.types || "";
      } catch (error) {
        console.error("Erreur lors du parsing JSON :", error);
        return null;
      }
    },
    parseJsonDataStatus(data) {
      try {
        let parsedData = JSON.parse(data);
        return parsedData.data && parsedData.data.status !== undefined ? parsedData.data.status : false
      } catch (error) {
        console.error("Erreur lors du parsing JSON :", error);
        return null;
      }
    },
    parseJsonDataPercentage(data) {
      try {
        let parsedData = JSON.parse(data);
        return parsedData.data && parsedData.data.percentage ? parsedData.data.percentage : ""
      } catch (error) {
        console.error("Erreur lors du parsing JSON :", error);
        return null;
      }
    },
    parseJsonDataValue(data) {
      try {
        let parsedData = JSON.parse(data);
        return parsedData.data && parsedData.data.value ? parsedData.data.value : 0
      } catch (error) {
        console.error("Erreur lors du parsing JSON :", error);
        return null;
      }
    }
  }
};
</script>


<style src="@/../css/components/dashboard/TextWidget.css" scoped></style>
