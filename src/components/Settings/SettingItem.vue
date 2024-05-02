<template>
  <div class="text-center">
    <!-- Nom de la configuration et icône -->
    <v-row class="mb-2 align-center">
      <v-col cols="10">
        <div class="text-left" style="font-size: 16px;">{{ config.name }}</div>
      </v-col>
      <v-col cols="2">
        <v-icon
          class="redirect-icon"
          :icon="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="isOpen = !isOpen"
        />
      </v-col>
    </v-row>

    <!-- Détails de la configuration (affichés lorsque ouvert) -->
    <v-row v-if="isOpen" class="mb-2" style="margin-top: 16px;">
      <v-col cols="12">
        <div  v-if="config.description != null" class="text-left text-grey-darken-1" style="font-size: 14px;">
          {{ $t("Description :") }} {{ config.description }}
        </div>
        <div v-if="config.regex != null" class="text-left text-grey-darken-1" style="font-size: 14px;">
          {{ $t("Regex :") }} {{ config.regex }}
        </div>
        <div v-if="config.limitISO != null" class="text-left text-grey-darken-1 " style="font-size: 14px;">
          {{ $t("Date Limite :") }} {{ config.limitISO }}
        </div>
      </v-col>
    </v-row>

    <!-- Ligne de séparation -->
  </div>
  <v-divider></v-divider>
</template>

<script>
export default {
  name: "FileItem",
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style scoped>
.text-center {
  margin-top: 30px; /* Ajustez la marge supérieure selon vos besoins */
  margin-left: 50px; /* Ajustez la marge supérieure selon vos besoins */
}
.align-center {
  align-items: center;
}
</style>
