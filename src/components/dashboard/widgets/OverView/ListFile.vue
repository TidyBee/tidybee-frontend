<template>
  <ApiLoader :api-url="tidyHubApi" class="full-height">
    <template #default="{ data }">
      <v-container>
        <v-row>
          <v-col cols="11">
            <div class="text-left">
              {{ $t("dashboard.widgets.overView.filters.filtersLabel") }}
            </div>
          </v-col>
          <v-col cols="1">
            <v-icon @click="openFiltreDialog">
              <img 
                src="@/assets/filterIcon.svg" 
                alt="Filter Icon" 
                style="width: 20px; height: 20px; cursor: pointer;"
              />
            </v-icon>
          </v-col>
          <v-divider></v-divider>
        </v-row>
        <v-row>
          <v-virtual-scroll :height="340" :items="sortedFileList(data)">
            <template #default="{ item }">
              <v-list-item v-if="sortWithTidyScore(item.tidy_score)" cols="12">
                <FileItem :file="item" />
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-row>
        <v-dialog v-model="dialogFiltre" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">
                {{ $t("dashboard.widgets.overView.filters.filtersLabel") }}
              </span>
            </v-card-title>
            <v-card-text>
              <v-select 
                v-model="selectedFilter" 
                :items="filterOptions" 
                :label="$t('dashboard.widgets.overView.filters.sortedByLabel')"
              >
              </v-select>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="closeFiltreDialog">
                {{ $t('dashboard.widgets.overView.filters.closeButtonLabel') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </template>
  </ApiLoader>
</template>

<script>
import ApiLoader from "@/components/ApiLoader.vue";
import { sortBy } from "@/components/dashboard/widgets/OverView/sortBy";
import FileItem from "@/components/dashboard/widgets/OverView/FileItem.vue";
import VueCookies from "vue-cookies";

export default {
  name: "ListFile",
  components: {
    ApiLoader,
    FileItem,
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
    tab: {
      type: String,
      required: true,
    }
  },
  setup() {
    if (!VueCookies.get("selectedFilter")) {
      VueCookies.set("selectedFilter", "TidyScore Asc", "7d");
    }
    const selectedFilterCookie = VueCookies.get("selectedFilter");
    
    return {
      selectedFilterCookie,
    }
  },
  data() {
    return {
      selectedFilter: "",
      dialogFiltre: false,
      filterOptions: [
        { title: this.$t('dashboard.widgets.overView.filters.tidyscoreAsc'), value: 'TidyScore Asc' },
        { title: this.$t('dashboard.widgets.overView.filters.tidyscoreDesc'), value: 'TidyScore Desc' },
        { title: this.$t('dashboard.widgets.overView.filters.sizeAsc'), value: 'Size Asc' },
        { title: this.$t('dashboard.widgets.overView.filters.sizeDesc'), value: 'Size Desc' },
        { title: this.$t('dashboard.widgets.overView.filters.secsAsc'), value: 'Secs Asc' },
        { title: this.$t('dashboard.widgets.overView.filters.secsDesc'), value: 'Secs Desc' }
      ],
    }
  },
  mounted() {
     this.selectedFilter = this.selectedFilterCookie;
  },
  methods: {
    //   sortedFileList(data) {  
    //     let filesData = [];
    //     console.log(data);
    //     console.log(data.Responses);
    //     if (data && data.Responses) {
    //       data.Responses.map(target => {
    //         console.log(target);
    //         if (target && target.Content) {
    //           if (target.StatusCode == 200) {
    //             const contentArray = JSON.parse(target.Content);
    //             const sortedContentArray = contentArray.slice().sort((a, b) => b.size - a.size);
    //             filesData = filesData.concat(sortedContentArray.slice().sort((a, b) => b.size - a.size));
    //           } else {
    //             return;
    //           }
    //         }
    //       });
    //       return filesData;
    //     }
    //     return null;
    // },
    sortedFileList(data) {
      let filesData = [];
      if (data) {
        data.forEach(target => {
          if (target && target.Content) {
            const contentArray = JSON.parse(target.Content);
            const sortedContentArray = contentArray.slice().sort((a, b) => b.size - a.size);
            filesData = filesData.concat(sortedContentArray);
          }
        });
        return this.sortedResponses(filesData);
      }
      return null;
    },
    sortedResponses(filesData) {
      switch (this.selectedFilter) {
        case 'TidyScore Asc':
        case 'TidyScore Desc':
        case 'Size Asc':
        case 'Size Desc':
        case 'Secs Asc':
        case 'Secs Desc':
          return sortBy(filesData, this.selectedFilter.split(' ')[0].toLowerCase(), this.selectedFilter.split(' ')[1]);
        default:
          return filesData;
      }
    },
    sortWithTidyScore(tidyscore) {
      if (this.tab == "misnamed") return tidyscore.misnamed;
      else if (this.tab == "heavy") return tidyscore.heavy;
      else if (this.tab == "unused") return tidyscore.unused;
      else if (this.tab == "duplicated") return tidyscore.duplicated;
    },
    openFiltreDialog() {
      this.dialogFiltre = true;
    },
    closeFiltreDialog() {
      VueCookies.set("selectedFilter", this.selectedFilter);
      this.dialogFiltre = false;
    },
  }
};
</script>

<style scoped></style>