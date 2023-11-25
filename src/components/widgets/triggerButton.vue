<template>
  <div>
    <button @click="triggerbtn">
      Send data
    </button>
  </div>
</template>

<script>
import { postData } from '@/communication/communication.js';

export default {
  name: 'TriggerButton',
  props: {
    tidyHubApiPost: {
      type: String,
      required: true
    }
  },
  methods: {
      triggerbtn() {
        postData(this.tidyHubApiPost, {fileName: 'test'});
      },
  }
}
</script>
