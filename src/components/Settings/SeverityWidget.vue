<template>
  <!-- <v-dialog v-model="true" max-width="600px"> -->
  <v-card class="rounded-dialog">
    <v-card-title>
      Sévérité des règles
    </v-card-title>
    <v-card-text>
      <p>
        Veuillez choisir le degré de sévérité des règles.
      </p>
      <p>
        La sévérité a impact direct sur le score de vos fichiers.
      </p>
      <br />
      <br />
      <br />
      <v-container>
        <v-row>
          <v-col />
          <v-col class="text-center">
            Faible
          </v-col>
          <v-col class="text-center">
            Moyen
          </v-col>
          <v-col class="text-center">
            Elevé
          </v-col>
        </v-row>
        <br />
        <v-radio-group v-for="(rule, index) in rules" :key="index" v-model="rule.weight">
          <v-row>
            <v-col class="text-center grid-items">
              {{ $t('settings.rule.' + rule.name) }}
            </v-col>
            <v-col class="text-center grid-items">
              <v-radio :value="1.5" />
            </v-col>
            <v-col class="text-center grid-items">
              <v-radio :value="2" />
            </v-col>
            <v-col class="text-center grid-items">
              <v-radio :value="3" />
            </v-col>
          </v-row>
        </v-radio-group>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="close">Annuler</v-btn>
      <v-btn text @click="close">Soumettre</v-btn>
    </v-card-actions>
  </v-card>
  <!-- </v-dialog> -->
</template>

<script>
export default {
    name: "SeverityWidget",
    props: {
        rules: {
            type: Object,
            required: true,
        },
    },
    emits: ["close"],
    methods: {
        close() {
            this.$emit('close');
        }
    },
};
</script>

<style scoped src="@/../css/components/Settings/SeverityWidget.css"></style>