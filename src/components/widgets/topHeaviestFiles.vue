<template>
  <APIComponent :api-url="tidyHubApi">
    <template #default="{ data }">
      <div class="top-heaviest-file">
        <div class="header">
          <h4>{{ widgetName }}</h4>        
        </div>
        <div class="file-list">
          <ul :style="{width: '100%'}">
            <li
              v-for="file in sortedFileList(data)" 
              :key="file.path"
            > 
              <div class="file-item">
                <div class="file-name">
                  <span>{{ file.path }}</span>
                  <span>{{ shortenSize(file.size) }}</span>
                  <span>{{ getGrade(file.tidyScore) }}</span>
                </div>
                <p>{{ getGradeTooltip(file.tidyScore) }}</p>
                <p><strong>Last used: </strong>{{ file.lastAccess }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </APIComponent>
</template>

<script>
import APIComponent from "../APIComponent.vue"

  export default {
      name: 'TopHeaviestFiles',
      components : {
          APIComponent,
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
          shortenSize(size) {
            if (size > 1000000000)
              return (size/1000000000).toFixed(2) + "GB";
            if (size > 1000000)
              return (size/1000000).toFixed(2) + "MB";
            if (size > 1000)
              return (size/1000).toFixed(2) + "KB";
            return size + "B";
          },
          getGrade(tidyScore) {
            let score = 0;
            const scores = ['A', 'B', 'C', 'D', 'E'];
            score += (tidyScore.misnamed == true);
            score += (tidyScore.misplaced == true);
            score += (tidyScore.unused == true);
            score += (tidyScore.duplicated == true);
            return scores[score];
          },
          getGradeTooltip(tidyScore) {
            let string = "";
            if (tidyScore.misnamed) 
              string += "Misnamed "
            if (tidyScore.misplaced)
              string += "Misplaced "
            if (tidyScore.unused)
              string += "Unused "
            if (tidyScore.duplicated)
              string += "Duplicate "
            return string;
          }
      }
  };
  </script>
  
  <style scoped>
  .top-heaviest-file {
      width: 400px;
      height: auto;
      max-height: 400px;
      margin: 20px;
      border-radius: 17px;
      background: #ffffff;
      box-shadow: 9px 9px 18px #d9d9d9, -9px -9px 18px #ffffff;
      margin-top: 60px;
      overflow-y: auto;
      }
  
  .header {
      background: #ffee00;
      padding: 15px;
      border-top-left-radius: 17px;
      border-top-right-radius: 17px;
  }
  
  .header h4 {
      margin: 0;
      padding: 0;
  }
  
  .file-list {
      padding: 0;
  }
  
  .file-list ul {
      list-style: none;
      padding: 0;
      margin: 0;
  }
  
  .file-list li:nth-child(even) .file-item {
    background-color: #fff56a;
  }
  
  .file-list li {
      position: relative;
  }
  
  .file-item {
      display: flex;
      padding: 10px 0;
      align-items: center;
      flex-direction: column;
  }
  
  .file-name {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
  }
  
  .redirect-icon {
      width: 16px;
      height: 16px;
      margin-left: 5px;
      display: none;
  }
  
  .file-name.file-hovered + .redirect-icon {
      display: inline-block;
  }
  </style>
  