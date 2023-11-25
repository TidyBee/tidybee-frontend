<template>
  <ApiLoader :api-url="tidyHubApi">
    <template #default="{ data }">
      <div class="file_list">
        <div class="header">
          <h4>{{ widgetName }}</h4>        
        </div>
        <div class="file-list">
          <ul :style="{width: '100%'}">
            <li
              v-for="file in sortedFileList(data)" 
              :key="file.path"
            > 
              <FileItem :file="file" />
            </li>
          </ul>
        </div>
      </div>
    </template>
  </ApiLoader>
</template>

<script>
import ApiLoader from "@/components/ApiLoader.vue"
import FileItem from "@/components/FileItem.vue"

  export default {
      name: 'FileList',
      components : {
          ApiLoader,
          FileItem,
      },
      props: {
        tidyHubApi : {
          type: String,
          required: true
        },
        widgetName : {
          type: String,
          required: true
        }
      },
      data() {
          return {
              hoveredIndex: -1
          };
      },
      methods: {
          sortedFileList(data) {
            if (data)
              return data.slice().sort((a, b) => b.size - a.size);
          },
      }
  };
  </script>
  
  <style src="./css/FileList.css" scoped></style>