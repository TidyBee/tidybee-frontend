<template>
  <div>
    <div v-if="isLoading" class="full-height d-flex justify-center align-center">
      <div class="widget-title">{{ $t('dashboard.widgets.' + widgetName) }}</div>
      <v-progress-circular indeterminate :size="80" :width="12"></v-progress-circular>
    </div>
    <div v-else-if="hasError" class="full-height d-flex flex-column justify-center align-center red-bg">
      <div :data-cy="`widget-loading-failed`" class="widget-title widget-fail-title text-left">{{ $t('dashboard.widgets.' + widgetName) }}</div>
      <v-icon icon="mdi-alert-outline" class="warning-icon" :style="isTextWidget ? `font-size: 2em !important` : ``"></v-icon>
      <br>
      <strong>{{ $t("apiLoader.errorLoading") }}</strong>
      <br>
      ({{ error }})
    </div>
    <div v-else class="full-height">
      <slot :data="apiData" />
    </div>
  </div>
</template>

<script>
import * as signalR from '@microsoft/signalr';

export default {
  props: {
    widgetName: {
      type: String,
      required: true,
    },
    apiUrl: {
      type: String,
      required: true,
    },
    queryParams: {
      type: Object,
      default: () => ({}),
    },
    isTextWidget: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      apiData: [],
      isLoading: false,
      hasError: false,
      error: "",
      connection: null,
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
        .withUrl("http://prod.tidybee.fr:7003/widgetHub")
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
  },
};
</script>

<style src="@/../css/communication/ApiLoader.css" />
