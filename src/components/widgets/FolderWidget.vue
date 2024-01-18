<template>
  <ApiLoader :api-url="tidyHubApi" class="full-height">
    <template #default="{ data }">
      <v-list class="file_list full-height">
        <v-list-title class="header">
          {{ widgetName }}
          <v-btn
            style="width: auto; height: auto"
            class="ma-2"
            color="black"
            icon="mdi-wrench"
            @click="isOpen = !isOpen"
          ></v-btn>
        </v-list-title>
        <v-list-item
          v-for="file in sortedFolderWidget(data)"
          :key="file.path"
          class="file_item"
        >
          <FileItem :file="file" />
        </v-list-item>
      </v-list>
    </template>
  </ApiLoader>
  <span>
    <v-dialog v-model="isOpen" max-width="300px">
      <v-card>
        <v-form @submit.prevent>
          <v-text-field
            v-model="selectedFolder"
            :rules="rules"
            :label="$t('folderWidget.folderLocation')"
          ></v-text-field>
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-form>
        <v-btn @click="closeDialog"> {{ $t("common.close") }} </v-btn>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import ApiLoader from "@/components/ApiLoader.vue";
import FileItem from "@/components/FileItem.vue";

export default {
  name: "FolderWidget",
  components: {
    ApiLoader,
    FileItem,
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
    widgetName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hoveredIndex: -1,
      selectedFolder: "",
      isOpen: false,
      rules: [
        (value) => {
          if (value) return true;

          return this.$t("common.missingInput");
        },
      ],
    };
  },
  methods: {
    sortedFolderWidget(data) {
      if (data) return data.slice().sort((a, b) => b.size - a.size);
    },
    closeDialog() {
      this.isOpen = false;
    },
  },
};
</script>

<style src="./css/FileList.css" scoped></style>
