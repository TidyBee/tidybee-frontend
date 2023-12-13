<template>
  <ApiLoader :api-url="tidyHubApi" :style="{ 'min-width': getMinWidth(), 'padding': '10px' }">
    <template #default="{ data }" >
      <v-list class="file_list">  
        <v-list-title class="header">{{ widgetName }}
          <select v-model="widthPreset" style="background-color: white; border: 0.5px solid black; border-radius: 4px;">
      <option>1</option>
      <option>2</option>
    </select></v-list-title>
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
      widthPreset: 1,
    };
  },
  methods: {
    getMinWidth() {
      console.log('heyo');
      if (this.widthPreset == 1) {
        return '25%';
      }
      return '50%';
    },
    sortedFileList(data) {
      if (data) return data.slice().sort((a, b) => b.size - a.size);
    },
  },
};
</script>

<style src="./css/FileList.css" scoped></style>
