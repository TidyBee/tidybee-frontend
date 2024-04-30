<template>
  <span class="help-button">?</span>
  <div class="help-section" :style="(small ? 'font-size: small' : '') + (overview ? 'width: 500px; margin: 6.5% 15%': '')">
    {{ $t(text) }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    overview: {
      type: Boolean,
      required: false,
      default: false
    }
  },
};
</script>

<style src="@/../css/components/widgets/HelpButton.css" scoped></style>
