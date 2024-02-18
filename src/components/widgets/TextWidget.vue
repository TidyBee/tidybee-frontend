<template>
  <ApiLoader :api-url="tidyHubApi" class="full-height">
    <template #default="{}">
      <v-list class="file_list full-height">
        <v-list-title class="header">
          {{ widgetName }}
          <img
            :data-cy="$t('widget-TextWidget-btn-edit')"
            class="edit-icon"
            src="@/assets/editIcon.svg"
            @click="isOpen = !isOpen"
          />
        </v-list-title>
        <v-list-item class="emission_size">{{ data.emissions }}</v-list-item>
        <v-list-item
          v-if="data?.showEvolution"
          :data-cy="$t('widget-TextWidget-evolution')"
        >
          {{ data.trend }}
        </v-list-item>
      </v-list>
      <span>
        <v-dialog
          v-model="isOpen"
          max-width="300px"
          :data-cy="$t('widget-TextWidget-settings')"
        >
          <v-card>
            <v-form @submit.prevent>
              <v-list>
                <v-list-item
                  v-if="data.hasOwnProperty('showEvolution')"
                  class="evolution_option"
                >
                  {{ $t("carbonWidget.showEvolution") }}
                  <br />
                  <input
                    v-model="data.showEvolution"
                    :data-cy="$t('widget-TextWidget-btn-evolution')"
                    type="checkbox"
                  />
                </v-list-item>
              </v-list>
            </v-form>
            <v-btn
              :data-cy="$t('widget-TextWidget-btn-close')"
              type="close"
              @click="closeDialog"
            >
              {{ $t("common.close") }}
            </v-btn>
          </v-card>
        </v-dialog>
      </span>
    </template>
  </ApiLoader>
</template>

<script>
import ApiLoader from "@/components/ApiLoader.vue";

export default {
  name: "TextWidget",
  components: {
    ApiLoader,
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
    widgetName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hoveredIndex: -1,
      selectedFolder: "",
      isOpen: false,
      rules: [
        (value) => {
          if (value) return true;

          return this.$t("common.missingInput");
        },
      ],
      data: {
        emissions: "",
        trend: "",
        showEvolution: false,
      },
    };
  },
  async mounted() {
    try {
      const newData = JSON.parse(
        JSON.stringify(require(`./exampleData/co2.json`)),
      );
      this.data = newData;
    } catch (error) {
      console.log("Could not find example co2 data");
    }
  },
  methods: {
    closeDialog() {
      this.isOpen = false;
    },
  },
};
</script>

<style src="./css/FileList.css" scoped></style>
