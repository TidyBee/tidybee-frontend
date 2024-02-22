<template>
  <v-container>
    <v-row>
      <v-col cols="11">
        <div class="text-left">
          {{ "Filtres" }}
        </div>
      </v-col>
      <v-col cols="1">
        <v-icon>
          <img src="@/assets/filterIcon.svg" alt="Filter Icon" style="width: 20px; height: 20px; text-align: right;" @click="ouvrirFiltreDialog" />
        </v-icon>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row>
      <v-virtual-scroll :height="340" :items="sortedResponses">
        <template #default="{ item }">
          <v-list-item v-if="(sortWithTidyScore(item.tidy_score) == true)" cols="12">
            <FileItem :file="item" />
          </v-list-item>
        </template>
      </v-virtual-scroll>

      <v-dialog v-model="dialogFiltre" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Filtres</span>
          </v-card-title>
          <v-card-text>
            <v-select v-model="selectedFilter" :items="filterOptions" label="Trié par">
            </v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="fermerFiltreDialog">Fermer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>


<script>
import FileItem from "@/components/dashboard/widgets/OverView/FileItem.vue";
import { sortBy } from "@/components/dashboard/widgets/OverView/sortBy";

export default {
  name: "ListFile",
  components: {
    FileItem
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
    tab: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      selectedFilter: 'TidyScore Asc',
      dialogFiltre: false,
      filterOptions: [
        'TidyScore Asc',
        'TidyScore Desc',
        'Size Asc',
        'Size Desc',
        'Secs Asc',
        'Secs Desc'
      ],
      "Responses": [
        {
          "name": "my_files.rs",
          "path": "src/my_files.rs",
          "size": 21782,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": true,
            "heavy": true,
            "unused": false,
            "duplicated": false
          }
        },
        {
          "name": "http_server.rs",
          "path": "src/http_server.rs",
          "size": 5452,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": true,
            "heavy": true,
            "unused": false,
            "duplicated": false
            
          }
        },
        {
          "name": "agent_data.rs",
          "path": "src/agent_data.rs",
          "size": 2476,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": true,
            "heavy": true,
            "unused": false,
            "duplicated": false
            
          }
        },
        {
          "name": "lib.rs",
          "path": "src/lib.rs",
          "size": 2406,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": true,
            "heavy": false,
            "unused": true,
            "duplicated": true
            
          }
        },
        {
          "name": "awesome_code.rs",
          "path": "src/awesome_code.rs",
          "size": 54321,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": false,
            "heavy": true,
            "unused": true,
            "duplicated": false
          }
        },
        {
          "name": "cool_module.rs",
          "path": "src/cool_module.rs",
          "size": 9876,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": true,
            "heavy": false,
            "unused": true,
            "duplicated": true
          }
        },
        {
          "name": "smart_logic.rs",
          "path": "src/smart_logic.rs",
          "size": 3456,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": false,
            "heavy": true,
            "unused": false,
            "duplicated": true
          }
        },
        {
          "name": "neat_feature.rs",
          "path": "src/neat_feature.rs",
          "size": 8765,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": true,
            "heavy": false,
            "unused": false,
            "duplicated": false
          }
        },
        {
          "name": "innovative_code.rs",
          "path": "src/innovative_code.rs",
          "size": 65432,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": false,
            "heavy": true,
            "unused": true,
            "duplicated": false
          }
        },
        {
          "name": "creative_solution.rs",
          "path": "src/creative_solution.rs",
          "size": 5432,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": true,
            "heavy": false,
            "unused": true,
            "duplicated": true
          }
        },
        {
          "name": "efficient_algorithm.rs",
          "path": "src/efficient_algorithm.rs",
          "size": 8765,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": false,
            "heavy": true,
            "unused": false,
            "duplicated": true
          }
        },
        {
          "name": "user_friendly.rs",
          "path": "src/user_friendly.rs",
          "size": 9876,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": true,
            "heavy": false,
            "unused": false,
            "duplicated": false
          }
        },
        {
          "name": "feature_rich.rs",
          "path": "src/feature_rich.rs",
          "size": 7654,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": false,
            "heavy": true,
            "unused": true,
            "duplicated": false
          }
        },
        {
          "name": "next_gen_feature.rs",
          "path": "src/next_gen_feature.rs",
          "size": 8765,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": false,
            "heavy": true,
            "unused": false,
            "duplicated": true
          }
        },
        {
          "name": "responsive_code.rs",
          "path": "src/responsive_code.rs",
          "size": 5432,
          "last_modified": {
            "secs_since_epoch": 17511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": true,
            "heavy": false,
            "unused": true,
            "duplicated": false
          }
        },
        {
          "name": "AI_optimized.rs",
          "path": "src/AI_optimized.rs",
          "size": 9876,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": true,
            "heavy": true,
            "unused": true,
            "duplicated": true
          }
        },
        {
          "name": "secure_algorithm.rs",
          "path": "src/secure_algorithm.rs",
          "size": 6543,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": false,
            "heavy": true,
            "unused": false,
            "duplicated": false
          }
        },
        {
          "name": "cloud_integration.rs",
          "path": "src/cloud_integration.rs",
          "size": 8765,
          "last_modified": {
            "secs_since_epoch": 1706651511,
            "nanos_since_epoch": 396799014
          },
          "tidy_score": {
            "misnamed": true,
            "heavy": false,
            "unused": false,
            "duplicated": true
          }
      }
      ]
    }
  },
  computed: {
    sortedResponses() {
      switch (this.selectedFilter) {
        case 'TidyScore Asc':
          return sortBy(this.Responses, "tidyScore", "Asc");
        case 'TidyScore Desc':
          return sortBy(this.Responses, "tidyScore", "Desc");
        case 'Size Asc':
          return sortBy(this.Responses, "size", "Asc");
        case 'Size Desc':
          return sortBy(this.Responses, "size", "Decs");
        case 'Secs Asc':
          return sortBy(this.Responses, "secs", "Asc");
        case 'Secs Desc':
          return sortBy(this.Responses, "secs", "Desc");
        default:
          return this.Responses;
      }
    },
  },
  methods: {
    sortBy,
    sortWithTidyScore(tidyscore) {
      if (this.tab == "misnamed") return tidyscore.misnamed;
      else if (this.tab == "heavy") return tidyscore.heavy;
      else if (this.tab == "unused") return tidyscore.unused;
      else if (this.tab == "duplicated") return tidyscore.duplicated;
    },
    ouvrirFiltreDialog() {
      this.dialogFiltre = true;
    },
    fermerFiltreDialog() {
      this.dialogFiltre = false;
    },
  },
};
</script>

<style scoped>

</style>
