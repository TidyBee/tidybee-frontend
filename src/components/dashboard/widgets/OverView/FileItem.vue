<template>
  <v-row>
    <v-col cols="10">
      <div class="text-left"
        :data-cy="$t(`overviewwidget-fileitem-${replaceSpecificChar(parseFileName(file.pretty_path))}`)">
        {{ parseFileName(file.pretty_path) }}
      </div>
      <div class="text-left pt-3 text-grey-darken-1" data-cy="tidyscore-information" v-if="isOpen">
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
    <v-col cols="1">
      <span v-if="!isOpen"
        :data-cy="$t(`overviewwidget-fileitem-tidyscore-${replaceSpecificChar(parseFileName(file.pretty_path))}`)">
        {{ getGrade(file.tidy_score) }}
      </span>
      <apexchart v-if="isOpen" width="180" height="180" class="grade-graph" :options="chartOptions" :series="series" />
    </v-col>
    <v-col cols="1">
      <v-icon class="redirect-icon" :icon="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="isOpen = !isOpen"
        :data-cy="$t(`overviewwidget-fileitem-open-tidyscore-${replaceSpecificChar(parseFileName(file.pretty_path))}`)" />
    </v-col>
  </v-row>
  <v-divider></v-divider>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import { getGrade, getScoreGraphColors, calculateElapsedTime, formatFileSize } from "@/utils";


export default {
  name: "FileItem",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      series: [1, 1, 1, 1],
      chartOptions: {
        height: '100%',
        colors: getScoreGraphColors(this.file.tidy_score),
        name: getGrade(this.file.tidy_score),
        dataLabelTranslation: [this.$t('fileView.unused'), this.$t('fileView.heavy'), this.$t('fileView.misnamed'), this.$t('fileView.duplicated')],
        chart: {
          type: 'donut'
        },
        dataLabels: {
          enabled: true,
          formatter: function (value, { seriesIndex, dataPointIndex, w }) {
            value, dataPointIndex;
            return w.config.dataLabelTranslation[seriesIndex];
          },
          style: {
            colors: ['#000']
          },
          dropShadow: {
            enabled: false
          }
        },
        plotOptions: {
          pie: {
            expandOnClick: true,
            donut: {
              background: 'transparent',
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  label: "Score",
                  formatter: function (w) {
                    return w.config.name;
                  },
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#515151',
                }
              }
            },
          }
        },
        legend: {
          display: false,
          show: false,
        }
      },

    };
  },
  methods: {
    formatFileSize,
    getGrade,
    getScoreGraphColors,
    calculateElapsedTime,
    openDialog() {
      this.isOpen = true;
    },
    closeDialog() {
      this.isOpen = false;
    },
    parseFileName(pretty_path) {
      if (pretty_path.includes('/')) {
        const segments = pretty_path.split('/');
        const fileName = segments[segments.length - 1];
        return fileName;
      } else {
        return pretty_path;
      }
    },
    replaceSpecificChar(str) {
      const replaceStr = str.replace(/[./_]/g, '-');
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
