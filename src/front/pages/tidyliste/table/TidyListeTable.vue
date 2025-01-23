<template>
  <v-container fluid full-height width="100vw">
    <v-row>
      <v-col>
        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="serverItems"
          :items-length="totalItems"
          :loading="loading"
          :search="search"
          item-value="name"
          width="100vw"
          @update:options="loadItems"
          class="custom-table"
        >
          <template v-slot:item="{ item }">
            <tr @click="redirectToDetails(item)" class="clickable-row">
              <td class="text-center">
                <img
                  v-if="item.location === 'agent'"
                  src="./assets/intern-icon.svg"
                  alt="Intern Icon"
                  class="icon"
                />
                <img
                  v-else-if="item.location === 'notion'"
                  src="./assets/notion-icon.svg"
                  alt="Notion Icon"
                  class="icon"
                />
                <img
                  v-else-if="item.location === 'googleDrive'"
                  src="./assets/google-drive-icon.svg"
                  alt="Google Drive Icon"
                  class="icon"
                />
              </td>

              <!-- Autres colonnes -->
              <td class="text-center">{{ item.name }}</td>
              <td class="text-center">{{ item.size }}</td>
              <td class="text-center">{{ item.lastUsed }}</td>
              <td class="text-center">{{ item.tidyscore }}</td>

              <!-- Cellule avec icône cliquable -->
              <td class="text-center">
                <img
                  src="./assets/redirect-icon.png"
                  alt="Redirect Icon"
                  class="icon clickable"
                  @click.stop="redirectToDetails(item)"
                />
              </td>
            </tr>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { sort } from "./sort.js";
import { getGradeColor } from "./utils.js"

export default {
  name: "TidyListeTable",
  props: {
    filesList: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
    itemsPerPage: 15,
    search:'all',
    selectedRule: 'all',
    selectedLocation: 'all',
    headers: [
      { text: "Espace surveillé", value: "espaceSurveillee", align: "start" },
      { title: 'Nom du Fichier', align: 'center', sortable: true, key: 'name' },
      { title: 'Taille', key: 'size', align: 'center', sortable: true },
      { title: "Date d'utilisation", key: 'lastUsed', align: 'center', sortable: true },
      { title: 'TidyScore', key: 'tidyscore', align: 'center', sortable: true },
      { text: "Détails du fichier", value: "filedetails", align: "center" },
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
    name: '',
    search: '',
  }),

  methods: {
    sort,
    getGradeColor,
    getFiles({ page, itemsPerPage, sortBy, search }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const start = (page - 1) * itemsPerPage;
          const end = start + itemsPerPage;
          let filteredItems = this.filesList.filter((item) => {
            if (this.selectedRule != 'all' && item.fileDetails.tidyscore[this.selectedRule].grade == 'A') {
              return false;
            }
            return true;
          });
          filteredItems = filteredItems.filter((item) => {
            if (this.selectedLocation == 'googledrive' && item.location =='googleDrive') {
              return true;
            } else if (this.selectedLocation == 'agent' && item.location =='agent') {
              return true;
            } else if (this.selectedLocation == 'notion' && item.location =='notion') {
              return true;
            } else if(this.selectedLocation == 'all') {
              return true;
            } else {
              return false;
            }
          })
          let sortedItems = (sortBy.length ? sort(filteredItems, sortBy[0].key, sortBy[0].order) : filteredItems)

          const paginated = sortedItems.slice(start, end);
          resolve({ items: paginated, total: filteredItems.length });
        }, 500);
      });
    },
    updateSelectedRule(selectedRule) {
      this.selectedRule = selectedRule;
      this.search = selectedRule;
    },
    updateSelectedLocation(location) {
      this.selectedLocation = location;
      this.search = location;
    },
    loadItems({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      this.getFiles({
        page,
        itemsPerPage,
        sortBy,
        search: { name: this.name },
      }).then(({ items, total }) => {
        this.serverItems = items;
        this.totalItems = total;
        this.loading = false;
      });
    },
    redirectToDetails(item) {
      const gradeColor = this.getGradeColor(item.tidyscore);
      const filedata = { 
        ...item,
        gradeColor,
      }
      if (item.fileDetails.path) {
        localStorage.setItem("currentItem", JSON.stringify(filedata));
        this.$router.push({
          name: "TidyListeDetails",
          params: { file_path: item.fileDetails.path },
        });
      } else {
        console.error("Item does not have a file_path:", item);
      }
    },
  },
};
</script>

<style scoped>
.clickable-row {
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.clickable-row:hover {
  background-color: #f5f5f5;
}
.icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style>