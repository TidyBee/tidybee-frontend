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
        <!-- <HelpButton text="dashboard.widgets.grade.help" /> -->
      </template>
    </ApiLoader>
  </v-card>
</template>

<script>
import ApiLoader from "./../../../../../utils/websockets/ApiLoader.vue";
// import HelpButton from "@/components/widgets/HelpButton.vue";

export default {
  name: "GradeWidget",
  components: {
    ApiLoader,
    // HelpButton
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
  methods: {
    getGradeColor(grade) {
      switch (grade) {
        case 'A':
          return '#2196F3';
        case 'B':
          return '#4CAF50';
        case 'C':
          return '#FAB239';
        case 'D':
          return '#EA4335';
        case 'E':
          return '#546E7A';
        default:
          return '';
      }
    },
  }
};
</script>

<style scoped>
.rounded-rectangle {
  border-radius: 15px;
  background-color: white;
  height: 210px;
  width: 500px;
  margin-top: 40px;
}

.grade {
  font-size: 30px;
  font-weight: bold;
  color: #515151 !important;
}

.grade-pos {
  top: 35px;
  left: 305px;
}

.grade-text {
  font-size: 14px;
  height: fit-content;
}

.grade-text-pos {
  position: absolute;
  height: 100%;
  top: 0 !important;
  left: 70px;
  width: 160px !important;
  align-content: center;
  margin: 0;
  text-align: left;
}

.divider-pos {
  top: 0px !important;
  position: absolute;
}
</style>