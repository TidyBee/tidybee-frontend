<template>
  <v-card class="rounded-rectangle" elevation="10">
    <ApiLoader :api-url="tidyHubApi" widget-name="grade.widgetTitle" class="full-height">
      <template #default="{ data }">
        <div v-if="data">
          <v-row>
            <v-progress-circular
              :model-value="100"
              :size="177.5"
              :width="35"
              align="center"
              class="grade-pos"
              :style="{
                color: getGradeColor(data.grade),
              }"
            >
              <v-row align="center" justify="center">
                <v-span class="grade">
                  {{ data.grade }}
                </v-span>
              </v-row>
            </v-progress-circular>
          </v-row>
          <v-divider vertical class="divider-pos"></v-divider>
          <v-row class="grade-text-pos">
            <v-span>
              {{ $t(`dashboard.widgets.grade.title`) }}
            </v-span>
          </v-row>
        </div>
      </template>
    </ApiLoader>
  </v-card>
</template>

<script>

import ApiLoader from "@/front/utils/websockets/ApiLoader.vue";

const GRADE_COLORS = {
  A: '#2196F3',
  B: '#4CAF50',
  C: '#FAB239',
  D: '#EA4335',
  E: '#546E7A',
};

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
    getGradeColor(grade) {
      return GRADE_COLORS[grade] || '';
    },
  }
};
</script>

<style scoped src="./WidgetGrade.css"> </style>