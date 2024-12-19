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
        >
          <template v-slot:[`item.espaceSurveillee`]="{ item }">
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
          </template>
          <template v-slot:[`item.filedetails`]="{ item }">
            <img
              src="./assets/redirect-icon.png"
              alt="Redirect Icon"
              class="icon clickable"
              @click="redirectToDetails(item)"
            />
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { sortBy } from "./sortBy.js";

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
    headers: [
      { text: "Espace surveillé", value: "espaceSurveillee", align: "center" },
      { title: 'Nom du Fichier', align: 'start', sortable: false, key: 'name' },
      { title: 'Taille', key: 'size', align: 'end', sortable: false },
      { title: "Date d'utilisation", key: 'lastUsed', align: 'end', sortable: false },
      { title: 'TidyScore', key: 'tidyscore', align: 'end', sortable: false },
      { text: "Détails du fichier", value: "filedetails", align: "center" },
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
    name: '',
    search: '',
  }),

  watch: {
    name() {
      this.search = String(Date.now());
    },
  },
  methods: {
    getFiles({ page, itemsPerPage, search }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const start = (page - 1) * itemsPerPage;
          const end = start + itemsPerPage;

          let filteredItems = this.filesList.filter((item) => {
            if (search.name && !item.name.toLowerCase().includes(search.name.toLowerCase())) {
              return false;
            }
            return true;
          });

          const paginated = filteredItems.slice(start, end);
          resolve({ items: paginated, total: filteredItems.length });
        }, 500);
      });
    },
    loadItems({ page, itemsPerPage }) {
      this.loading = true;
      this.getFiles({
        page,
        itemsPerPage,
        search: { name: this.name },
      }).then(({ items, total }) => {
        this.serverItems = items;
        this.totalItems = total;
        this.loading = false;
      });
    },
    redirectToDetails(item) {
      console.log("Redirection triggered with item:", item);

      if (item.fileDetails.path) {
        localStorage.setItem("currentItem", JSON.stringify(item));
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
</style>

