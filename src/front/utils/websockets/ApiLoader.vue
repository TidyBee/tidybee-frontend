<template>
  <div>
    <div v-if="isLoading">
      <ApiLoaderLoading :widget-name="widgetName" />
    </div>
    <div v-else-if="hasError">
      <ApiLoaderError :widget-name="widgetName" />
    </div>
    <div v-else class="full-height">
      <slot :data="apiData" />
    </div>
  </div>
</template>

<script>
import * as signalR from '@microsoft/signalr';
import ApiLoaderError from '@/front/utils/websockets/requestStatus/ApiLoaderError.vue';
import ApiLoaderLoading from '@/front/utils/websockets/requestStatus/ApiLoaderLoading.vue';

export default {
  components: {
    ApiLoaderError,
    ApiLoaderLoading,
  },
  props: {
    widgetName: {
      type: String,
      required: true,
    },
    apiUrl: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      apiData: [],
      isLoading: false,
      hasError: false,
      connection: null,
      hubUrl: process.env.VUE_APP_TIDYBEE_HUB_URL
    };
  },
  created() {
    this.setupWebSocket();
  },
  mounted() {
    this.emitter.on("refresh-widgets", () => {
      this.handleRefresh(this.apiUrl);
    });
    this.emitter.on(this.widgetName, (data) => {
      this.handleRefresh(data.url);
    });
  },
  methods: {
    setupWebSocket() {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.connection.on("ReceiveMessage", (data) => {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData) {
            this.apiData = parsedData;
            this.isLoading = false;
            this.hasError = false;
          } else {
            throw new Error("Les données reçues ne sont pas un tableau.");
          }
        } catch (error) {
          console.error(error.toString());
          this.hasError = true;
          this.isLoading = false;
          this.error = error.message;
        }
      });

      this.connection.start()
        .then(() => {
          this.isLoading = true;
          this.requestWidgetData(this.apiUrl);
        })
        .catch(err => {
          console.error(err.toString());
          this.hasError = true;
          this.isLoading = false;
          this.error = err.message;
        });
    },
    requestWidgetData(url) {
      this.connection.invoke(url).catch(err => {
        console.error(err.toString());
      });
    },
    handleRefresh(url) {
      this.requestWidgetData(url);
    },
  }
};
</script>

<style src="" />