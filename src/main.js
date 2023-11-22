import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import '@/assets/main.css'

import fr from '@/assets/fr.json'
import en from '@/assets/en.json'

const i18n = createI18n({
    locale: "fr",
    fallbackLocale: "fr",
    messages: { fr, en},
});

createApp(App).use(i18n).mount('#app')
