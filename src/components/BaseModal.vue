<template>
  <div v-show="open" class="vue-modal">
    <div class="vue-modal-inner">
      <div class="vue-modal-content">
        <slot />
        <button type="button" @click="$emit('close')">
          {{ $t("common.close") }}
        </button>
      </div>
    </div>
  </div>
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

<style src="./css/BaseModal.css" scoped></style>
