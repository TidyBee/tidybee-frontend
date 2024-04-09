<template>
  <v-card class="rounded-rectangle" elevation="10">
    <ApiLoader :api-url="tidyHubApi" widget-name="grade.widgetTitle" class="full-height">
      <template #default="{ data }">
        <div v-if="data">
          <v-row>
            <v-progress-circular
              :model-value="100"
              :size="160"
              :width="20"
              align="center"
              class="grade-pos"
              :style="{
                color: getGradeColor(data.grade),
              }"
              :data-cy="`gradewidget-grade`"
            >
              <v-row align="center" justify="center">
                <v-span class="grade" :data-cy="`gradewidget-grade-value`">
                  {{ data.grade }}
                </v-span>
              </v-row>
            </v-progress-circular>
          </v-row>
          <v-divider vertical class="divider-pos"></v-divider>
          <v-row class="grade-text-pos">
            <v-span :data-cy="`gradewidget-text`">
              {{ $t(`dashboard.widgets.grade.title`) }}
            </v-span>
          </v-row>
        </div>
        <HelpButton text="dashboard.widgets.grade.help" />
      </template>
    </ApiLoader>
  </v-card>
</template>

<script>
import ApiLoader from "@/components/communication/ApiLoader.vue";
import HelpButton from "@/components/widgets/HelpButton.vue";
import { getGradeColor } from "@/utils";

export default {
  name: "GradeWidget",
  components: {
    ApiLoader,
    HelpButton
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
  methods: {
    getGradeColor,
  }
};
</script>

<style src="@/../css/components/dashboard/GradeWidget.css" scoped></style>
