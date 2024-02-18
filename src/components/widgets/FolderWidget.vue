<template>
  <ApiLoader :api-url="tidyHubApi" class="full-height">
    <template #default="{ data }">
      <v-list class="file_list full-height">
        <v-list-title class="header">
          {{ widgetName }}
          <img
            :data-cy="$t('widget-Directory-btn-edit')"
            class="edit-icon"
            src="@/assets/editIcon.svg"
            @click="isOpen = !isOpen"
          />
        </v-list-title>
        <v-list-item v-for="file in data" :key="file.pretty_path" class="file_item">
          <FileItem :file="file" />
        </v-list-item>
      </v-list>
      <span>
        <v-dialog
          v-model="isOpen"
          max-width="300px"
          :data-cy="$t('widget-Directory-settings')"
        >
          <v-card>
            <v-form @submit.prevent>
              <v-text-field
                v-model="selectedFolder"
                :data-cy="$t('widget-Directory-input')"
                :rules="rules"
                :label="$t('folderWidget.folderLocation')"
              ></v-text-field>
              <v-btn
                :data-cy="$t('widget-Directory-btn-submit')"
                type="submit"
                block
                class="mt-2"
              >
                Submit
              </v-btn>
            </v-form>
            <v-btn
              :data-cy="$t('widget-Directory-btn-close')"
              type="close"
              @click="closeDialog"
            >
              {{ $t("common.close") }}
            </v-btn>
          </v-card>
        </v-dialog>
      </span>
    </template>
  </ApiLoader>
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
    closeDialog() {
      this.isOpen = false;
    },
  },
};
</script>

<style src="./css/FileList.css" scoped></style>
