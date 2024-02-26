<template>
  <ApiLoader :api-url="tidyHubApi" class="full-height">
    <template #default="{ data }">
      <v-card class="rounded-rectangle" elevation="10">
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
          <v-span> {{ $t(`dashboard.widgets.grade.title`) }} </v-span>
        </v-row>
      </v-card>
    </template>
  </ApiLoader>
</template>

<script>

import ApiLoader from "@/components/ApiLoader.vue";

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
      switch (grade) {
        case 'A':
          return '#2E93fA';
        case 'B':
          return '#66DA26';
        case 'C':
          return '#FF9800';
        case 'D':
          return '#E91E63';
        case 'E':
          return '#546E7A';
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
.rounded-rectangle {
  border-radius: 15px;
  background-color: white;
  height: 210px;
  width: 500px;
  margin-left: 80px;
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
}

.grade-text-pos {
  position: absolute;
  top: 35% !important;
  left: 70px;
  width: 160px !important;
  text-align: left;
}

.divider-pos {
  top: 0px !important;
  position: absolute;
}

</style>
