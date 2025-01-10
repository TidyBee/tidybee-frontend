<template>
  <div>
    <v-tab
      block class="integrate-button"
      :href="GD_href"    
      >
      Configurer
      l'intégration Google Drive
    </v-tab>

    <!-- Button to configure Notion integration -->
    <v-tab block class="integrate-button" @click="showDialog = true">Configurer l'intégration Notion</v-tab>

    <!-- Dialog popup for Notion integration -->
    <v-dialog v-model="showDialog" max-width="600px">
      <v-card>
        <v-card-title>
          Configurer l'intégration Notion
        </v-card-title>
        <v-card-text>
          <p>
            Veuillez ajouter l'application TidyBee à votre page Notion
          </p>
          <br>
          <p>
            Veuillez récupérer l'ID de la base de données que vous souhaitez lier à votre compte
          </p>
          <br>
          <v-text-field v-model="databaseId" label="Database ID" outlined></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="linkNotionDatabase">Lier à votre base de données</v-btn>
          <v-btn text @click="showDialog = false">Annuler</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: "IntegrationWidget",
  data() {
    const googleDriveConfig = {
      oath: process.env.VUE_APP_GOOGLE_DRIVE_OAUTH,
      clientId: process.env.VUE_APP_GOOGLE_DRIVE_CLIENTID,
      redirect: process.env.VUE_APP_GOOGLE_DRIVE_REDIRECT,
      responseType: process.env.VUE_APP_GOOGLE_DRIVE_RESPONSE_TYPE,
      scope: process.env.VUE_APP_GOOGLE_DRIVE_SCOPE,
      api: process.env.VUE_APP_GOOGLE_DRIVE_API,
    };
    "https://accounts.google.com/o/oauth2/v2/auth?client_id=321237974559-ci21viakgst5smup6gk5hhpfbe7sb6r4.apps.googleusercontent.com&redirect_uri=http://localhost:8080/callback/google&response_type=token&scope=https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file"
    const googleDriveHref = `${googleDriveConfig.oath}?client_id=${googleDriveConfig.clientId}&redirect_uri=${googleDriveConfig.redirect}&response_type=${googleDriveConfig.responseType}&scope=${googleDriveConfig.scope} ${googleDriveConfig.api}`;
    return {
      showDialog: false,  // Controls the dialog visibility
      databaseId: '',     // Stores the input Database ID
      ...googleDriveConfig,
      GD_href: googleDriveHref,
    };
  },
  methods: {
    async linkNotionDatabase() {
      if (this.databaseId) {
        const req = await fetch(`${process.env.VUE_APP_HUB_AUTH}/Cloud/SyncNotion`, {
          method: 'POST',
          body: {
            "DatabaseId": this.databaseId
          }
        });
      } else {
        alert('Please enter a valid Database ID');
      }
    }
  }
};
</script>

<style scoped src="./IntegrationWidget.css"></style>