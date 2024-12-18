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
        <!-- <br v-if="config.weight"> &nbsp;&nbsp;
        <a v-if="config.weight"> {{ $t(`settings.weight`) + config.weight }} </a>
        <br v-if="config.regex"> &nbsp;&nbsp;
        <a v-if="config.regex"> {{ $t(`settings.regex`) + config.regex }} </a>
        <br v-if="config.limitISO"> &nbsp;&nbsp;
        <a v-if="config.limitISO"> {{ $t(`settings.limitISO`) + config.limitISO }} </a>
        <br v-if="config.limitInt"> &nbsp;&nbsp;
        <a v-if="config.limitInt"> {{ $t(`settings.limitInt`) + config.limitInt }} </a> -->
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
