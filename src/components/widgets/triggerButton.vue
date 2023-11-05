<template>
  <div>
    <button @click="triggerbtn">
      Send data
    </button>
  </div>
</template>

<script>
import { postData } from '../../communication/communication.js';

export default {
    methods: {
        triggerbtn() {
          postData('https://localhost:5000/', {fileName: 'test'});
        },
    },
}
</script>
