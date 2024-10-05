<template>
  <div>
    <v-btn block class="rounded-rectangle" href="fill me up">Configurer l'intégration Google Drive</v-btn>

    <!-- Button to configure Notion integration -->
    <v-btn block class="rounded-rectangle" @click="showDialog = true">Configurer l'intégration Notion</v-btn>

    <!-- Dialog popup for Notion integration -->
    <v-dialog v-model="showDialog" max-width="600px">
      <v-card>
        <v-card-title>
          Configurer l'intégration Notion
        </v-card-title>
        <v-card-text>
          <p>
            Veuillez ajouter l'application TidyBee à votre page Notion
            <v-btn small color="primary" href="your-tuto-link" target="_blank">Tuto pour ajouter</v-btn>
          </p>
          <p>
            Veuillez récupérer l'ID de la base de données que vous souhaitez lier à votre compte
            <v-btn small color="primary" href="your-tuto-link" target="_blank">Tuto pour récupérer l'ID</v-btn>
          </p>
          <v-text-field label="Database ID" v-model="databaseId" outlined></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="linkDatabase">Lier à votre base de données</v-btn>
          <v-btn text @click="showDialog = false">Annuler</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// Import gRPC client
import { NotionSyncClient } from '../../grpc/proto/notion_sync_grpc_web_pb';
import { SyncDatabaseRequest } from '../../grpc/proto/notion_sync_pb';

export default {
  name: "IntegrationWidget",
  data() {
    return {
      showDialog: false,  // Controls the dialog visibility
      databaseId: '',     // Stores the input Database ID
      grpcClient: null,   // gRPC client for NotionSync
    };
  },
  created() {
    // Initialize the gRPC client
    this.grpcClient = new NotionSyncClient("http://localhost:8081", null, null); /// DID NOT SUCESS TO USE THE .ENV WEIRD
  },
  methods: {
    linkDatabase() {
      if (this.databaseId) {
        const request = new SyncDatabaseRequest();
        request.setDatabaseid(this.databaseId);

        // Call the gRPC SyncDatabase method
        this.grpcClient.syncDatabase(request, {}, (err, response) => {
          if (err) {
            console.error('gRPC Error:', err.message);
            alert('Failed to link the database. Please try again.');
          } else if (response.getSuccess()) {
            console.log('Database linked successfully:', response.getMessage());
            alert('Database linked successfully.');
            this.showDialog = false;
          } else {
            console.error('Failed:', response.getMessage());
            alert('Failed to link the database: ' + response.getMessage());
          }
        });
      } else {
        alert('Please enter a valid Database ID');
      }
    }
  }
};
</script>
