
<template>
  <v-card class="rounded-rectangle" elevation="10">
    <ApiLoader :api-url="tidyHubApi" :widget-name="widgetTitle" class="full-height">
      <template #default="{ data }">
        <div v-if="data" class="full-height">
          <v-container fluid class="full-height">
            <v-row>
              <v-span
                v-if="data.title"
                class="widget-title"
                :data-cy="`textwidget-title`"
              >
                {{ $t(`dashboard.widgets.text.title.${data.title}`) }}
              </v-span>
            </v-row>
            <v-row v-if="data.data" class="widget-text-center">
              <v-span
                :class="{ 'green-text': data.data.status, 'red-text': !data.data.status }"
                :data-cy="`textwidget-number`"
              >
                {{ data.data.value }}
              </v-span>
            </v-row>
          </v-container>
        </div>
      </template>
    </ApiLoader>
  </v-card>
</template>

<script>
import ApiLoader from "./../../../../../../utils/websockets/ApiLoader.vue";

export default {
  name: "WidgetTextSmall",
  components: {
    ApiLoader,
  },
  props: {
    widgetTitle: {
      type: String,
      required: true,
    },
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.rounded-rectangle {
  border-radius: 15px;
  background-color: white;
  height: 160px;
  width: 230px;
  display: flex; 
  flex-direction: column;
  justify-content: center;
}

.widget-title {
  position: absolute;
  top: 10px;
  left: 12px;
  font-size: 14px;
  color: #515151;
}

.widget-text-center {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 120%;
  font-size: 43px;
  color: red;
}

.green-text {
  color: green;
}

.red-text {
  color: red;
}
</style>