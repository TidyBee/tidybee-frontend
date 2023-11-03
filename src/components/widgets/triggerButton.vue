<template>
  <div>
    <button @click="triggerbtn">
      Send data
    </button>
  </div>
</template>

<script>
import { sendData } from '../../communication/communication.js';

export default {
    methods: {
        triggerbtn() {
          sendData();
        },
    },
}
</script>
