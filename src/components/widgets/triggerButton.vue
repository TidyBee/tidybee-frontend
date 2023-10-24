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
          const url = "https://localhost:5000";
          const data = { key1: "valeur1", key2: "valeur2" };
          sendData(url, data);
        },
    },
}
</script>
