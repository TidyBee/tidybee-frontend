<template>
  <div>
    <button @click="triggerbtn">{{ $t("postButton.sendData") }}</button>
  </div>
</template>

<script>
import { postData } from "@/communication/communication.js";

export default {
  name: "PostButton",
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
  methods: {
    triggerbtn() {
      postData(this.tidyHubApi, { fileName: "test" });
    },
  },
};
</script>
