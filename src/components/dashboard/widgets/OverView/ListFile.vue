<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="d-flex justify-space-between align-center">
        <div class="text-left">
          <span :data-cy="(`overviewwidget-${tab}-name`)">{{ $t("dashboard.widgets.overView.filtre.name") }}</span>
        </div>
        <div @click="rotateArrow('isArrowRotatedName')">
          <v-icon>
            <img 
              src="@/assets/icons/downarrow.svg" 
              alt="down arrow Icon" 
              class="downarrow-icon"
              :style="{ transform: `rotate(${arrowRotation('isArrowRotatedName')}deg)` }"
            />
          </v-icon>
        </div>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="3" class="d-flex justify-space-between align-center">
        <div class="text-left">
          <span :data-cy="(`overviewwidget-${tab}-size`)">{{ $t("dashboard.widgets.overView.filtre.size") }}</span>
        </div>
        <div @click="rotateArrow('isArrowRotatedSize')">
          <v-icon>
            <img 
              src="@/assets/icons/downarrow.svg" 
              alt="down arrow Icon" 
              class="downarrow-icon"
              :style="{ transform: `rotate(${arrowRotation('isArrowRotatedSize')}deg)` }"
            />
          </v-icon>
        </div>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="3" class="d-flex justify-space-between align-center">
        <div class="text-left">
          <span :data-cy="(`overviewwidget-${tab}-lastUsed`)">{{ $t("dashboard.widgets.overView.filtre.lastused") }}</span>
        </div>
        <div @click="rotateArrow('isArrowRotatedLastUsed')">
          <v-icon>
            <img 
              src="@/assets/icons/downarrow.svg" 
              alt="down arrow Icon" 
              class="downarrow-icon"
              :style="{ transform: `rotate(${arrowRotation('isArrowRotatedLastUsed')}deg)` }"
            />
          </v-icon>
        </div>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="3" class="d-flex justify-space-between align-center">
        <div class="text-left">
          <span :data-cy="(`overviewwidget-${tab}-tidyscore`)">{{ $t("dashboard.widgets.overView.filtre.tidyscore") }}</span>
        </div>
        <div @click="rotateArrow('isArrowRotatedTidyScore')">
          <v-icon>
            <img 
              src="@/assets/icons/downarrow.svg" 
              alt="down arrow Icon" 
              class="downarrow-icon"
              :style="{ transform: `rotate(${arrowRotation('isArrowRotatedTidyScore')}deg)` }"
            />
          </v-icon>
        </div>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row>
      <v-virtual-scroll :height="300" :items="paginatedItems" style="overflow-x: clip;">
        <template #default="{ item }">
          <v-list-item cols="12">
            <FileItem :file="item" :tab="tab" />
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-row>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">
        <v-icon>mdi-chevron-left</v-icon>
      </button>
      <span>{{ currentPage }} sur {{ pageCount }}</span>
      <button :disabled="currentPage === pageCount" @click="nextPage">
        <v-icon>mdi-chevron-right</v-icon>
      </button>
    </div>
  </v-container>
</template>

<script>
import { sortBy } from "@/components/dashboard/widgets/OverView/sortBy";
import FileItem from "@/components/dashboard/widgets/OverView/FileItem.vue";
import VueCookies from "vue-cookies";

export default {
  name: "ListFile",
  components: {
    FileItem,
  },
  props: {
    fetchdata: {
      type: Object,
      required: true,
    },
    tab: {
      type: String,
      required: true,
    },
  },
  setup() {
    if (!VueCookies.get("selectedFilter")) {
      VueCookies.set("selectedFilter", "TidyScore Asc", "7d");
    }
    const selectedFilterCookie = VueCookies.get("selectedFilter");

    return {
      selectedFilterCookie,
    };
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 7,
      isArrowRotatedName: false,
      isArrowRotatedSize: false,
      isArrowRotatedLastUsed: false,
      isArrowRotatedTidyScore: false,
      selectedFilter: "",
      dialogFiltre: false,
      filterOptions: [
        {
          title: "dashboard.widgets.overView.filters.tidyscoreAsc",
          value: "TidyScore Asc",
        },
        {
          title: "dashboard.widgets.overView.filters.tidyscoreDesc",
          value: "TidyScore Desc",
        },
        {
          title: "dashboard.widgets.overView.filters.sizeAsc",
          value: "Size Asc",
        },
        {
          title: "dashboard.widgets.overView.filters.sizeDesc",
          value: "Size Desc",
        },
        {
          title: "dashboard.widgets.overView.filters.secsAsc",
          value: "Secs Asc",
        },
        {
          title: "dashboard.widgets.overView.filters.secsDesc",
          value: "Secs Desc",
        },
      ],
      fileList: "",
    };
  },
  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.sortedResponses(this.fetchdata).slice(start, end)
    },
    pageCount() {
      return Math.ceil(this.sortedResponses(this.fetchdata).length / this.itemsPerPage)
    }
  },
  watch: {
    tab() {
      this.currentPage = 1;
    },
  },
  mounted() {
    this.selectedFilter = this.selectedFilterCookie;
  },
  methods: {
    arrowRotation(arrow) {
      return this[arrow] ? 180 : 0; 
    },
    sortedFileList(data) { 
      let filesData = [];
      if (data && data.Responses) {
        data.Responses.map((target) => {
          if (target && target.Content) {
            if (target.StatusCode == 200) {
              const contentArray = JSON.parse(target.Content);
              const sortedContentArray = contentArray
                .slice()
                .sort((a, b) => b.size - a.size);
              filesData = filesData.concat(
                sortedContentArray.slice().sort((a, b) => b.size - a.size),
              );
            } else {
              return;
            }
          }
        });
        return filesData;
      }
      return filesData;
    },
    sortedResponses(filesData) {
      if (filesData) {
        switch (this.selectedFilter) {
          case 'TidyScore Asc':
          case 'TidyScore Desc':
          case 'Size Asc':
          case 'Size Desc':
          case 'Secs Asc':
          case 'Secs Desc':
          case 'Name Asc':
          case 'Name Desc':
            return sortBy(filesData, this.selectedFilter.split(' ')[0].toLowerCase(), this.selectedFilter.split(' ')[1]);
          default:
            return filesData;
        }
      } 
      return null;
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
    rotateArrow(arrow) {
      Object.keys(this).forEach(key => {
        if (key.startsWith('isArrowRotated') && key !== arrow) {
          this[key] = false;
        }
      });
      this[arrow] = !this[arrow];
      let filterMap = {
        isArrowRotatedTidyScore: { true: 'TidyScore Asc', false: 'TidyScore Desc' },
        isArrowRotatedName: { true: 'Name Asc', false: 'Name Desc' },
        isArrowRotatedSize: { true: 'Size Asc', false: 'Size Desc' },
        isArrowRotatedLastUsed: { true: 'Secs Asc', false: 'Secs Desc' }
      };
      if (arrow in filterMap) {
        this.selectedFilter = filterMap[arrow][this[arrow]];
      }
      this.sortedResponses(this.fileList);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
      }
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage += 1
      }
    }

  }
};
</script>

<style src="@/../css/components/dashboard/ListFile.css" scoped></style>
