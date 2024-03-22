<template>
  <ApiLoader :api-url="tidyHubApi" class="full-height">
    <template #default="{ data }">
      <v-card v-if="data" class="rounded-rectangle" elevation="10">
        <v-row>
          <v-progress-circular
            :model-value="100"
            :size="160"
            :width="20"
            align="center"
            class="grade-pos"
            :style="{ 
              color: getGradeColor(data.grade) 
            }"
            :data-cy="$t(`gradewidget-grade`)"
          >
            <v-row align="center" justify="center">
              <v-span 
                class="grade"
                :data-cy="$t(`gradewidget-grade-value`)"
              >
                {{ data.grade }}
              </v-span>
            </v-row>
          </v-progress-circular>
        </v-row>
        <v-divider vertical class="divider-pos"></v-divider>
        <v-row class="grade-text-pos">
          <v-span :data-cy="$t(`gradewidget-text`)"> 
            {{ $t(`dashboard.widgets.grade.title`) }} 
          </v-span>
        </v-row>
      </v-card>
    </template>
  </ApiLoader>
</template>

<script>

import ApiLoader from "@/components/communication/ApiLoader.vue";
import { getGradeColor } from "@/utils";

export default {
  name: "GradeWidget",
  components: {
    ApiLoader,
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