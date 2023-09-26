<template>
  <div class="incorrectly-named-files">
    <div class="header">
      <h4>{{ widgetName }}</h4>
    </div>
    <div
      class="file-list"
      :style="{ maxHeight: fileListMaxHeight }"
    >
      <ul>
        <li
          v-for="(file, index) in files.slice(0, top)"
          :key="index"
          @mouseover="hoveredIndex = index"
          @mouseleave="hoveredIndex = -1"
        >
          <div class="file-item">
            <span
              class="file-name"
              :class="{ 'file-hovered': hoveredIndex === index }"
            >{{ file.name }}</span>
            <span class="file-value">{{ file.value }}</span>
            <span class="file-sort-by">{{ sortBy }}</span>
            <img
              v-show="hoveredIndex === index"
              src="@/assets/redirectIcon.png"
              alt="Redirect Icon"
              class="redirect-icon"
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'SortByWidget',
    props: {
        files: {
            type: Array,
            required: true
        },
        top: {
            type: Number,
            required: true
        },
        sortBy: {
            type: String,
            required: true
        },
        widgetName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            hoveredIndex: -1
        };
    },
    computed: {
        fileListMaxHeight() {
            const lineHeight = 30;
            const maxLines = this.top;
            return `${lineHeight * maxLines}px`;
        }
    }
};
</script>

<style scoped>
.incorrectly-named-files {
    width: 250px;
    height: 250px;
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
    padding: 10px;
}

.file-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.file-list li {
    margin: 5px 0;
    position: relative;
}

.file-item {
    display: flex;
    align-items: center;
}

.file-name,
.file-value,
.file-sort-by {
    margin-left: 10px;
}

.redirect-icon {
    width: 16px;
    height: 16px;
    margin-left: 5px;
    display: none;
}

.file-name.file-hovered {
    cursor: pointer;
}

.file-name.file-hovered + .redirect-icon {
    display: inline-block;
}
</style>
