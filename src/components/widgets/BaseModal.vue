<template>
  <v-card v-show="open" class="vue-modal">
    <div class="vue-modal-inner">
      <div class="vue-modal-content">
        <slot />
        <v-btn type="button" @click="$emit('close')">
          {{ $t("common.close") }}
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
};
</script>

<style src="@/../css/components/widgets/BaseModal.css" scoped></style>
