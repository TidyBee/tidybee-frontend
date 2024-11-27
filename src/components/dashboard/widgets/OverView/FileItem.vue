<template>
  <v-row>
    <v-col cols="1">
      <img
        v-if="file.provenance === 'agent'"
        src="./assets/intern-icon.svg"
        style="width: 20px; height: 20px; vertical-align: middle; margin-top: -3px;"
        alt="Intern Icon"
        class="icon"
      />
      <img
        v-else-if="file.location === 'notion'"
        src="./assets/notion-icon.svg"
        alt="Notion Icon"
        class="icon"
      />
      <img
        v-else-if="file.location === 'googleDrive'"
        src="./assets/google-drive-icon.svg"
        alt="Google Drive Icon"
        class="icon"
      />
    </v-col>
    <v-col cols="2">
      <div
        class="text-left"
        :data-cy="(`overviewwidget-fileitem-${replaceSpecificChar(parseFileName(file.pretty_path))}`)"
      >
        {{ parseFileName(file.pretty_path) }}
      </div>
      <div
        v-if="isOpen" class="text-left pt-2 pb-4 text-grey-darken-1 text-no-wrap text-caption"
        data-cy="tidyscore-information"
      >
        {{ $t("fileView.general") }}
        <br>
        &nbsp;&nbsp;{{ $t("fileView.type") + parseFileType(file.pretty_path) }}
        <br>
        &nbsp;&nbsp;{{ $t("fileView.size") + formatFileSize(file.size) }}
        <br>
        &nbsp;&nbsp;{{ $t("fileView.lastUsed") + calculateElapsedTime(file.last_modified.secs_since_epoch) +
          $t("fileView.ago") }}
        <br>
        &nbsp;&nbsp;{{ $t("fileView.placement") + parseFilePlace(file.pretty_path) }}
      </div>
    </v-col>
    <v-col cols="3">
      <span
        v-if="!isOpen"
        :data-cy="(`overviewwidget-fileitem-size-${replaceSpecificChar(parseFileName(file.pretty_path))}`)"
      >
        {{ formatFileSize(file.size) }}
      </span>
    </v-col>
    <v-col cols="3">
      <span
        v-if="!isOpen"
        :data-cy="(`overviewwidget-fileitem-date-${replaceSpecificChar(parseFileName(file.pretty_path))}`)"
      >
        {{ calculateElapsedTime(file.last_modified.secs_since_epoch) }}
      </span>
    </v-col>
    <v-col cols="2">
      <span
        v-if="!isOpen"
        :data-cy="(`overviewwidget-fileitem-tidyscore-${replaceSpecificChar(parseFileName(file.pretty_path))}`)"
      >
        {{ file.tidy_score.grade }}
      </span>
      <TidyScore
        v-if="isOpen" :pie-data="getPieData(file.tidy_score, tab)"
        :series-data="getSeriesData(file.tidy_score, tab)" :pie-color="getGradeColor(file?.tidy_score?.grade)"
        :score="file.tidy_score.grade" :t="$t" :tab="tab"
      >
      </TidyScore>
    </v-col>
    <v-col cols="1">
      <v-icon
        class="redirect-icon" :icon="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        :data-cy="`overviewwidget-fileitem-toggle-tidyscore-${replaceSpecificChar(parseFileName(file.pretty_path))}`"
        @click="isOpen = !isOpen"
      />
    </v-col>
  </v-row>
  <v-divider></v-divider>
</template>

<script>
import TidyScore from "@/components/dashboard/widgets/OverView/TidyScore.vue";
import { getGrade, formatFileSize, calculateElapsedTime, parseFileName, getGradeColor } from "@/utils";

export default {
  name: "FileItem",
  components: {
    TidyScore,
  },
  props: {
    file: {
      type: Object,
      required: true,
    },
    tab: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      isOpen: false,
    };
  },
  watch: {
    tab() {
      this.isOpen = false;
    }
  },
  methods: {
    formatFileSize,
    getGrade,
    getGradeColor,
    calculateElapsedTime,
    parseFileName,
    getConfigurations(tidyScore, tab) {
      switch (tab) {
        case 'misnamed':
          return (tidyScore?.misnamed?.configurations);
        case 'duplicated':
          return (tidyScore?.duplicated?.configurations);
        case 'unused':
          return (tidyScore?.unused?.configurations);
        default:
          return;
      }
    },
    getPieData(tidyScore, tab) {
      if (tab == 'all') {
        return ([
          tidyScore?.misnamed?.grade,
          tidyScore?.duplicated?.grade,
          tidyScore?.unused?.grade
        ])
      }
      if (!!tidyScore[tab] && !!tidyScore[tab].grade) {
        return ([tidyScore[tab].grade]);
      }
      return([]);
      // let data = [];
      // const configurations = this.getConfigurations(tidyScore, tab);
      // if (configurations != null && configurations.length > 0) {
      //   for (let i = 0; i < configurations.length; i++) {
      //     data.push(configurations[i].grade);
      //   }
      // }
      // return data;
    },
    getSeriesData(tidyScore, tab) {
      if (tab == 'all') {
        return ([
          { value: 1, name: 'fileView.misnamed', label: { show: false } },
          { value: 1, name: 'fileView.duplicated', label: { show: false } },
          { value: 1, name: 'fileView.unused', label: { show: false } },
        ])
      }
      return ([{ value: 1, name: 'fileView.' + tab, label: { show: false } }]);
      // let data = [];
      // const configurations = this.getConfigurations(tidyScore, tab);
      // if (configurations != null && configurations.length > 0) {
      //   configurations.forEach((config) => {
      //     data.push({ value: 1, name: config.name, label: { show: false } });
      //   })
      // }
      // return data;
    },
    openDialog() {
      this.isOpen = true;
    },
    closeDialog() {
      this.isOpen = false;
    },
    replaceSpecificChar(str) {
      const replaceStr = str.replace(/[./_]/g, "-");
      return replaceStr;
    },
    parseFileType(pretty_path) {
      const fileName = this.parseFileName(pretty_path);
      if (fileName.includes('.')) {
        const segments = fileName.split('.');
        const fileType = segments[segments.length - 1];
        return fileType;
      } else {
        return "N/A";
      }
    },
    parseFilePlace(pretty_path) {
      if (pretty_path.includes('/')) {
        const segments = pretty_path.split('/');
        let filePath = segments[0];
        for (let i = 1; i < segments.length - 2; i++)
          filePath += '/' + segments[i];
        return filePath;
      } else {
        return 'root';
      }
    }
  }
};
</script>

<style src="@/../css/components/dashboard/FileItem.css" scoped></style>