import MainPage from "@/pages/MainPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { GoogleDriveGrpcSyncClient } from './grpc/proto/google_drive_grpc_web_pb';
import { SyncFilesRequest } from './grpc/proto/google_drive_pb';

const routes = [
  {
    name: "Home",
    component: MainPage,
    path: "/",
  },
  {
    name: "Settings",
    component: SettingsPage,
    path: "/settings",
  },
  {
    name: "Callback",
    path: "/callback/:provider",
    redirect: (to) => {
      const { provider } = to.params;

      // Handle Google Drive provider case
      if (provider === 'google') {
        const grpcGoogleDriveClient = new GoogleDriveGrpcSyncClient("http://0.0.0.0:8081", null, null); // Initialize GoogleDrive gRPC client

        const hash = to.hash.substring(1); // Remove the '#' from the start of the hash
        const params = new URLSearchParams(hash); // Parse the hash into parameters
        const code = params.get('access_token');
        if (code) {
          const request = new SyncFilesRequest();
          request.setOauth2token(code);  // Use the code from the callback as the Drive ID

          // Call the gRPC SyncDrive method
          grpcGoogleDriveClient.syncFiles(request, {}, (err, response) => {
            if (err) {
              console.error('gRPC Error:', err.message);
              alert('Failed to link Google Drive. Please try again.');
            } else if (response.getSuccess()) {
              console.log('Google Drive linked successfully:', response.getMessage());
              alert('Google Drive linked successfully.');
              // Optionally, you can store some state or redirect the user
            } else {
              console.error('Failed:', response.getMessage());
              alert('Failed to link Google Drive: ' + response.getMessage());
            }
          });
        } else {
          alert('Invalid callback code.');
        }
      }

      // Redirect the user to the settings page
      return "/settings";
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

