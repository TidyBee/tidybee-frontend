<template>
  <ApiLoader :api-url="tidyHubApi" class="full-height">
    <template #default="{ data }">
      <v-list class="file_list full-height">  
        <v-list-title class="header">{{ widgetName }}</v-list-title>
        <v-list-item v-for="file in sortedFileList(data)" :key="file.path" class="file_item">
          <FileItem :file="file" />
        </v-list-item>
      </v-list>
    </template>
  </ApiLoader>
</template>

<script>
import ApiLoader from "@/components/ApiLoader.vue";
import FileItem from "@/components/FileItem.vue";

export default {
  name: "FileList",
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
    };
  },
  methods: {
    sortedFileList(data) {
      if (data) return data.slice().sort((a, b) => b.size - a.size);
    },
  },
};
</script>

<style src="./css/FileList.css" scoped></style>
