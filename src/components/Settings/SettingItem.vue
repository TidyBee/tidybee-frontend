<template>
  <v-card class="setting-item">
    <div class="text-left ml-2" :data-cy="(`config.${config.name}`)" @click="isOpen = !isOpen">
      {{ config.name }}
    </div>
    <div
      v-if="isOpen" class="text-left pt-2 pb-2 ml-2 text-grey-darken-1 text-no-wrap text-caption ml-2"
      data-cy="tidyscore-description"
    >
      {{ $t(`settings.description`) + config.description }}
      <br v-if="config.weight"> &nbsp;&nbsp;
      <a v-if="config.weight" class="d-flex align-center"> {{ $t(`settings.weight`) }} &nbsp;&nbsp;
        <v-progress-linear
          bg-color="#000" color="#12512a" height="12" max="3" min="0" :model-value="config.weight"
          rounded
        />
      </a>
    </div>
    <v-icon class="item-chevron" :icon="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="isOpen = !isOpen" />
  </v-card>
</template>

<script>
export default {
  name: "FileItem",
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style scoped src="@/../css/components/Settings/SettingItem.css"></style>