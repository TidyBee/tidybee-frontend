<template>
  <v-row>
    <v-col cols="12">
      <div
        class="text-left ml-2"
        :data-cy="(`config.${config.name}`)"
      >
        {{ config.name }}
      </div>
      <div class="text-left pt-2 pb-4 text-grey-darken-1 text-no-wrap text-caption ml-2" data-cy="tidyscore-information">
        {{ $t("Information général :") }}
        <br v-if="config.description"> &nbsp;&nbsp;
        <a v-if="config.description"> {{ $t(`settings.description`) + config.description }} </a>
        <br v-if="config.weight"> &nbsp;&nbsp;
        <a v-if="config.weight"> {{ $t(`settings.weight`) + config.weight }} </a>
        <br v-if="config.regex"> &nbsp;&nbsp;
        <a v-if="config.regex"> {{ $t(`settings.regex`) + config.regex }} </a>
        <br v-if="config.limitISO"> &nbsp;&nbsp;
        <a v-if="config.limitISO"> {{ $t(`settings.limitISO`) + config.limitISO }} </a>
        <br v-if="config.limitInt"> &nbsp;&nbsp;
        <a v-if="config.limitInt"> {{ $t(`settings.limitInt`) + config.limitInt }} </a>
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
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style scoped>

</style>
