<template>
  <v-row>
    <v-col cols="12">
      <div class="text-left ml-2" :data-cy="(`config.${config.name}`)">
        {{ getConfigName() }}
      </div>
      <div
        class="text-left pt-2 pb-4 ml-2 text-grey-darken-1 text-wrap text-caption ml-2"
        data-cy="tidyscore-description"
      >
        {{ config.description }}
      </div>
    </v-col>
  </v-row>
  <v-divider></v-divider>
</template>

<script>
export default {
  name: "FileItem",
  props: {
    config: {
      type: Object,
      required: true,
    },
    translateName: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    getConfigName() {
      if (this.translateName) {
        return this.$t('settings.rule.' + this.config.name);
      } else {
        return this.config.name;
      }
    }
  }
};
</script>

<style scoped></style>
