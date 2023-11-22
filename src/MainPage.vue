<template>
  <div>
    <NavBar />
    <FileList
      :tidy-hub-api="'https://localhost:7114/api/Dashboard/top-heaviest-files'"
      :widget-name="'Top Heaviest Files'"
    />
    <triggerbtn />
    <HelpButton @open="isOpen = !isOpen"/>
    <BaseModal
      :open="isOpen"
      @close="isOpen = !isOpen"
    >
      <p>
        {{ $t("help.helpText1") }} <br>
        {{ $t("help.helpText2") }}
      </p>
    </BaseModal>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FileList from "@/components/widgets/fileList.vue"
import HelpButton from "@/components/HelpButton.vue"
import BaseModal from '@/components/BaseModal.vue'
import { ref } from 'vue';

export default {
  name: 'MainPage',
  components: {
      NavBar,
      FileList,
      BaseModal,
      HelpButton
  },
  setup() {
      const isOpen = ref(false)

      return { isOpen }
  },
  data() {
    
    return {
      filesInfos: [],
    };
  },
}
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.widget-container {
    margin-left: 300px;
    display: flex;
    flex-wrap: wrap;
}

.file-info {
  margin-top: 20px;
}
</style>
