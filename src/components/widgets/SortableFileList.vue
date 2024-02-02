<template>
  <div class="incorrectly-named-files">
    <div class="header">
      <h4>{{ widgetName }}</h4>
    </div>
    <div class="file-list" :style="{ maxHeight: fileListMaxHeight }">
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
            >
              {{ file.name }}
            </span>
            <span class="file-value">{{ file.value }}</span>
            <span class="file-sort-by">{{ sortBy }}</span>
            <img
              v-show="hoveredIndex === index"
              src="@/assets/redirectIcon.png"
              alt="Redirect Icon"
              class="redirect-icon"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SortableFileList",
  props: {
    files: {
      type: Array,
      required: true,
    },
    top: {
      type: Number,
      required: true,
    },
    sortBy: {
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
  computed: {
    fileListMaxHeight() {
      const lineHeight = 30;
      const maxLines = this.top;
      return `${lineHeight * maxLines}px`;
    },
  },
};
</script>

<style src="./css/SortableFileList.css" scoped></style>
