import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import './index.css'
import App from './App.vue'
import router from "./_router";
import globalMixin from "./mixins/globalMixin";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
    .use(pinia)
    .use(router)
    .mixin(globalMixin)
    .mount('#app')
