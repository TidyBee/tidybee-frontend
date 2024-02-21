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
        <div v-if="isEnoughFiles(data)">
          <v-list-item
            v-for="(file, index) in data"
            :key="file.pretty_path"
            class="file_item"
          >
            <FileItem :file="file" :data-cy="'file-' + index" />
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item v-for="n in Number(widget.extra)" :key="n">
            <FileItem
              :file="getNextFile(data, n)"
              :data-cy="'file-' + (n - 1)"
            />
          </v-list-item>
        </div>
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
                @click="updateConfig"
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
    widget: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  emits: ["update-config"],
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
    isEnoughFiles(data) {
      if (!(this.widget?.extra && !isNaN(Number(this.widget?.extra)))) {
        return true;
      }
      if (Number(this.widget?.extra) > data.length) {
        return false;
      }
      return true;
    },
    getNextFile(data, n) {
      return data[n % data.length];
    },
    closeDialog() {
      this.isOpen = false;
    },
    updateConfig() {
      this.isOpen = false;
      this.$emit("update-config", this.selectedFolder);
    },
  },
};
</script>

<style src="./css/FileList.css" scoped></style>
